import React from 'react';

interface HeaderProps {
  onOpenAdmin: () => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAdmin, onSearch }) => {
  return (
    <header className="bg-black/80 backdrop-blur-xl shadow-lg sticky top-0 z-40 border-b border-indigo-500/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3 min-w-fit">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-red-500/20 shadow-lg">
            ▶
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight hidden sm:block">
            فیلم <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">هاب</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative hidden md:block">
          <input 
            type="text" 
            placeholder="جستجو در بین هزاران فیلم..." 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 px-12 text-gray-200 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition placeholder-gray-500"
          />
          <svg className="w-5 h-5 absolute right-4 top-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex items-center gap-6 text-gray-400 font-medium text-sm">
            <a href="#" className="hover:text-white transition">خانه</a>
            <a href="#" className="hover:text-white transition">تازه ها</a>
            <a href="#" className="hover:text-white transition">برترین ها</a>
          </nav>

          <button 
            onClick={onOpenAdmin}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-4 py-2 rounded-xl text-sm transition flex items-center gap-2"
          >
            <span className="hidden sm:inline">مدیریت</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543 .826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;