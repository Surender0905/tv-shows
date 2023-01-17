export type Show = {
  id: number;
  url: string;
  name: string;

  genres: string[];
  image?: { medium?: string };

  rating: { average?: number };

  summary?: string;
};
