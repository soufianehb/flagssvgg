
import { memo, useEffect, useState } from "react";
import { AvatarUpload } from "./avatar/AvatarUpload";
import { UserInfoHeaderProps } from "./types/profile-types";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

export const UserInfoHeader = memo(({ user, t }: UserInfoHeaderProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [displayId, setDisplayId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url, display_id')
        .eq('user_id', user.id)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
        // Ensure the display_id starts with "EXP-"
        setDisplayId(data.display_id?.startsWith('EXP-') ? data.display_id : `EXP-${data.display_id}`);
      }
    };

    fetchProfile();
  }, [user?.id]);

  return (
    <div className="mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <div className="flex items-start gap-4">
        <AvatarUpload user={user} avatarUrl={avatarUrl} onAvatarUpdate={setAvatarUrl} />
        <div className="space-y-1">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t.profile.title}</h1>
            {displayId && (
              <span className="text-sm font-medium bg-[#B08A38] text-white px-3 py-1.5 rounded-md inline-block w-fit">
                ID: {displayId}
              </span>
            )}
          </div>
          <p className="text-gray-700 font-medium mt-2">
            {user?.user_metadata?.company_name || 'Company Name Not Set'}
          </p>
          <p className="text-sm sm:text-base text-gray-500">
            {user?.email}
          </p>
          <p className="text-sm sm:text-base text-gray-500">
            {user?.user_metadata?.phoneNumber || user?.user_metadata?.businessPhone || 'No Phone Number Set'}
          </p>
        </div>
      </div>
    </div>
  );
});

UserInfoHeader.displayName = "UserInfoHeader";
