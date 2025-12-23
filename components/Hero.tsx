import React from 'react';
import { Movie } from '../types';
import { TMDB_BACKDROP_BASE } from '../constants';

interface HeroProps {
  movie: Movie | null;
  onClick: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onClick }) => {
  if (!movie) return null;

  return (
    <div className="relative w-full h-[550px] bg-gray-900 overflow-hidden rounded-3xl shadow-2xl group cursor-pointer border border-white/5" onClick={() => onClick(movie)}>
      {/* Backdrop Image */}
      <img 
        src={movie.backdropPath ? `${TMDB_BACKDROP_BASE}${movie.backdropPath}` : 'https://via.placeholder.com/1920x1080'} 
        alt={movie.title} 
        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-1000 ease-in-out"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 right-0 p-8 md:p-16 w-full md:w-2/3 lg:w-1/2">
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genres.map(g => (
            <span key={g} className="bg-red-600/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {g}
            </span>
          ))}
          <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
             ⭐ {movie.voteAverage.toFixed(1)} TMDB
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight drop-shadow-xl">
          {movie.title}
        </h2>
        
        <p className="text-gray-300 text-lg mb-8 line-clamp-3 leading-relaxed opacity-90">
          {movie.overview}
        </p>

        <div className="flex items-center gap-4">
          <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-1.5a1 1 0 000-1.664l-3-1.5z" /></svg>
            مشاهده جزئیات
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium backdrop-blur-md border border-white/10 transition">
            + لیست تماشا
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;