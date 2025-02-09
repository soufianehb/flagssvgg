
import { memo, useEffect, useState } from "react";
import { AvatarUpload } from "./avatar/AvatarUpload";
import { UserInfoHeaderProps } from "./types/profile-types";
import { supabase } from "@/integrations/supabase/client";

export const UserInfoHeader = memo(({ user, t }: UserInfoHeaderProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('user_id', user.id)
        .single();
        
      if (data?.avatar_url) {
        setAvatarUrl(data.avatar_url);
      }
    };

    fetchProfile();
  }, [user?.id]);

  return (
    <div className="mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <div className="flex items-start gap-4">
        <AvatarUpload user={user} avatarUrl={avatarUrl} onAvatarUpdate={setAvatarUrl} />
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t.profile.title}</h1>
          <p className="text-gray-700 font-medium">
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
