import { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { fetchEateryFeed } from "@/services/apiServices";
import {FeedCard} from "@/components/custom/feedcard";
import { Text } from "@/components/ui/text";

type FeedItem = {
    review_id: number;
    eatery_name: string;
    user_avatar: string;
    username: string;
    preview_img: string;
    review_title: string;
    number_of_likes: number;
    is_liked: boolean;
    // Add others as needed
  };

const EateryFeed = ({ eatery_id }) => {
  const [currentTabData, setCurrentTabData] = useState<{ data: FeedItem[] }>({ data: [] });
//   const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
  const LIMIT = 10;

const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newFeed = await fetchEateryFeed(eatery_id);
      console.log(newFeed)
      setCurrentTabData((prev) => ({
        data: [...prev.data, ...newFeed],
      }));
    //   setOffset((prev) => prev + LIMIT);
    //   if (newFeed.length < LIMIT) setHasMore(false);
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
    <ScrollView
    //   onScroll={({ nativeEvent }) => {
    //     const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    //     const isNearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
    //     if (isNearBottom) loadMore();
    //   }}
    //   scrollEventThrottle={400}
    >
      {currentTabData?.data.map((feedItem, index) => (
        <FeedCard
          key={feedItem.review_id + "-" + index}
          id={feedItem.review_id}
          isFavourite={feedItem.is_liked}
          isBookmarked={false} // optional: modify as needed
          name={feedItem.eatery_name}
          image={feedItem.preview_img}
          avatar={feedItem.user_avatar}
          numberlikes={feedItem.number_of_likes}
          title={feedItem.review_title}
        />
      ))}
      {loading && <ActivityIndicator style={{ marginVertical: 16 }} />}
    </ScrollView>
  );
};

export default EateryFeed;
