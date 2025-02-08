
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useTranslation } from "@/lib/i18n";
import { Edit, Eye, Power, Trash2 } from "lucide-react";

export interface Listing {
  id: string;
  title: string;
  price: number;
  status: "active" | "pending" | "expired";
  views: number;
  createdAt: string;
  image: string;
}

interface ListingTableRowProps {
  listing: Listing;
  onDelete: (id: string) => void;
  onStatusChange: (id: string) => void;
}

export const ListingTableRow = ({ listing, onDelete, onStatusChange }: ListingTableRowProps) => {
  const { t } = useTranslation();

  return (
    <TableRow>
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
          {t.profile.tabs.listings.status[listing.status]}
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
            onClick={() => onStatusChange(listing.id)}
          >
            <Power className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(listing.id)}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
