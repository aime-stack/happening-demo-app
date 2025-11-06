import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import ReelCard from "@/components/ReelCard";
import { Loader2 } from "lucide-react";

const Reels = () => {
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    setLoading(true);
    // For now, we'll use mock data. In production, you'd fetch from a reels table
    const mockReels = [
      {
        id: "reel1",
        user_id: "user1",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=700&fit=crop",
        caption: "Beautiful sunset in Rwanda 🌅 #Rwanda #Travel #Africa",
        likes_count: 1234,
        comments_count: 89,
        shares_count: 45,
        views_count: 15000,
      },
      {
        id: "reel2",
        user_id: "user2",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnail_url: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=700&fit=crop",
        caption: "Gorilla trekking experience 🦍 #KwitaIzina #Gorillas #Rwanda",
        likes_count: 2345,
        comments_count: 156,
        shares_count: 78,
        views_count: 25000,
      },
      {
        id: "reel3",
        user_id: "user3",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop",
        caption: "Exploring Kigali city vibes 🏙️ #Kigali #CityLife #Rwanda",
        likes_count: 987,
        comments_count: 67,
        shares_count: 34,
        views_count: 12000,
      },
      {
        id: "reel4",
        user_id: "user4",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail_url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=700&fit=crop",
        caption: "Cultural dance performance 💃 #Culture #Rwanda #Tradition",
        likes_count: 3456,
        comments_count: 234,
        shares_count: 123,
        views_count: 35000,
      },
      {
        id: "reel5",
        user_id: "user5",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        thumbnail_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=700&fit=crop",
        caption: "Lake Kivu views are breathtaking! 🌊 #LakeKivu #Nature #Rwanda",
        likes_count: 1876,
        comments_count: 98,
        shares_count: 56,
        views_count: 18000,
      },
    ];
    
    // Simulate loading delay
    setTimeout(() => {
      setReels(mockReels);
      setLoading(false);
    }, 500);
  };

  return (
    <Layout showSidebar={false} showWidgets={false}>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#1877F2]" />
        </div>
      ) : (
        <div className="space-y-4">
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Reels;

