import { supabase } from "@/integrations/supabase/client";

export const updateDemoProfileToErnest = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    if (!user) return;

    // Check if user email is demo@app.com
    const isDemoAccount = user.email === "demo@app.com";

    // Check current profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    // If profile exists and has "Demo User" or "demo_user" or is demo account, update it
    if (profile && (
      profile.full_name === "Demo User" || 
      profile.username === "demo_user" ||
      isDemoAccount
    )) {
      const { error } = await supabase
        .from("profiles")
        .update({
          username: "ernest",
          full_name: "Ernest",
          bio: profile.bio || "Welcome to BlueCircle! This is a demo account.",
        })
        .eq("id", user.id);

      if (error) {
        console.error("Error updating profile:", error);
      } else {
        console.log("Profile updated to Ernest");
      }
    }
  } catch (error) {
    console.error("Error in profile updater:", error);
  }
};

