import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, MoreHorizontal, Calendar, Crown, MessageCircle, Star, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RightWidgets = () => {
  const [vipCelebrities, setVipCelebrities] = useState<any[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Featured Events in Rwanda
  useEffect(() => {
    const events = [
      {
        id: "event1",
        name: "Kwita Izina",
        description: "Annual Gorilla Naming Ceremony",
        location: "Volcanoes National Park, Musanze",
        date: "September 7, 2024",
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop",
        attendees: 15000,
        category: "Cultural & Conservation",
      },
      {
        id: "event2",
        name: "Rwanda Cultural Festival",
        description: "Celebrating Rwandan Heritage",
        location: "Kigali Convention Centre",
        date: "October 15, 2024",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
        attendees: 8000,
        category: "Cultural",
      },
      {
        id: "event3",
        name: "Kigali Car Free Day",
        description: "Monthly Community Wellness Event",
        location: "Kigali City Centre",
        date: "Every First Sunday",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        attendees: 5000,
        category: "Community",
      },
      {
        id: "event4",
        name: "Umuganda Day",
        description: "National Community Service",
        location: "Across Rwanda",
        date: "Every Last Saturday",
        image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
        attendees: 12000,
        category: "Community",
      },
    ];
    setFeaturedEvents(events);
  }, []);

  // Mock VIP celebrities data
  useEffect(() => {
    const mockCelebrities = [
      {
        id: "celeb1",
        name: "Emma Watson",
        username: "emmawatson",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        price: 50,
        rating: 4.9,
        verified: true,
        category: "Actress",
      },
      {
        id: "celeb2",
        name: "Chris Hemsworth",
        username: "chrishemsworth",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        price: 75,
        rating: 4.8,
        verified: true,
        category: "Actor",
      },
      {
        id: "celeb3",
        name: "Taylor Swift",
        username: "taylorswift",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        price: 100,
        rating: 5.0,
        verified: true,
        category: "Singer",
      },
      {
        id: "celeb4",
        name: "LeBron James",
        username: "lebronjames",
        avatar: "https://randomuser.me/api/portraits/men/44.jpg",
        price: 80,
        rating: 4.7,
        verified: true,
        category: "Athlete",
      },
      {
        id: "celeb5",
        name: "Selena Gomez",
        username: "selenagomez",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        price: 60,
        rating: 4.9,
        verified: true,
        category: "Singer",
      },
    ];
    setVipCelebrities(mockCelebrities);
  }, []);

  const handleVipChat = (celebrity: any) => {
    toast({
      title: "VIP Chat",
      description: `Pay $${celebrity.price} to chat with ${celebrity.name}?`,
      duration: 5000,
    });
    // In a real app, this would open a payment modal
  };

  const handleEventClick = (event: any) => {
    toast({
      title: event.name,
      description: `${event.description} - ${event.location}`,
      duration: 5000,
    });
  };

  return (
    <aside className="w-[360px] space-y-4">
      {/* Featured Events */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-gray-900">Featured Events</h3>
          </div>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className="px-3 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer"
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">
                    {event.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-medium text-blue-600">{event.date}</span>
                    <span className="text-xs text-gray-500">
                      {event.attendees.toLocaleString()} attending
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-center text-gray-500">
            Upcoming events in Rwanda 🇷🇼
          </p>
        </div>
      </div>

      {/* VIP Chat */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            <h3 className="font-semibold text-gray-900">VIP Chat</h3>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
              <Search className="h-4 w-4 text-gray-600" />
            </button>
            <button className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
              <MoreHorizontal className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="max-h-[600px] overflow-y-auto">
          {vipCelebrities.map((celebrity) => (
            <div
              key={celebrity.id}
              className="px-3 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-yellow-400">
                    <AvatarImage src={celebrity.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white">
                      {celebrity.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {celebrity.verified && (
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-sm font-semibold text-gray-900">
                      {celebrity.name}
                    </span>
                    <Crown className="h-3 w-3 text-yellow-500" />
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{celebrity.category}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-gray-700">
                        {celebrity.rating}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs font-semibold text-green-600">
                      ${celebrity.price}/msg
                    </span>
                  </div>
                  <Button
                    onClick={() => handleVipChat(celebrity)}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white text-xs h-8 font-semibold"
                    size="sm"
                  >
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Chat Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-center text-gray-500">
            Pay to chat with your favorite celebrities
          </p>
        </div>
      </div>
    </aside>
  );
};

export default RightWidgets;

