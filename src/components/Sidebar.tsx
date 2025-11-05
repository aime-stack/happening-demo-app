import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Users, Briefcase, FileText, Store, ChevronDown, LogOut, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentPath?: string;
}

const Sidebar = ({ currentPath = "/" }: SidebarProps) => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(data);
      }
    };
    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const navItems = [
    { icon: User, label: profile?.full_name || profile?.username || "Profile", path: profile ? `/profile/${profile.id}` : "/", isProfile: true },
    { icon: Users, label: "Friends", path: "/friends", color: "text-blue-500" },
    { icon: Video, label: "Reels", path: "/reels", color: "text-blue-500" },
    { icon: Briefcase, label: "Professional dashboard", path: "/professional", color: "text-blue-500" },
    { icon: FileText, label: "Feeds", path: "/feeds", color: "text-blue-500" },
    { icon: Users, label: "Groups", path: "/groups", color: "text-blue-500" },
    { icon: Store, label: "Marketplace", path: "/marketplace", color: "text-blue-500" },
  ];

  return (
    <aside className="w-[360px] pr-2">
      <div className="sticky top-14 space-y-1 py-2">
        {/* User Profile */}
        {profile && (
          <button
            onClick={() => navigate(`/profile/${profile.id}`)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback className="bg-[#1877F2] text-white">
                {profile.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold text-gray-900">
              {profile.full_name || profile.username}
            </span>
          </button>
        )}

        {/* Navigation Items */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-200 hover:scale-[1.02]"
              )}
            >
              {item.isProfile ? (
                <Avatar className="h-9 w-9">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-[#1877F2] text-white">
                    {profile?.username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className={cn("h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center", item.color)}>
                  <Icon className="h-5 w-5" />
                </div>
              )}
              <span className="text-sm font-medium text-gray-900">{item.label}</span>
            </button>
          );
        })}

        {/* See More */}
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
          <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
            <ChevronDown className="h-5 w-5 text-gray-700" />
          </div>
          <span className="text-sm font-medium text-gray-900">See more</span>
        </button>

        <div className="border-t border-gray-300 my-2"></div>

        {/* Shortcuts */}
        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Your shortcuts</h3>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                Y
              </div>
              <span className="text-sm font-medium text-gray-900">Cas Music</span>
            </button>
            <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                M
              </div>
              <span className="text-sm font-medium text-gray-900">mwizerwaplaisir</span>
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-300 my-2"></div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <LogOut className="h-5 w-5 text-gray-700" />
          <span className="text-sm font-medium text-gray-900">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

