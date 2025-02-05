export type EmotionalTie = {
  name: string;
  relationship: string;
};

export type TCreature = {
  name: string;
  id: string;
  image: string;
  pronouns: string;
  size: string;
  comfortSnack: string;
  biggestFear: string;
  favoriteStory: string;
  spotifyPlaylist?: string;
  quote: string;
  emotionalTies: EmotionalTie[];
  bio: string;
};

export type CreatureData = {
  regions: {
    creatures: TCreature[];
    regionId: string;
  }[];
};
