import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import { TMDB_BACKDROP_BASE, TMDB_IMAGE_BASE } from '../constants';
import AdBanner from './AdBanner';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    if (movie) {
      document.title = `${movie.title} | فیلم هاب`;
      const watchlist = JSON.parse(localStorage.getItem('fh_watchlist') || '[]');
      setIsInWatchlist(watchlist.some((m: Movie) => m.id === movie.id));
    } else {
      document.title = "فیلم هاب | FilmHub";
    }
    return () => { document.title = "فیلم هاب | FilmHub"; };
  }, [movie]);

  const toggleWatchlist = () => {
    if (!movie) return;
    const watchlist = JSON.parse(localStorage.getItem('fh_watchlist') || '[]');
    let newWatchlist;
    if (isInWatchlist) {
      newWatchlist = watchlist.filter((m: Movie) => m.id !== movie.id);
    } else {
      newWatchlist = [...watchlist, movie];
    }
    localStorage.setItem('fh_watchlist', JSON.stringify(newWatchlist));
    setIsInWatchlist(!isInWatchlist);
  };

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto min-h-screen relative shadow-2xl bg-[#0a0a0a] border-x border-white/5">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="fixed top-6 left-6 z-50 bg-black/50 hover:bg-red-600 text-white p-3 rounded-full border border-white/10 transition backdrop-blur-md group"
        >
          <svg className="w-6 h-6 group-hover:rotate-90 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hero Section */}
        <div className="relative h-[60vh] w-full">
           <img 
            src={movie.backdropPath ? `${TMDB_BACKDROP_BASE}${movie.backdropPath}` : ''} 
            className="w-full h-full object-cover opacity-40 mask-image-b"
            alt="backdrop"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
           
           <div className="absolute bottom-0 w-full px-8 md:px-16 pb-12 flex flex-col md:flex-row gap-8 items-end">
             {/* Poster */}
             <img 
                src={movie.posterPath ? `${TMDB_IMAGE_BASE}${movie.posterPath}` : ''}
                className="w-48 md:w-64 rounded-xl shadow-2xl border-2 border-white/10 hidden md:block rotate-2 hover:rotate-0 transition duration-500"
                alt="poster"
             />
             
             <div className="flex-1 mb-4">
               <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">{movie.title}</h1>
               <h2 className="text-xl text-gray-400 mb-6 font-mono dir-ltr text-right">{movie.originalTitle} ({movie.releaseDate.split('-')[0]})</h2>
               
               <div className="flex flex-wrap gap-4 mb-8">
                  <button 
                    onClick={toggleWatchlist}
                    className={`px-8 py-3 rounded-xl font-bold transition flex items-center gap-2 ${isInWatchlist ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-gray-200'}`}
                  >
                    {isInWatchlist ? '✓ در لیست تماشا' : '+ افزودن به لیست'}
                  </button>
                  <div className="bg-black/50 backdrop-blur-md border border-white/10 px-6 py-3 rounded-xl text-white font-mono font-bold flex items-center gap-2">
                    <span className="text-yellow-400 text-lg">★</span> {movie.voteAverage.toFixed(1)}
                  </div>
               </div>

               {/* AI Mood Tags */}
               {movie.aiAnalysis && (
                 <div className="flex gap-2">
                   {movie.aiAnalysis.mood.map(m => (
                     <span key={m} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">#{m}</span>
                   ))}
                 </div>
               )}
             </div>
           </div>
        </div>

        {/* Content Body */}
        <div className="px-8 md:px-16 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h3 className="text-2xl font-bold text-white mb-4 border-r-4 border-red-600 pr-4">خلاصه داستان</h3>
              <p className="text-lg text-gray-300 leading-loose text-justify">{movie.overview}</p>
            </section>

            <section className="bg-white/5 p-8 rounded-2xl border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 p-4 opacity-10">
                 <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" /></svg>
               </div>
               <h3 className="text-xl font-bold text-indigo-400 mb-4 relative z-10">نقد و بررسی هوشمند</h3>
               <div 
                  className="prose prose-invert max-w-none text-gray-300 leading-loose relative z-10"
                  dangerouslySetInnerHTML={{ __html: movie.review }}
               />
            </section>

             {movie.aiAnalysis?.whyWatch && (
               <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/20 p-6 rounded-xl flex items-center gap-4">
                 <div className="text-4xl">💡</div>
                 <div>
                   <h4 className="font-bold text-green-400 mb-1">چرا باید ببینید؟</h4>
                   <p className="text-gray-300 text-sm">{movie.aiAnalysis.whyWatch}</p>
                 </div>
               </div>
             )}

            <div className="my-8">
              <AdBanner variant="leaderboard" />
            </div>

          </div>

          <div className="space-y-8">
             <div className="bg-white/5 rounded-2xl p-6 border border-white/10 sticky top-24">
                <h4 className="font-bold text-white mb-6">اطلاعات فیلم</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ژانرها</span>
                    <span className="text-gray-300">{movie.genres.join('، ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">سال ساخت</span>
                    <span className="text-gray-300">{movie.releaseDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">کارگردان</span>
                    <span className="text-gray-300">{movie.director || 'نامشخص'}</span>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/10">
                   <AdBanner variant="rectangle" className="h-[250px]" />
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MovieModal;