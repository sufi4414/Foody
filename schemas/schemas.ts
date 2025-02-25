import { z } from "zod";

// Define the user profile schema
export const userProfileSchema = z.object({
  // Basic Information
  userId: z.string().uuid(), // Unique identifier for the user
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(50, "Full name must be less than 50 characters"),
  bio: z.string().max(200, "Bio must be less than 200 characters").optional(), // Optional bio
  profilePicture: z.string().url("Invalid URL").optional(), // URL to the user's profile picture
  following: z.number().int().optional(), // Number of users the user is following
  followers: z.number().int().optional(), // Number of followers the user has
});

// Infer the TypeScript type from the schema
export type userSchemaDetails = z.infer<typeof userProfileSchema>;

// Sample user data
export const sampleUser: userSchemaDetails = {
  userId: "550e8400-e29b-41d4-a716-446655440000", // Example UUID
  username: "Marc",
  email: "john.doe@example.com",
  password: "Password123!", // Meets the schema requirements
  fullName: "Marc Gabriel ",
  bio: "I love food and travel!",
  profilePicture: "https://gluestack.github.io/public-blog-video-assets/Avatar.png",
  following: 100,
  followers: 50,

};



// Define the Zod schema for a single feed item
export const FeedDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(), // If you want to enforce valid URLs, you can use z.string().url()
  avatar: z.string(),
  numberlikes: z.number(),
  title: z.string(),
  isFavourite: z.boolean().optional(),
  isBookmarked: z.boolean().optional(),
});

// Create your feed data array
export const FEED_DATA = [
  {
    id: "1",
    name: "Marc",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    avatar: "https://gluestack.github.io/public-blog-video-assets/ship.png",
    numberlikes: 100,
    title: "Hidden Gem what hidden Gem",
    isFavourite: true,
  },
  {
    id: "2",
    name: "John",
    image:
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    avatar: "https://gluestack.github.io/public-blog-video-assets/parrot.png",
    numberlikes: 3,
    title:
      "good food and great company",
    isFavourite: true,
    isBookmarked: true,
  },
  {
    id: "3",
    name: "John",
    image:
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    avatar: "https://gluestack.github.io/public-blog-video-assets/parrot.png",
    numberlikes: 3,
    title: "Delicious Food with friends",
  },
];

// Validate the feed data array against the schema
export const ValidatedFeedData = z.array(FeedDataSchema).parse(FEED_DATA);
