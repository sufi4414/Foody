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
  posts: z.number().int().optional(), // Number of posts the user has made
});

// Infer the TypeScript type from the schema
export type userSchemaDetails = z.infer<typeof userProfileSchema>;

// Sample user data
export const sampleUser: userSchemaDetails = {
  userId: "550e8400-e29b-41d4-a716-446655440000", // Example UUID
  username: "Marcc",
  email: "john.doe@example.com",
  password: "Password123!", // Meets the schema requirements
  fullName: "Marc Gabriel ",
  bio: "I love food and travel!",
  profilePicture: "https://gluestack.github.io/public-blog-video-assets/Avatar.png",
  following: 100,
  followers: 50,
  posts: 200,

};