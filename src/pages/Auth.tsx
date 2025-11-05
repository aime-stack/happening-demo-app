import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [creatingDemo, setCreatingDemo] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const DEMO_EMAIL = "demo@app.com";
  const DEMO_PASSWORD = "Demo123!";

  const createDemoAccount = async () => {
    setCreatingDemo(true);
    try {
      // Try to sign up the demo account
      const { data, error } = await supabase.auth.signUp({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
        options: {
          data: {
            username: "ernest",
            full_name: "Ernest",
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        // If user already exists, try to sign in
        if (error.message.includes("already registered") || error.message.includes("already exists")) {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: DEMO_EMAIL,
            password: DEMO_PASSWORD,
          });
          if (signInError) throw signInError;
          toast({ title: "Demo account found! Signing you in..." });
          navigate("/");
          return;
        }
        throw error;
      }

      // If signup successful, update profile with demo info
      if (data.user) {
        // Wait a bit for the trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            username: "ernest",
            full_name: "Ernest",
            bio: "Welcome to BlueCircle! This is a demo account.",
            avatar_url: "https://randomuser.me/api/portraits/men/1.jpg",
          })
          .eq("id", data.user.id);

        if (profileError) {
          console.error("Error updating profile:", profileError);
        }
      }

      toast({ 
        title: "Demo account created!",
        description: "You can now sign in with the demo credentials."
      });
      
      // Auto-fill the form
      setEmail(DEMO_EMAIL);
      setPassword(DEMO_PASSWORD);
      
      // If email confirmation is disabled, sign in automatically
      if (data.session) {
        navigate("/");
      } else {
        toast({
          title: "Check your email",
          description: "Please confirm your email if required by your Supabase settings.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error creating demo account",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setCreatingDemo(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          // If trying to login with demo credentials and it fails, offer to create account
          if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
            toast({
              title: "Demo account not found",
              description: "Would you like to create the demo account?",
              variant: "destructive",
            });
            // Don't throw error, let user click the create button
            setLoading(false);
            return;
          }
          throw error;
        }
        toast({ title: "Welcome back!" });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              full_name: fullName,
            },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;
        
        toast({ 
          title: "Account created!",
          description: email === DEMO_EMAIL 
            ? "Demo account created! You can now sign in."
            : "Welcome to the community!"
        });
        
        // If email confirmation is disabled, navigate to dashboard
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
          navigate("/");
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg bg-white border border-gray-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#1877F2] rounded-full p-3">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isLogin ? "Welcome Back" : "Join the Community"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Sign in to connect with your community"
              : "Create an account to get started"}
          </CardDescription>
          {isLogin && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-semibold text-[#1877F2] mb-2">Demo Account:</p>
              <p className="text-xs text-gray-700 mb-2">
                <strong>Email:</strong> demo@app.com
              </p>
              <p className="text-xs text-gray-700 mb-3">
                <strong>Password:</strong> Demo123!
              </p>
              <p className="text-xs text-gray-600 mb-3 italic">
                Don't have the demo account yet? Click below to create it automatically.
              </p>
              <Button
                type="button"
                onClick={createDemoAccount}
                disabled={creatingDemo}
                className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs py-2"
                size="sm"
              >
                {creatingDemo ? "Creating..." : "Create Demo Account"}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="johndoe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white"
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#1877F2] hover:underline font-medium"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;