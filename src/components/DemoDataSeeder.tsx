import { useEffect } from "react";
import { seedDemoData } from "@/utils/demoData";

const DemoDataSeeder = () => {
  useEffect(() => {
    // Seed demo data on component mount
    seedDemoData();
  }, []);

  return null; // This component doesn't render anything
};

export default DemoDataSeeder;

