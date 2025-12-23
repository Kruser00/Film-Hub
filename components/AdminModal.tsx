import React, { useState, useEffect, useRef } from 'react';
import { LogEntry, Stats, Movie } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: LogEntry[];
  stats: Stats;
  isGenerating: boolean;
  onToggleGeneration: () => void;
  nextGenerationTime: number;
  movies: Movie[];
  onDeleteMovie: (id: number) => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ 
  isOpen, 
  onClose, 
  logs, 
  stats, 
  isGenerating, 
  onToggleGeneration,
  nextGenerationTime,
  movies,
  onDeleteMovie
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'movies'>('dashboard');
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (logsEndRef.current && activeTab === 'dashboard') {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, activeTab]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(Math.max(0, Math.ceil((nextGenerationTime - Date.now()) / 1000)));
    }, 1000);
    return () => clearInterval(timer);
  }, [nextGenerationTime]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Kruser1200') setIsAuthenticated(true);
    else alert('رمز عبور اشتباه است');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f0f13] border border-white/10 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">مدیریت فیلم هاب</h2>
            <span className="text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded border border-red-600/30">v2.0 Hybrid Engine</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور مدیر" 
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-center tracking-widest"
              />
              <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-500 transition">ورود</button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
             
            {/* Sidebar Controls */}
            <div className="w-full md:w-64 bg-black/20 border-l border-white/10 p-4 flex flex-col gap-2">
              <button onClick={() => setActiveTab('dashboard')} className={`p-3 rounded-xl text-right text-sm font-bold transition ${activeTab === 'dashboard' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}>داشبورد</button>
              <button onClick={() => setActiveTab('movies')} className={`p-3 rounded-xl text-right text-sm font-bold transition ${activeTab === 'movies' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}>فیلم‌ها ({movies.length})</button>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
              
              {activeTab === 'dashboard' && (
                <div className="flex-1 flex flex-col h-full">
                  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <span className="text-xs text-gray-500">فیلم‌های ایندکس شده</span>
                        <div className="text-2xl font-bold text-white">{stats.moviesIndexed}</div>
                     </div>
                     <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <span className="text-xs text-gray-500">بازدید کل</span>
                        <div className="text-2xl font-bold text-green-400">{stats.totalViews}</div>
                     </div>
                     <div className="p-4 rounded-xl border border-dashed border-white/20 flex flex-col justify-center">
                        <button 
                          onClick={onToggleGeneration}
                          className={`w-full py-2 rounded-lg font-bold text-sm ${isGenerating ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-green-500/20 text-green-400'}`}
                        >
                          {isGenerating ? `توقف ربات (${countdown}s)` : 'شروع ایندکس خودکار'}
                        </button>
                     </div>
                  </div>

                  <div className="flex-1 bg-black p-4 overflow-y-auto font-mono text-xs border-t border-white/10">
                    {logs.map(log => (
                      <div key={log.id} className="mb-1">
                        <span className="text-gray-600">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                        <span className={`ml-2 ${log.type === 'error' ? 'text-red-500' : log.type === 'success' ? 'text-green-400' : 'text-blue-300'}`}>
                          {log.message}
                        </span>
                      </div>
                    ))}
                    <div ref={logsEndRef} />
                  </div>
                </div>
              )}

              {activeTab === 'movies' && (
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-2">
                    {movies.map(movie => (
                      <div key={movie.id} className="flex items-center gap-4 bg-white/5 p-2 rounded-lg border border-white/5">
                        <div className="w-10 h-14 bg-gray-800 rounded overflow-hidden">
                           <img src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white text-sm font-bold">{movie.title}</h4>
                          <span className="text-xs text-gray-500">{movie.originalTitle}</span>
                        </div>
                        <button onClick={() => onDeleteMovie(movie.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminModal;