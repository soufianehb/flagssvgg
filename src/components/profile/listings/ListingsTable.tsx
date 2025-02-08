
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "@/lib/i18n";
import { ListingTableRow, Listing } from "./ListingTableRow";

interface ListingsTableProps {
  listings: Listing[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string) => void;
}

export const ListingsTable = ({ listings, onDelete, onStatusChange }: ListingsTableProps) => {
  const { t } = useTranslation();

  if (listings.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {t.profile.tabs.listings.empty}
      </div>
    );
  }

  return (
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
        {listings.map((listing) => (
          <ListingTableRow
            key={listing.id}
            listing={listing}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </TableBody>
    </Table>
  );
};
