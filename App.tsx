import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieGrid from './components/PostGrid'; // We are reusing the file but logic is MovieGrid
import Sidebar from './components/Sidebar';
import AdBanner from './components/AdBanner';
import AdminModal from './components/AdminModal';
import MovieModal from './components/ArticleModal'; // Reusing file
import { Movie, LogEntry, Stats } from './types';
import { SEED_MOVIES } from './constants';
import { enrichMovieWithGemini } from './services/geminiService';
import { fetchPopularMovies, mapTmdbToPartialMovie } from './services/tmdbService';

const STORAGE_KEY = 'fh_movies_v2';
const STATS_KEY = 'fh_stats_v2';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [stats, setStats] = useState<Stats>({ totalViews: 5420, totalRevenue: 45.20, moviesIndexed: 0 });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  // UI
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [nextGenTime, setNextGenTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // --- Init ---
  useEffect(() => {
    const savedMovies = localStorage.getItem(STORAGE_KEY);
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    } else {
      setMovies(SEED_MOVIES);
    }
    
    const savedStats = localStorage.getItem(STATS_KEY);
    if (savedStats) setStats(JSON.parse(savedStats));
  }, []);

  useEffect(() => {
    if (movies.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
    setStats(prev => ({ ...prev, moviesIndexed: movies.length }));
  }, [movies]);

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [{ id: Math.random().toString(), timestamp: new Date().toISOString(), message, type }, ...prev].slice(0, 50));
  }, []);

  // --- Logic ---
  const handleMovieClick = (movie: Movie) => {
    setStats(prev => ({ ...prev, totalViews: prev.totalViews + 1, totalRevenue: prev.totalRevenue + 0.01 }));
    setSelectedMovie(movie);
  };

  const isGeneratingRef = useRef(isGenerating);
  isGeneratingRef.current = isGenerating;

  const performIndexingStep = useCallback(async () => {
    if (!process.env.API_KEY) {
      addLog("Gemini API Key missing!", "error");
      setIsGenerating(false);
      return;
    }

    addLog("📡 Fetching random page from TMDB...", "info");
    
    try {
      // 1. Fetch Random Page
      const randomPage = Math.floor(Math.random() * 50) + 1;
      const tmdbResults = await fetchPopularMovies(randomPage);
      
      // 2. Filter out movies we already have
      const existingIds = new Set(movies.map(m => m.id));
      const candidates = tmdbResults.filter((m: any) => !existingIds.has(m.id));

      if (candidates.length === 0) {
        addLog("All movies on this page indexed. Skipping...", "warning");
      } else {
        // 3. Pick one random candidate
        const target = candidates[Math.floor(Math.random() * candidates.length)];
        addLog(`🎯 Selected: ${target.title} (ID: ${target.id})`, "info");

        // 4. Enrich with Gemini
        addLog("🧠 Sending to Gemini for Farsi translation & review...", "info");
        const partialMovie = mapTmdbToPartialMovie(target);
        const enrichedMovie = await enrichMovieWithGemini(partialMovie);

        setMovies(prev => [enrichedMovie, ...prev]);
        addLog(`✅ Indexed: ${enrichedMovie.title}`, "success");
      }

    } catch (e: any) {
      addLog(`❌ Indexing failed: ${e.message}`, "error");
    }

    // Schedule next
    if (isGeneratingRef.current) {
      const cooldown = 8000; // 8 seconds to be safe
      setNextGenTime(Date.now() + cooldown);
      setTimeout(() => {
        if (isGeneratingRef.current) performIndexingStep();
      }, cooldown);
    }
  }, [movies, addLog]);

  const toggleGeneration = () => {
    const newState = !isGenerating;
    setIsGenerating(newState);
    if (newState) {
      addLog("🚀 Database Indexer STARTED", 'success');
      performIndexingStep();
    } else {
      addLog("🛑 Database Indexer STOPPED", 'warning');
      setNextGenTime(0);
    }
  };

  // Filter for Search
  const displayMovies = searchQuery 
    ? movies.filter(m => m.title.includes(searchQuery) || m.originalTitle.toLowerCase().includes(searchQuery.toLowerCase()))
    : movies;

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-100 pb-20">
      <Header onOpenAdmin={() => setIsAdminOpen(true)} onSearch={setSearchQuery} />

      <main className="container mx-auto px-4 py-8 flex-1">
        
        {/* Ad Slot */}
        <div className="mb-8"><AdBanner variant="leaderboard" /></div>

        {!searchQuery && (
          <section className="mb-16">
            <Hero movie={movies[0] || null} onClick={handleMovieClick} />
          </section>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                {searchQuery ? 'نتایج جستجو' : 'آخرین فیلم‌ها'}
                <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-400">{displayMovies.length}</span>
              </h3>
            </div>
            
            <MovieGrid movies={displayMovies} onMovieClick={handleMovieClick} />
            
            <div className="mt-12"><AdBanner variant="leaderboard" /></div>
          </div>

          <div className="lg:w-1/4">
             <Sidebar 
                topMovies={[...movies].sort((a,b) => b.voteAverage - a.voteAverage).slice(0, 5)} 
                onMovieClick={handleMovieClick}
             />
          </div>

        </div>
      </main>

      <AdminModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)}
        logs={logs}
        stats={stats}
        isGenerating={isGenerating}
        onToggleGeneration={toggleGeneration}
        nextGenerationTime={nextGenTime}
        movies={movies}
        onDeleteMovie={(id) => setMovies(prev => prev.filter(m => m.id !== id))}
      />

      <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />
    </div>
  );
}

export default App;