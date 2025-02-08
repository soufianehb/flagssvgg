
import { useTranslation } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { StatusSelect } from "./selects/StatusSelect";
import { SortSelect } from "./selects/SortSelect";

interface ListingFiltersProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const ListingFilters = ({
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
}: ListingFiltersProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      <Input
        placeholder={t.profile.tabs.listings.filters.search}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-xs"
      />
      <div className="flex gap-4">
        <StatusSelect value={statusFilter} onChange={setStatusFilter} />
        <SortSelect value={sortBy} onChange={setSortBy} />
      </div>
    </div>
  );
};
