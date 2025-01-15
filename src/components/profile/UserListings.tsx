import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Eye, Power } from "lucide-react";

// Temporary mock data type
type Listing = {
  id: string;
  title: string;
  price: number;
  status: "active" | "pending" | "expired";
  views: number;
  createdAt: string;
  image: string;
};

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
  const { t } = useTranslation();
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
      title: "Listing deleted",
      description: "The listing has been successfully deleted.",
    });
  };

  const handleStatusChange = (id: string) => {
    console.log("Toggle status for listing:", id);
    toast({
      title: "Status updated",
      description: "The listing status has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Input
          placeholder={t.profile.listings.filters.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t.profile.listings.filters.all} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.profile.listings.filters.all}</SelectItem>
              <SelectItem value="active">{t.profile.listings.filters.active}</SelectItem>
              <SelectItem value="pending">{t.profile.listings.filters.pending}</SelectItem>
              <SelectItem value="expired">{t.profile.listings.filters.expired}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t.profile.listings.sort.newest} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{t.profile.listings.sort.newest}</SelectItem>
              <SelectItem value="oldest">{t.profile.listings.sort.oldest}</SelectItem>
              <SelectItem value="mostViewed">{t.profile.listings.sort.mostViewed}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredListings.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {t.profile.listings.empty}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{listing.title}</TableCell>
                <TableCell>${listing.price}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-sm ${
                    listing.status === "active" ? "bg-green-100 text-green-800" :
                    listing.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {t.profile.listings.status[listing.status]}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {listing.views}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => console.log("Edit:", listing.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleStatusChange(listing.id)}
                    >
                      <Power className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(listing.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};