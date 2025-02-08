
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ListingFilters } from "./listings/ListingFilters";
import { ListingsTable } from "./listings/ListingsTable";
import type { Listing } from "./listings/ListingTableRow";

// Temporary mock data
const mockListings: Listing[] = [
  {
    id: "1",
    title: "Sample Listing 1",
    price: 100,
    status: "active",
    views: 150,
    createdAt: "2024-03-15",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    id: "2",
    title: "Sample Listing 2",
    price: 200,
    status: "pending",
    views: 50,
    createdAt: "2024-03-14",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  }
];

export const UserListings = () => {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort listings
  const filteredListings = mockListings
    .filter(listing => 
      (statusFilter === "all" || listing.status === statusFilter) &&
      (searchQuery === "" || 
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === "mostViewed") return b.views - a.views;
      return 0;
    });

  const handleDelete = (id: string) => {
    console.log("Delete listing:", id);
    toast({
      title: "Success",
      description: "The listing has been successfully deleted.",
    });
  };

  const handleStatusChange = (id: string) => {
    console.log("Toggle status for listing:", id);
    toast({
      title: "Success",
      description: "The listing status has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <ListingFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ListingsTable
        listings={filteredListings}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};
