import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Coins, PlusCircle, Megaphone } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Professional = () => {
  const [coins, setCoins] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from("profiles").select("reward_coins").eq("id", user.id).single();
        if (data && typeof data.reward_coins === "number") {
          setCoins(data.reward_coins);
        } else {
          setCoins(0);
        }
      }
      setLoading(false);
    };
    load();
  }, []);

  const simulateEarn = (amount: number) => {
    setCoins((c) => c + amount);
  };

  return (
    <Layout showWidgets={false}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-yellow-500" /> Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Earn coins by engaging with the community. Use coins to run ads.</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Coins className="h-5 w-5 text-amber-600" /> Coin Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{loading ? "—" : coins}</div>
              <p className="text-xs text-gray-500 mt-1">1 coin ≈ 1 ad credit</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Megaphone className="h-5 w-5 text-blue-600" /> Use for Ads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Create a promoted post using your coins. UI coming soon.</p>
              <Button className="mt-3" disabled={coins <= 0}>Create Ad (uses coins)</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><PlusCircle className="h-5 w-5 text-green-600" /> Earn Coins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Button variant="secondary" onClick={() => simulateEarn(1)}>Like a post (+1)</Button>
              <Button variant="secondary" onClick={() => simulateEarn(2)}>Comment on a post (+2)</Button>
              <Button variant="secondary" onClick={() => simulateEarn(3)}>Share a post (+3)</Button>
              <Button variant="secondary" onClick={() => simulateEarn(5)}>Create a post (+5)</Button>
              <Button variant="secondary" onClick={() => simulateEarn(2)}>Follow someone (+2)</Button>
              <Button variant="secondary" onClick={() => simulateEarn(4)}>Watch reels (+4)</Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">Note: Demo-only. Coins are not persisted yet.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Professional;
