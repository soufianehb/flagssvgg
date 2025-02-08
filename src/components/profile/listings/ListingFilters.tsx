
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t.profile.tabs.listings.filters.all} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.profile.tabs.listings.filters.all}</SelectItem>
            <SelectItem value="active">{t.profile.tabs.listings.filters.active}</SelectItem>
            <SelectItem value="pending">{t.profile.tabs.listings.filters.pending}</SelectItem>
            <SelectItem value="expired">{t.profile.tabs.listings.filters.expired}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t.profile.tabs.listings.sort.newest} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t.profile.tabs.listings.sort.newest}</SelectItem>
            <SelectItem value="oldest">{t.profile.tabs.listings.sort.oldest}</SelectItem>
            <SelectItem value="mostViewed">{t.profile.tabs.listings.sort.mostViewed}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
