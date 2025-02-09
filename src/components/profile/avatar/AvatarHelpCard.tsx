
import { HelpCircle } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useTranslation } from "@/lib/i18n";

export const AvatarHelpCard = () => {
  const { t } = useTranslation();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button 
          className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-50"
          type="button"
        >
          <HelpCircle className="w-5 h-5 text-accent hover:text-accent/80" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">{t.profile.settings.upload.uploadInstructions}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">{t.profile.settings.upload.specifications.title}</h4>
            <ul className="text-sm space-y-1 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="font-medium">{t.profile.settings.upload.specifications.format}</span> 
                {t.profile.settings.upload.specifications.formatTypes}
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">{t.profile.settings.upload.specifications.maxSize}</span> 
                {t.profile.settings.upload.specifications.maxSizeValue}
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">{t.profile.settings.upload.specifications.minDimensions}</span> 
                {t.profile.settings.upload.specifications.minDimensionsValue}
              </li>
            </ul>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
