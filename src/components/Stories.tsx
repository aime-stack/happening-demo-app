import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

const Stories = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setCurrentUser(profileData);

        const { data: profilesData } = await supabase
          .from("profiles")
          .select("*")
          .neq("id", user.id)
          .limit(5);
        setProfiles(profilesData || []);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {/* Create Story */}
        {currentUser && (
          <div className="flex-shrink-0 w-[112px] cursor-pointer group">
            <div className="relative h-[200px] rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 group-hover:border-[#1877F2] transition-all">
              <img
                src={currentUser.avatar_url || "https://randomuser.me/api/portraits/men/1.jpg"}
                alt={currentUser.full_name || currentUser.username}
                className="w-full h-[160px] object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white h-[40px] flex items-center justify-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#1877F2] rounded-full p-1.5 border-4 border-white group-hover:scale-110 transition-transform">
                  <Plus className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-semibold text-gray-900 mt-2">Create story</span>
              </div>
            </div>
          </div>
        )}

        {/* Story Cards */}
        {profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => navigate(`/profile/${profile.id}`)}
            className="flex-shrink-0 w-[112px] cursor-pointer group"
          >
            <div className="relative h-[200px] rounded-lg overflow-hidden border-2 border-[#1877F2] group-hover:scale-105 transition-transform">
              <img
                src={profile.avatar_url || "https://randomuser.me/api/portraits/men/2.jpg"}
                alt={profile.full_name || profile.username}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <Avatar className="h-10 w-10 border-2 border-[#1877F2] ring-2 ring-white">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback className="bg-[#1877F2] text-white">
                    {profile.username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-xs font-semibold text-white truncate">
                  {profile.full_name || profile.username}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;

