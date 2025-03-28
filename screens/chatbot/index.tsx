import React, { useState } from "react";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { fetchEateryById } from "@/services/apiServices";

// Define message shape for TypeScript

type Message =
  | { from: "user"; text: string }
  | { from: "bot"; text: string; time?: string }
  | {
      from: "rec";
      name: string;
      explanation: string;
      rating: number;
      price_range: string;
    };

const ChatPreview = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      time: "Wed 8:21 AM",
      text:
        "👋 Hi there! I'm Foody, your personal AI food companion! I am able to recommend places to eat based on your preferences.",
    },
  ]);

  const [inputText, setInputText] = useState("");

  const callLLMRecommendationAPI = async (query: string) => {
    const res = await fetch("https://your-llm-api.com/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) throw new Error("LLM API failed");
    return res.json();
  };

  const sendMessage = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInputText("");

    try {
      const recs = await callLLMRecommendationAPI(trimmed);

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "Ok, based on your preferences, here are 3 restaurants that you will like!",
        },
      ]);

      for (const [eateryId, explanation] of Object.entries(recs) as [string, string][]) {
        const details = await fetchEateryById(eateryId);

        setMessages((prev) => [
          ...prev,
          { from: "rec",
            name: details.name,
            explanation,
            rating: details.avg_rating,
            price_range: details.price_range,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, I couldn't fetch recommendations right now." },
      ]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 pt-4">
      <VStack className="flex-1 px-4 py-3 space-y-3">
        {/* Header */}
        <Box className="flex-row items-center border-b border-gray-200 pb-2">
          <Box className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center">
            <Text style={{ fontSize: 25, color: "#8752EB" }}>👨‍🍳</Text>
          </Box>
          <Box className="flex-1 ml-3">
            <Text>Foody</Text>
            <Text style={{ fontSize: 12, color: "#00C851" }}>● Always active</Text>
          </Box>
          <Text style={{ fontSize: 20, color: "#999999" }}>⋯</Text>
        </Box>

        {/* Messages */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <VStack style={{ paddingVertical: 8, gap: 8 }}>
            {messages.map((msg, idx) => {
              if (msg.from === "bot") {
                return (
                  <Box key={idx} className="flex flex-col items-start">
                    {msg.time && (
                      <Text style={{ fontSize: 12, color: "#AAAAAA", marginBottom: 4 }}>{msg.time}</Text>
                    )}
                    <Box
                      className="px-4 py-2"
                      style={{ backgroundColor: "rgba(135, 82, 235, 0.22)", borderRadius: 18, maxWidth: "90%" }}
                    >
                      <Text style={{ color: "#000000" }}>{msg.text}</Text>
                    </Box>
                  </Box>
                );
              }

              if (msg.from === "user") {
                return (
                  <Box key={idx} className="flex flex-col items-end">
                    <Box
                      className="px-4 py-2"
                      style={{ backgroundColor: "rgba(233, 233, 233, 0.95)", borderRadius: 18, maxWidth: "90%" }}
                    >
                      <Text style={{ color: "#000000" }}>{msg.text}</Text>
                    </Box>
                  </Box>
                );
              }

              if (msg.from === "rec") {
                return (
                  <Box key={idx} className="flex flex-col items-start">
                    <Box
                      style={{ backgroundColor: "rgba(135, 82, 235, 0.22)", borderRadius: 18, padding: 16, maxWidth: "90%" }}
                    >
                      <Card size="md" variant="elevated" className="bg-transparent shadow-none p-0 m-0">
                        <Heading size="md" className="text-black mb-1">{msg.name}</Heading>
                        <Text size="sm" className="text-gray-700 mb-1">{msg.explanation}</Text>
                        <Text size="xs" className="text-gray-600">
                          Rating: {msg.rating} ★ | Price: {msg.price_range}
                        </Text>
                      </Card>
                    </Box>
                  </Box>
                );
              }
            })}
          </VStack>
        </ScrollView>

        {/* Input */}
        <HStack style={{ gap: 8 }}>
          <Input className="flex-1 rounded-full px-3 py-1.5">
            <InputField
              placeholder="Type your question..."
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={sendMessage}
              style={{ fontSize: 14, color: "#333333" }}
            />
          </Input>
          <Button
            className="rounded-full p-2"
            style={{ backgroundColor: "#000000" }}
            onPress={sendMessage}
          >
            <ArrowRight color="white" size={18} />
          </Button>
        </HStack>
      </VStack>
    </SafeAreaView>
  );
};

export const ChatbotPage = () => {
  return <ChatPreview />;
};
