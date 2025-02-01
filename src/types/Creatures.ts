export type EmotionalTie = {
  name: string;
  relationship: string;
};

export type Creature = {
  name: string;
  id: string;
  image: string;
  pronouns: string;
  comfortSnack: string;
  biggestFear: string;
  favoriteStory: string;
  spotifyPlaylist: string;
  quote: string;
  emotionalTies: EmotionalTie[];
  bio: string;
};
