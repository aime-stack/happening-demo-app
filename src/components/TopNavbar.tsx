import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Home, Search, Menu, MessageSquare, Bell, ChevronDown, Video } from "lucide-react";
import { cn } from "@/lib/utils";

const TopNavbar = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo and Search */}
          <div className="flex items-center gap-2 flex-[1_0_0] min-w-0">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <div className="bg-[#1877F2] text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-xl">
                H
              </div>
            </button>
            <div className="hidden md:flex items-center flex-1 max-w-md ml-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search BlueCircle"
                  className="pl-10 bg-gray-100 border-0 rounded-full h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
          </div>

          {/* Center: Navigation Icons */}
          <div className="flex items-center gap-1 flex-[2_0_0] justify-center px-2">
            <button
              onClick={() => navigate("/")}
              className={cn(
                "flex items-center justify-center h-14 px-12 rounded-lg transition-colors relative",
                isActive("/")
                  ? "text-[#1877F2]"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Home className="h-6 w-6" />
              {isActive("/") && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1877F2] rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => navigate("/messages")}
              className={cn(
                "flex items-center justify-center h-14 px-12 rounded-lg transition-colors relative",
                isActive("/messages")
                  ? "text-[#1877F2]"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <MessageSquare className="h-6 w-6" />
              {isActive("/messages") && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1877F2] rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => navigate("/reels")}
              className={cn(
                "flex items-center justify-center h-14 px-12 rounded-lg transition-colors relative",
                isActive("/reels")
                  ? "text-[#1877F2]"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Video className="h-6 w-6" />
              {isActive("/reels") && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1877F2] rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => navigate("/notifications")}
              className={cn(
                "flex items-center justify-center h-14 px-12 rounded-lg transition-colors relative",
                isActive("/notifications")
                  ? "text-[#1877F2]"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Bell className="h-6 w-6" />
              {isActive("/notifications") && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1877F2] rounded-t-full" />
              )}
            </button>
          </div>

          {/* Right: User Menu */}
          <div className="flex items-center gap-2 flex-[1_0_0] justify-end">
            <button className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Menu className="h-5 w-5 text-gray-700" />
            </button>
            <button className="relative flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <MessageSquare className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button className="relative flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Bell className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </button>
            <button
              onClick={() => profile && navigate(`/profile/${profile.id}`)}
              className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-[#1877F2] text-white">
                  {profile?.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;

