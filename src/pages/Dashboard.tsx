import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import Stories from "@/components/Stories";
import DemoDataSeeder from "@/components/DemoDataSeeder";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
    setPosts(data || []);
    setLoading(false);
  };

  return (
    <Layout>
      <DemoDataSeeder />
      <div className="space-y-4">
        <CreatePost onPostCreated={fetchPosts} />
        <Stories />

        {loading ? (
          <div className="flex justify-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <Loader2 className="h-8 w-8 animate-spin text-[#1877F2]" />
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">
              No posts yet. Be the first to share something!
            </p>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onUpdate={fetchPosts} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;