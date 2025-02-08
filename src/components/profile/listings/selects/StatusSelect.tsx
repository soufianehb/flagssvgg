
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/lib/i18n";

interface StatusSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const StatusSelect = ({ value, onChange }: StatusSelectProps) => {
  const { t } = useTranslation();

  return (
    <Select value={value} onValueChange={onChange}>
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
  );
};
