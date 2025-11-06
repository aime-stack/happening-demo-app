import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Home, Search, Menu, MessageSquare, Bell, ChevronDown, Video, Users, Briefcase, FileText, Store, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

const TopNavbar = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);

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

  const comingSoon = (label: string) => {
    toast({ title: label, description: "This feature is coming soon.", duration: 3000 });
  };

  const goVipChat = () => {
    setMenuOpen(false);
    navigate("/");
    setTimeout(() => {
      toast({ title: "VIP Chat", description: "Scroll below the feed to find VIP Chat.", duration: 3000 });
    }, 100);
  };

  const go = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

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

          {/* Center: Navigation Icons (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-1 flex-[2_0_0] justify-center px-2">
            <button
              onClick={() => navigate("/")}
              className={cn(
                "flex items-center justify-center h-14 px-8 rounded-lg transition-colors relative",
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
                "flex items-center justify-center h-14 px-8 rounded-lg transition-colors relative",
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
                "flex items-center justify-center h-14 px-8 rounded-lg transition-colors relative",
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
                "flex items-center justify-center h-14 px-8 rounded-lg transition-colors relative",
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

          {/* Right: User Menu + Mobile Hamburger */}
          <div className="flex items-center gap-1 md:gap-2 flex-[1_0_0] justify-end">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Menu className="h-5 w-5 text-gray-700" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="p-2">
                  <div className="space-y-1">
                    <button onClick={() => go("/")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                      <Home className="h-5 w-5 text-gray-700" />
                      <span className="text-sm">Home</span>
                    </button>
                    <button onClick={() => comingSoon("Friends")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                      <Users className="h-5 w-5 text-gray-700" />
                      <span className="text-sm">Friends</span>
                    </button>
                    <button onClick={() => go("/reels")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                      <Video className="h-5 w-5 text-gray-700" />
                      <span className="text-sm">Reels</span>
                    </button>
                    <button onClick={() => go("/professional")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                      <Briefcase className="h-5 w-5 text-gray-700" />
                      <span className="text-sm">Professional dashboard</span>
                    </button>
                    <button onClick={() => comingSoon("Feeds")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                      <FileText className="h-5 w-5 text-gray-700" />
                      <span className="text-sm">Feeds</span>
                    </button>
                    <button onClick={() => comingSoon("Groups")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                      <Users className="h-5 w-5 text-gray-700" />
                      <span className="text-sm">Groups</span>
                    </button>
                    <button onClick={goVipChat} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                      <Crown className="h-5 w-5 text-gray-700" />
                      <span className="text-sm">VIP Chat</span>
                    </button>
                    <button onClick={() => comingSoon("Marketplace")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                      <Store className="h-5 w-5 text-gray-700" />
                      <span className="text-sm">Marketplace</span>
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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
              className="flex items-center gap-1 md:gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-[#1877F2] text-white">
                  {profile?.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-gray-600 hidden md:block" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;

