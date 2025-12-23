import { TMDB_API_KEY, TMDB_GENRES } from '../constants';
import { Movie } from '../types';

const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies(page: number = 1) {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("TMDB Fetch Error:", error);
    return [];
  }
}

export async function fetchMovieDetails(movieId: number) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits`);
    return await res.json();
  } catch (error) {
    console.error("TMDB Details Error:", error);
    return null;
  }
}

export function mapTmdbToPartialMovie(tmdbResult: any): Partial<Movie> {
  // Map genre IDs to our string format
  // Explicitly type genres as string[] to avoid 'unknown[]' inference from 'any' source
  const genres: string[] = tmdbResult.genre_ids 
    ? tmdbResult.genre_ids.map((id: number) => TMDB_GENRES[id] || 'سایر').slice(0, 2)
    : [];

  return {
    id: tmdbResult.id,
    originalTitle: tmdbResult.title,
    posterPath: tmdbResult.poster_path,
    backdropPath: tmdbResult.backdrop_path,
    releaseDate: tmdbResult.release_date,
    voteAverage: tmdbResult.vote_average,
    genres: [...new Set(genres)], // Remove duplicates
    overview: tmdbResult.overview // Keep English initially, AI will translate
  };
}