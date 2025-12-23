export interface Movie {
  id: number; // TMDB ID
  title: string; // Persian Title (AI Generated)
  originalTitle: string;
  overview: string; // Persian Overview
  review: string; // AI Generated Review HTML
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  genres: string[];
  director?: string;
  aiAnalysis?: {
    mood: string[];
    whyWatch: string;
  };
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export interface Stats {
  totalViews: number;
  totalRevenue: number;
  moviesIndexed: number;
}

export enum Genre {
  ACTION = 'اکشن',
  DRAMA = 'درام',
  COMEDY = 'کمدی',
  SCI_FI = 'علمی تخیلی',
  HORROR = 'ترسناک',
  ANIMATION = 'انیمیشن',
  THRILLER = 'هیجان انگیز',
  ROMANCE = 'عاشقانه',
  DOCUMENTARY = 'مستند'
}