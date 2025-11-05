import { supabase } from "@/integrations/supabase/client";

// Generate random avatar URL from randomuser.me
const getRandomAvatar = (seed: number) => {
  const gender = seed % 2 === 0 ? "men" : "women";
  const num = (seed % 100) + 1;
  return `https://randomuser.me/api/portraits/${gender}/${num}.jpg`;
};

export const seedDemoData = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Check if demo data already exists
    const { data: existingPosts } = await supabase
      .from("posts")
      .select("id")
      .limit(1);

    if (existingPosts && existingPosts.length > 0) {
      console.log("Demo data already exists");
      return;
    }

    // Create demo users (profiles)
    const demoUsers = [
      {
        username: "alice_smith",
        full_name: "Alice Smith",
        bio: "Tech enthusiast and coffee lover ☕",
        avatar_url: getRandomAvatar(1),
      },
      {
        username: "bob_jones",
        full_name: "Bob Jones",
        bio: "Photographer | Traveler | Adventure seeker 📸",
        avatar_url: getRandomAvatar(2),
      },
      {
        username: "charlie_brown",
        full_name: "Charlie Brown",
        bio: "Developer by day, musician by night 🎵",
        avatar_url: getRandomAvatar(3),
      },
      {
        username: "diana_prince",
        full_name: "Diana Prince",
        bio: "Fitness coach | Yoga instructor 🧘",
        avatar_url: getRandomAvatar(4),
      },
      {
        username: "ernest",
        full_name: "Ernest",
        bio: "Welcome to BlueCircle! This is a demo account.",
        avatar_url: getRandomAvatar(5),
      },
    ];

    // Note: In a real app, you'd create auth users first, then profiles
    // For demo purposes, we'll just create posts with existing users
    // First, let's get existing users and create profiles for them if needed
    const { data: existingProfiles } = await supabase
      .from("profiles")
      .select("id, username");

    // Create demo posts
    const demoPosts = [
      {
        user_id: user.id,
        content: "Just launched my new project! Excited to share it with everyone. 🚀",
      },
      {
        user_id: user.id,
        content: "Beautiful sunset today! Nature never fails to amaze me. 🌅",
      },
      {
        user_id: user.id,
        content: "Working on something exciting. Can't wait to show you all! 💻",
      },
      {
        user_id: user.id,
        content: "Coffee and coding - the perfect combination! ☕",
      },
      {
        user_id: user.id,
        content: "Just joined BlueCircle! This platform looks amazing. Welcome everyone! 👋",
      },
    ];

    // Insert posts
    for (const post of demoPosts) {
      await supabase.from("posts").insert(post);
    }

    console.log("Demo data seeded successfully");
  } catch (error) {
    console.error("Error seeding demo data:", error);
  }
};

