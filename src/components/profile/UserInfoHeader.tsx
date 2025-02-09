
import { memo, useEffect, useState } from "react";
import { AvatarUpload } from "./avatar/AvatarUpload";
import { UserInfoHeaderProps } from "./types/profile-types";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useTranslation } from "@/contexts/TranslationContext";

type Profile = Database['public']['Tables']['profiles']['Row'];

export const UserInfoHeader = memo(({ user }: Omit<UserInfoHeaderProps, 't'>) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [displayId, setDisplayId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (error) {
          console.error('Error fetching profile:', error);
          setIsLoading(false);
          return;
        }

        if (data) {
          setProfile(data);
          setAvatarUrl(data.avatar_url);
          setDisplayId(data.display_id?.startsWith('EXP-') ? data.display_id : `EXP-${data.display_id}`);
        }
      } catch (error) {
        console.error('Error in profile fetch:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  // Use profile data first, fall back to user metadata, then to empty states
  const companyName = profile?.company_name || user?.user_metadata?.company_name || t.profile.general.emptyStates.companyName;
  const phoneNumber = profile?.business_phone || profile?.phone_number || user?.user_metadata?.businessPhone || user?.user_metadata?.phoneNumber || t.profile.general.emptyStates.phoneNumber;
  const email = profile?.email || user?.email;

  if (isLoading) {
    return (
      <div className="mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm animate-pulse">
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <div className="flex items-start gap-4">
        <AvatarUpload user={user} avatarUrl={avatarUrl} onAvatarUpdate={setAvatarUrl} />
        <div className="space-y-1">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t.profile.title}</h1>
            {displayId && (
              <span className="text-sm font-medium px-3 py-1.5 inline-block w-fit">
                <span className="text-primary font-bold">ID: </span>
                <span className="text-[#B08A38]">{displayId}</span>
              </span>
            )}
          </div>
          <p className="text-gray-700 font-medium mt-2">
            {companyName}
          </p>
          <p className="text-sm sm:text-base text-gray-500">
            {email}
          </p>
          <p className="text-sm sm:text-base text-gray-500">
            {phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
});

UserInfoHeader.displayName = "UserInfoHeader";
