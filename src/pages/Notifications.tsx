import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const Notifications = () => {
  return (
    <Layout>
      <Card className="bg-white shadow-sm border border-gray-200 rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Bell className="h-6 w-6 text-[#0057D9]" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Bell className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">
              No notifications yet. Activity will appear here when people interact with your
              posts.
            </p>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Notifications;