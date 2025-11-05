import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, MoreVertical, Play, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReelCardProps {
  reel: any;
}

const ReelCard = ({ reel }: ReelCardProps) => {
  const [profile, setProfile] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
    checkIfLiked();
  }, [reel.user_id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {
              // Auto-play failed, user interaction required
            });
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const fetchProfile = async () => {
    // For demo, we'll use mock profiles
    const mockProfiles: { [key: string]: any } = {
      user1: {
        username: "travel_rwanda",
        full_name: "Travel Rwanda",
        avatar_url: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      user2: {
        username: "gorilla_trek",
        full_name: "Gorilla Trek",
        avatar_url: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      user3: {
        username: "kigali_life",
        full_name: "Kigali Life",
        avatar_url: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      user4: {
        username: "rwanda_culture",
        full_name: "Rwanda Culture",
        avatar_url: "https://randomuser.me/api/portraits/women/4.jpg",
      },
      user5: {
        username: "nature_rwanda",
        full_name: "Nature Rwanda",
        avatar_url: "https://randomuser.me/api/portraits/men/5.jpg",
      },
    };
    setProfile(mockProfiles[reel.user_id] || mockProfiles.user1);
  };

  const checkIfLiked = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      // In production, check likes table
      setIsLiked(false);
    }
  };

  const handleLike = async () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from likes" : "Added to likes",
      duration: 2000,
    });
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    handlePlayPause();
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full snap-start relative bg-black flex items-center justify-center"
    >
      {/* Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src={reel.video_url}
          poster={reel.thumbnail_url}
          className="w-full h-full object-cover"
          loop
          playsInline
          muted
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={handleVideoClick}
        />
        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30"
            onClick={handleVideoClick}
          >
            <div className="bg-black/50 rounded-full p-4 hover:bg-black/70 transition-colors">
              <Play className="h-12 w-12 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white pointer-events-none">
        {/* Top Bar */}
        <div className="flex items-center justify-between pointer-events-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-bold">Reels</h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end pb-8 pointer-events-auto">
          {/* Left: User Info & Caption */}
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar 
                className="h-10 w-10 border-2 border-white cursor-pointer hover:ring-2 hover:ring-white/50 transition-all"
                onClick={() => profile && navigate(`/profile/${profile.id}`)}
              >
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-[#1877F2] text-white">
                  {profile?.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p 
                  className="font-semibold text-sm cursor-pointer hover:underline"
                  onClick={() => profile && navigate(`/profile/${profile.id}`)}
                >
                  {profile?.full_name || profile?.username}
                </p>
                <p className="text-xs text-gray-200">{profile?.username}</p>
              </div>
            </div>
            <p className="text-sm mb-2 line-clamp-2">{reel.caption}</p>
            <div className="flex items-center gap-4 text-xs text-gray-200">
              <span>{reel.views_count.toLocaleString()} views</span>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLike}
                className={`text-white hover:bg-white/20 h-12 w-12 transition-all ${
                  isLiked ? "text-red-500" : ""
                }`}
              >
                <Heart className={`h-7 w-7 transition-all ${isLiked ? "fill-current scale-110" : ""}`} />
              </Button>
              <span className="text-xs font-medium">{reel.likes_count.toLocaleString()}</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-12 w-12 transition-all"
              >
                <MessageCircle className="h-7 w-7" />
              </Button>
              <span className="text-xs font-medium">{reel.comments_count}</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-12 w-12 transition-all"
              >
                <Share2 className="h-7 w-7" />
              </Button>
              <span className="text-xs font-medium">{reel.shares_count}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelCard;

