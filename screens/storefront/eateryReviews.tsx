import { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { fetchEateryFeed } from "@/services/apiServices";
import {FeedCard} from "@/components/custom/feedcard";
import { Text } from "@/components/ui/text";

type FeedItem = {
  review_id: number;
  eatery_id: number;
  eatery_name: string;
  user_avatar: string;
  username: string;
  preview_img: string | null;
  review_title: string;
  number_of_likes: number;
  is_liked: boolean;
};

type EateryFeedProps = {
  eatery_id: number;
  myId: string;
};

const EateryFeed = ({ eatery_id, my_id }: EateryFeedProps) => {
  const [currentTabData, setCurrentTabData] = useState<{ data: FeedItem[] }>({ data: [] });
  const [loading, setLoading] = useState(false);
  const LIMIT = 10;

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newFeed: FeedItem[] = await fetchEateryFeed(eatery_id);
      console.log(newFeed);
      setCurrentTabData((prev) => ({
        data: [...prev.data, ...newFeed],
      }));
    } catch (err) {
      console.error("Failed to load feed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, [eatery_id]);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      {currentTabData.data.map((feedItem, index) => (
        <FeedCard
          key={index}
          myId={my_id}
          userId={"12c4a609-d3b7-4373-ae88-cf6a203d4d18"}
          reviewId={feedItem.review_id}
          eateryId={eatery_id}
          isBookmarked={false} 
          eateryName={feedItem.eatery_name}
          name={feedItem.username}
          image={"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
          avatar={feedItem.user_avatar}
          title={feedItem.review_title}
        />
      ))}
      {loading && <ActivityIndicator style={{ marginVertical: 16 }} />}
    </ScrollView>
  );
};

export default EateryFeed;
