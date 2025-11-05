import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Image, Video, Smile } from "lucide-react";

interface CreatePostProps {
  onPostCreated: () => void;
}

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleSubmit = async () => {
    if (!content.trim()) {
      return;
    }

    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a post",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("posts").insert({
      user_id: user.id,
      content,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    } else {
      setContent("");
      onPostCreated();
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <Avatar 
          className="h-10 w-10 cursor-pointer ring-2 ring-transparent hover:ring-blue-100 transition-all" 
          onClick={() => profile && navigate(`/profile/${profile.id}`)}
        >
          <AvatarImage src={profile?.avatar_url} />
          <AvatarFallback className="bg-[#1877F2] text-white">
            {profile?.username?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder={`What's on your mind, ${profile?.full_name || profile?.username || "there"}?`}
            className="bg-gray-100 border-0 rounded-full h-10 px-4 focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-0 transition-all"
          />
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 hover:bg-red-50 text-gray-600 font-medium transition-all"
          disabled
        >
          <Video className="h-5 w-5 mr-2 text-red-500" />
          <span className="hidden sm:inline">Live Video</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 hover:bg-green-50 text-gray-600 font-medium transition-all"
          disabled
        >
          <Image className="h-5 w-5 mr-2 text-green-500" />
          <span className="hidden sm:inline">Photo/Video</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 hover:bg-yellow-50 text-gray-600 font-medium transition-all"
          disabled
        >
          <Smile className="h-5 w-5 mr-2 text-yellow-500" />
          <span className="hidden sm:inline">Feeling/Activity</span>
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;