import React from 'react';
import { Movie } from '../types';
import AdBanner from './AdBanner';

interface SidebarProps {
  topMovies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ topMovies, onMovieClick }) => {
  return (
    <aside className="space-y-8 sticky top-28">
      
      {/* Ad Slot */}
      <AdBanner variant="rectangle" />

      {/* Top Movies Widget */}
      <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
        <h4 className="font-bold text-white mb-6 text-lg border-b border-white/10 pb-2 flex items-center gap-2">
          <span className="text-yellow-500">★</span> برترین‌های سایت
        </h4>
        <div className="space-y-5">
          {topMovies.map((movie, idx) => (
            <div 
              key={movie.id} 
              className="flex items-center gap-4 cursor-pointer group"
              onClick={() => onMovieClick(movie)}
            >
              <div className="font-black text-3xl text-white/10 w-8 text-center group-hover:text-red-500/50 transition">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-bold text-gray-200 group-hover:text-red-400 transition line-clamp-1">
                  {movie.title}
                </h5>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400">{movie.voteAverage.toFixed(1)}</span>
                  <span className="text-xs text-gray-500">{movie.genres[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social / Newsletter */}
      <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 p-6 rounded-2xl shadow-lg border border-red-500/20 text-center">
        <h4 className="font-bold text-white mb-2">عاشق فیلم هستید؟</h4>
        <p className="text-gray-300 text-sm mb-4">به جمع ۵۰,۰۰۰ کاربر فیلم هاب بپیوندید</p>
        <button className="w-full bg-red-600 hover:bg-red-500 transition py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-600/30 text-white">
          عضویت رایگان
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;