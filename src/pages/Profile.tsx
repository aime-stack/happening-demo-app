import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare } from "lucide-react";

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchProfile();
      fetchUserPosts();
    }
  }, [userId]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    setProfile(data);
  };

  const fetchUserPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  if (!profile) {
    return (
      <Layout>
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <Card className="bg-white shadow-sm border border-gray-200 rounded-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-2xl bg-[#1877F2] text-white">
                  {profile.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile.full_name || profile.username}</h1>
                <p className="text-gray-500">@{profile.username}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="text-center pb-6">
            {profile.bio && (
              <p className="text-gray-700 mb-4">{profile.bio}</p>
            )}
            <div className="flex justify-center gap-4 text-sm mb-4">
              <div>
                <span className="font-bold text-gray-900">{posts.length}</span>{" "}
                <span className="text-gray-500">Posts</span>
              </div>
            </div>
            <Button className="bg-[#1877F2] hover:bg-[#166FE5] text-white">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Posts</h2>
          {loading ? (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#1877F2]" />
            </div>
          ) : posts.length === 0 ? (
            <Card className="bg-white shadow-sm border border-gray-200 rounded-lg">
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No posts yet</p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} onUpdate={fetchUserPosts} />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;