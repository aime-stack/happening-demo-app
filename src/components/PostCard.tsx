import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: any;
  onUpdate?: () => void;
}

const PostCard = ({ post, onUpdate }: PostCardProps) => {
  const [profile, setProfile] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setCurrentUser(data);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    fetchProfile();
    checkIfLiked();
    if (showComments) {
      fetchComments();
    }
  }, [post.user_id, showComments]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", post.user_id)
      .single();
    setProfile(data);
  };

  const checkIfLiked = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("likes")
        .select("*")
        .eq("user_id", user.id)
        .eq("post_id", post.id)
        .single();
      setIsLiked(!!data);
    }
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*, profiles(*)")
      .eq("post_id", post.id)
      .order("created_at", { ascending: true });
    setComments(data || []);
  };

  const handleLike = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    if (isLiked) {
      await supabase
        .from("likes")
        .delete()
        .eq("user_id", user.id)
        .eq("post_id", post.id);
      setIsLiked(false);
    } else {
      await supabase.from("likes").insert({
        user_id: user.id,
        post_id: post.id,
      });
      setIsLiked(true);
    }
    onUpdate?.();
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    setLoading(true);
    const { error } = await supabase.from("comments").insert({
      user_id: user.id,
      post_id: post.id,
      content: newComment,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive",
      });
    } else {
      setNewComment("");
      fetchComments();
      onUpdate?.();
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 hover:shadow-md transition-all duration-200">
      {/* Post Header */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-transparent hover:ring-blue-100 transition-all">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-[#1877F2] text-white">
                {profile?.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm text-gray-900 hover:underline cursor-pointer transition-colors">
                {profile?.full_name || profile?.username}
              </p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <button className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <span className="text-gray-600 text-lg">⋯</span>
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-3 pb-3">
        <p className="text-gray-900 whitespace-pre-wrap leading-relaxed text-sm mb-2">{post.content}</p>
        {post.image_url && (
          <img
            src={post.image_url}
            alt="Post"
            className="w-full rounded-lg object-cover transition-transform hover:scale-[1.01]"
          />
        )}
      </div>

      {/* Post Stats */}
      {(post.likes_count > 0 || post.comments_count > 0) && (
        <div className="px-4 py-2 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            {post.likes_count > 0 && (
              <>
                <span className="text-blue-500">👍</span>
                <span>{post.likes_count}</span>
              </>
            )}
          </div>
          {post.comments_count > 0 && (
            <span>{post.comments_count} comments</span>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="px-2 py-1 border-t border-gray-200">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex-1 justify-center gap-2 rounded-lg hover:bg-blue-50 transition-all h-9 ${
              isLiked ? "text-[#1877F2] bg-blue-50" : "text-gray-600 hover:text-[#1877F2]"
            }`}
          >
            <Heart className={`h-5 w-5 transition-all ${isLiked ? "fill-current text-[#1877F2] scale-110" : ""}`} />
            <span className="text-sm font-medium">Like</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className={`flex-1 justify-center gap-2 rounded-lg transition-all h-9 ${
              showComments ? "text-[#1877F2] bg-blue-50" : "text-gray-600 hover:bg-gray-100 hover:text-[#1877F2]"
            }`}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Comment</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 justify-center gap-2 rounded-lg hover:bg-gray-100 hover:text-[#1877F2] transition-all h-9 text-gray-600"
            disabled
          >
            <span className="text-sm font-medium">Share</span>
          </Button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="space-y-3 mb-3">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-2 group">
                <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-transparent group-hover:ring-blue-100 transition-all">
                  <AvatarImage src={comment.profiles?.avatar_url} />
                  <AvatarFallback className="bg-[#1877F2] text-white text-xs">
                    {comment.profiles?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-white rounded-lg p-2.5 hover:bg-gray-50 transition-colors">
                  <p className="font-semibold text-xs text-gray-900 mb-1 hover:underline cursor-pointer">
                    {comment.profiles?.full_name || comment.profiles?.username}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-transparent hover:ring-blue-100 transition-all">
              <AvatarImage src={currentUser?.avatar_url} />
              <AvatarFallback className="bg-[#1877F2] text-white text-xs">
                {currentUser?.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="bg-white border-gray-200 rounded-full h-8 text-sm focus-visible:ring-2 focus-visible:ring-blue-200 transition-all"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleComment();
                  }
                }}
              />
              {newComment.trim() && (
                <Button
                  size="sm"
                  onClick={handleComment}
                  disabled={loading}
                  className="bg-[#1877F2] hover:bg-[#166FE5] text-white h-8 px-4 transition-all hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;