import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/lib/i18n";

interface ListingIdInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ListingIdInput = ({ value, onChange }: ListingIdInputProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <Label htmlFor="listingId" className="text-sm font-semibold text-gray-700 block">
        {t.filters.listingId.label}
      </Label>
      <Input
        id="listingId"
        type="number"
        placeholder={t.filters.listingId.placeholder}
        className="w-full bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};