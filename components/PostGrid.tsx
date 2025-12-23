import React from 'react';
import { Movie } from '../types';
import { TMDB_IMAGE_BASE } from '../constants';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <article 
          key={movie.id} 
          className="group relative bg-white/5 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2"
          onClick={() => onMovieClick(movie)}
        >
          {/* Poster Image (Vertical) */}
          <div className="aspect-[2/3] relative overflow-hidden">
            <img 
              src={movie.posterPath ? `${TMDB_IMAGE_BASE}${movie.posterPath}` : 'https://via.placeholder.com/300x450'} 
              alt={movie.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              loading="lazy"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
               <button className="bg-red-600 text-white w-full py-2 rounded-lg font-bold text-sm mb-2 shadow-lg">
                 مشاهده
               </button>
            </div>

            {/* Rating Badge */}
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-yellow-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-white/10">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              {movie.voteAverage.toFixed(1)}
            </div>
          </div>
          
          {/* Info */}
          <div className="p-3">
            <h3 className="text-gray-100 font-bold text-sm truncate mb-1 group-hover:text-red-400 transition">
              {movie.title}
            </h3>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{movie.releaseDate.split('-')[0]}</span>
              <span>{movie.genres[0]}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default MovieGrid;