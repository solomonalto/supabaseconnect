/*
  # Create Media Platform Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - User ID from auth
      - `email` (text) - User email
      - `display_name` (text) - User display name
      - `tier` (text) - Subscription tier (free/premium)
      - `created_at` (timestamptz) - Account creation timestamp
    
    - `media_items`
      - `id` (uuid, primary key) - Media item ID
      - `title` (text) - Media title
      - `creator` (text) - Creator name
      - `thumbnail` (text) - Thumbnail/image URL
      - `duration` (text) - Duration for audio/video
      - `read_time` (text) - Read time for blog posts
      - `category` (text) - Media category
      - `type` (text) - Media type (stream/listen/blog/gallery/resources)
      - `subtype` (text) - Specific subtype (music-video/audio-music/etc)
      - `is_premium` (boolean) - Premium content flag
      - `price` (integer) - Price for resources (in UGX)
      - `rating` (numeric) - Rating for resources
      - `sales` (integer) - Number of sales
      - `views` (integer) - View count
      - `plays` (integer) - Play count
      - `created_at` (timestamptz) - Creation timestamp
    
    - `likes`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - User who liked
      - `media_id` (uuid) - Liked media item
      - `created_at` (timestamptz)
    
    - `follows`
      - `id` (uuid, primary key)
      - `follower_id` (uuid) - User following
      - `creator_name` (text) - Creator being followed
      - `created_at` (timestamptz)
    
    - `tips`
      - `id` (uuid, primary key)
      - `from_user_id` (uuid) - User giving tip
      - `creator_name` (text) - Creator receiving tip
      - `amount` (integer) - Tip amount
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read all media items
    - Add policies for users to manage their own likes, follows, and tips
    - Add policies for users to read their own user data

  3. Indexes
    - Add indexes on foreign keys for better query performance
    - Add unique constraint on likes to prevent duplicate likes
    - Add unique constraint on follows to prevent duplicate follows
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  display_name text DEFAULT '',
  tier text DEFAULT 'free',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create media_items table
CREATE TABLE IF NOT EXISTS media_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  creator text NOT NULL,
  thumbnail text NOT NULL,
  duration text DEFAULT '',
  read_time text DEFAULT '',
  category text NOT NULL,
  type text NOT NULL,
  subtype text DEFAULT '',
  is_premium boolean DEFAULT false,
  price integer DEFAULT 0,
  rating numeric(3,1) DEFAULT 0,
  sales integer DEFAULT 0,
  views integer DEFAULT 0,
  plays integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  media_id uuid NOT NULL REFERENCES media_items(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, media_id)
);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Create follows table
CREATE TABLE IF NOT EXISTS follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid NOT NULL,
  creator_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, creator_name)
);

ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Create tips table
CREATE TABLE IF NOT EXISTS tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id uuid NOT NULL,
  creator_name text NOT NULL,
  amount integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tips ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Media items policies (public read for all authenticated users)
CREATE POLICY "Anyone can view media items"
  ON media_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Public can view media items"
  ON media_items FOR SELECT
  TO anon
  USING (true);

-- Likes policies
CREATE POLICY "Users can view all likes"
  ON likes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own likes"
  ON likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Users can view all follows"
  ON follows FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own follows"
  ON follows FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete own follows"
  ON follows FOR DELETE
  TO authenticated
  USING (auth.uid() = follower_id);

-- Tips policies
CREATE POLICY "Users can view all tips"
  ON tips FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own tips"
  ON tips FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = from_user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_media_id ON likes(media_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_creator_name ON follows(creator_name);
CREATE INDEX IF NOT EXISTS idx_tips_from_user_id ON tips(from_user_id);
CREATE INDEX IF NOT EXISTS idx_media_items_type ON media_items(type);
CREATE INDEX IF NOT EXISTS idx_media_items_category ON media_items(category);
