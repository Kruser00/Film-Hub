import { Movie, Genre } from './types';

export const TMDB_API_KEY = "ad368071fae64e25b2758e888d0ed5dd";
export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const TMDB_BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

// Map TMDB Genre IDs to our Farsi Enum
export const TMDB_GENRES: Record<number, string> = {
  28: Genre.ACTION,
  12: Genre.ACTION, // Adventure maps to Action for simplicity
  16: Genre.ANIMATION,
  35: Genre.COMEDY,
  80: Genre.THRILLER, // Crime
  99: Genre.DOCUMENTARY,
  18: Genre.DRAMA,
  10751: Genre.ANIMATION, // Family
  14: Genre.SCI_FI, // Fantasy
  36: Genre.DRAMA, // History
  27: Genre.HORROR,
  10402: Genre.DRAMA, // Music
  9648: Genre.THRILLER, // Mystery
  10749: Genre.ROMANCE,
  878: Genre.SCI_FI,
  10770: Genre.DRAMA, // TV Movie
  53: Genre.THRILLER,
  10752: Genre.ACTION, // War
  37: Genre.ACTION, // Western
};

export const SEED_MOVIES: Movie[] = [
  {
    id: 157336,
    title: "میان ستاره‌ای",
    originalTitle: "Interstellar",
    overview: "تیمی از کاوشگران با استفاده از یک کرم‌چاله تازه کشف شده، برای نجات بشریت به سفری فراتر از کهکشان می‌روند.",
    review: "<p>کریستوفر نولان بار دیگر شاهکاری خلق کرده است که مرزهای علم و احساس را در هم می‌شکند.</p>",
    posterPath: "/gEU2QniL6E8ahDaX06e8q288UL.jpg",
    backdropPath: "/xJHokMBLkbke0umzh2O8Harvey1.jpg",
    releaseDate: "2014-11-05",
    voteAverage: 8.6,
    genres: [Genre.SCI_FI, Genre.DRAMA],
    director: "Christopher Nolan",
    aiAnalysis: {
      mood: ["حماسی", "احساسی", "ذهن‌گیر"],
      whyWatch: "موسیقی متن هانس زیمر و جلوه‌های ویژه خیره‌کننده."
    }
  }
];