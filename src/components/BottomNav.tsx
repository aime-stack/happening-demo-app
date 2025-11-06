import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, MessageSquare, Video, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const BottomNav = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [profileId, setProfileId] = useState<string | null>(null);

	useEffect(() => {
		const load = async () => {
			const { data: { user } } = await supabase.auth.getUser();
			if (user) setProfileId(user.id);
		};
		load();
	}, []);

	const isActive = (path: string) => location.pathname === path;

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
			<div className="grid grid-cols-5 h-14 max-w-7xl mx-auto">
				<button
					onClick={() => navigate("/")}
					className={cn(
						"flex flex-col items-center justify-center text-xs",
						isActive("/") ? "text-[#1877F2]" : "text-gray-600"
					)}
				>
					<Home className="h-6 w-6" />
					<span className="mt-0.5">Home</span>
				</button>
				<button
					onClick={() => navigate("/messages")}
					className={cn(
						"flex flex-col items-center justify-center text-xs",
						isActive("/messages") ? "text-[#1877F2]" : "text-gray-600"
					)}
				>
					<MessageSquare className="h-6 w-6" />
					<span className="mt-0.5">Messages</span>
				</button>
				<button
					onClick={() => navigate("/reels")}
					className={cn(
						"flex flex-col items-center justify-center text-xs",
						isActive("/reels") ? "text-[#1877F2]" : "text-gray-600"
					)}
				>
					<Video className="h-6 w-6" />
					<span className="mt-0.5">Reels</span>
				</button>
				<button
					onClick={() => navigate("/notifications")}
					className={cn(
						"flex flex-col items-center justify-center text-xs",
						isActive("/notifications") ? "text-[#1877F2]" : "text-gray-600"
					)}
				>
					<Bell className="h-6 w-6" />
					<span className="mt-0.5">Alerts</span>
				</button>
				<button
					onClick={() => profileId && navigate(`/profile/${profileId}`)}
					className={cn(
						"flex flex-col items-center justify-center text-xs",
						location.pathname.startsWith("/profile") ? "text-[#1877F2]" : "text-gray-600"
					)}
				>
					<User className="h-6 w-6" />
					<span className="mt-0.5">Profile</span>
				</button>
			</div>
		</nav>
	);
};

export default BottomNav;
