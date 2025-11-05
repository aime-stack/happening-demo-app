import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import Sidebar from "./Sidebar";
import RightWidgets from "./RightWidgets";
import TopNavbar from "./TopNavbar";
import { updateDemoProfileToErnest } from "@/utils/profileUpdater";

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showWidgets?: boolean;
}

const Layout = ({ children, showSidebar = true, showWidgets = true }: LayoutProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        updateDemoProfileToErnest();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        updateDemoProfileToErnest();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <TopNavbar />
      <div className="flex max-w-7xl mx-auto">
        {showSidebar && <Sidebar currentPath={location.pathname} />}
        <main className="flex-1 flex justify-center pb-4">
          <div className="w-full max-w-[680px] px-4 pt-4">{children}</div>
        </main>
        {showWidgets && (
          <div className="hidden lg:block w-[360px] px-4 pt-4">
            <RightWidgets />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;