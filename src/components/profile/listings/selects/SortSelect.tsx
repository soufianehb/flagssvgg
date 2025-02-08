
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/lib/i18n";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const SortSelect = ({ value, onChange }: SortSelectProps) => {
  const { t } = useTranslation();

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t.profile.tabs.listings.sort.newest} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">{t.profile.tabs.listings.sort.newest}</SelectItem>
        <SelectItem value="oldest">{t.profile.tabs.listings.sort.oldest}</SelectItem>
        <SelectItem value="mostViewed">{t.profile.tabs.listings.sort.mostViewed}</SelectItem>
      </SelectContent>
    </Select>
  );
};
