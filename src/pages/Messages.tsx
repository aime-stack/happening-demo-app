import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const Messages = () => {
  return (
    <Layout>
      <Card className="bg-white shadow-sm border border-gray-200 rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <MessageSquare className="h-6 w-6 text-[#0057D9]" />
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">
              Chat feature coming soon! Connect with community members directly.
            </p>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Messages;