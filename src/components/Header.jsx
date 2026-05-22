import React, { useState, useEffect } from 'react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  setView, 
  userProfile, 
  darkMode, 
  setDarkMode,
  currentView
}) {
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showCameraSearch, setShowCameraSearch] = useState(false);

  // Monitor page scroll to add a subtle shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulated voice search triggers
  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      const sampleQueries = [
        'Aesthetic studio setups',
        'Streetwear fashion ideas',
        'Minimalist architecture lines',
        'Healthy salad recipe bowl',
        'Lo-Fi bedroom decor layout'
      ];
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setSearchQuery(randomQuery);
      setIsListening(false);
    }, 2500);
  };

  const notifications = [
    { id: 1, text: 'Elena Martinez saved your Pin to "Design Studio"', time: '2h ago', read: false, avatar: 'https://i.pravatar.cc/40?u=elena' },
    { id: 2, text: 'DevDreams uploaded a new Pin in "React Workspace"', time: '5h ago', read: false, avatar: 'https://i.pravatar.cc/40?u=devdreams' },
    { id: 3, text: 'Trending: "Cozy Japandi Interiors" is popular right now', time: '1d ago', read: true, avatar: 'https://i.pravatar.cc/40?u=pinterest' },
  ];

  const messages = [
    { id: 1, user: 'Marcus Vance', msg: 'Hey! Where did you download that keyboard wallpaper?', time: '1h ago', avatar: 'https://i.pravatar.cc/40?u=marcus' },
    { id: 2, user: 'Sarah Croft', msg: 'The design system specs look complete. Let\'s build it.', time: '3h ago', avatar: 'https://i.pravatar.cc/40?u=sarah' },
  ];

  return (
    <>
      <header className={`fixed top-0 right-0 left-0 md:left-[80px] lg:left-[240px] h-20 z-30 flex items-center gap-4 px-margin-mobile md:px-margin-desktop bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'shadow-sm border-b border-gray-100 dark:border-zinc-900' : ''
      }`}>
        {/* Search Bar Cluster */}
        <div className="flex-1 flex items-center bg-gray-100 dark:bg-zinc-800 border border-transparent px-4 py-2.5 rounded-full search-focus transition-all duration-300">
          <span className="material-symbols-outlined text-gray-400 dark:text-zinc-500 mr-2 !text-[20px] select-none">search</span>
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (currentView !== 'feed') setView('feed');
            }}
            className="bg-transparent border-none focus:outline-none focus:ring-0 w-full text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
            placeholder="Search for ideas, designs, aesthetic..."
            type="text"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 mr-2 transition-colors"
            >
              <span className="material-symbols-outlined !text-[18px]">close</span>
            </button>
          )}
          <div className="flex items-center gap-1.5 text-gray-400 dark:text-zinc-500 border-l border-gray-200 dark:border-zinc-700 pl-3">
            <button 
              onClick={() => setShowCameraSearch(true)}
              className="hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-gray-600 dark:hover:text-zinc-300 p-1.5 rounded-full transition-all"
              title="Search by image"
            >
              <span className="material-symbols-outlined !text-[20px]">photo_camera</span>
            </button>
            <button 
              onClick={handleVoiceSearch}
              className="hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-gray-600 dark:hover:text-zinc-300 p-1.5 rounded-full transition-all"
              title="Search by voice"
            >
              <span className="material-symbols-outlined !text-[20px]">mic</span>
            </button>
          </div>
        </div>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-1.5">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all active:scale-95"
            title="Toggle theme"
          >
            <span className="material-symbols-outlined !text-[22px]">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessages(false);
              }}
              className={`p-2.5 rounded-full transition-all active:scale-95 ${
                showNotifications 
                  ? 'bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-white font-bold' 
                  : 'text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              <span className="material-symbols-outlined !text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 rounded-3xl shadow-xl py-4 px-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                <h3 className="font-display font-bold text-lg px-4 mb-3 dark:text-white">Notifications</h3>
                <div className="space-y-1">
                  {notifications.map((n) => (
                    <div key={n.id} className="flex gap-3 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer items-start">
                      <img src={n.avatar} className="w-9 h-9 rounded-full object-cover" alt="User avatar" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-tight">{n.text}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                      </div>
                      {!n.read && <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Messages Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setShowMessages(!showMessages);
                setShowNotifications(false);
              }}
              className={`p-2.5 rounded-full transition-all active:scale-95 ${
                showMessages 
                  ? 'bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-white font-bold' 
                  : 'text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              <span className="material-symbols-outlined !text-[22px]">chat</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
            </button>

            {/* Messages Dropdown */}
            {showMessages && (
              <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 rounded-3xl shadow-xl py-4 px-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                <h3 className="font-display font-bold text-lg px-4 mb-3 dark:text-white">Inbox</h3>
                <div className="space-y-1">
                  {messages.map((m) => (
                    <div key={m.id} className="flex gap-3 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer items-center">
                      <img src={m.avatar} className="w-9 h-9 rounded-full object-cover" alt="User avatar" />
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <span className="text-xs font-bold dark:text-white truncate">{m.user}</span>
                          <span className="text-[9px] text-gray-400 flex-shrink-0">{m.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-zinc-400 truncate leading-snug">{m.msg}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User profile shortcut (Mobile only header avatar) */}
          <button 
            onClick={() => setView('profile')}
            className="md:hidden w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-zinc-800 ml-1 active:scale-90 transition-transform"
          >
            <img src={userProfile.avatar} className="w-full h-full object-cover" alt="Avatar" />
          </button>
        </div>
      </header>

      {/* Simulated Voice Search Modal Backdrop */}
      {isListening && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 w-80 p-8 rounded-3xl text-center shadow-2xl flex flex-col items-center">
            <h2 className="text-xl font-display font-bold mb-6 dark:text-white animate-pulse">Listening...</h2>
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 relative">
              <span className="material-symbols-outlined text-primary !text-[36px] animate-ping absolute">mic</span>
              <span className="material-symbols-outlined text-primary !text-[36px] relative z-10">mic</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-zinc-400 px-4">Try saying: "Aesthetic workspace layout" or "healthy salads"</p>
          </div>
        </div>
      )}

      {/* Simulated Camera Search Modal */}
      {showCameraSearch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md p-6 rounded-3xl shadow-2xl relative">
            <button 
              onClick={() => setShowCameraSearch(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors"
            >
              <span className="material-symbols-outlined !text-[24px]">close</span>
            </button>
            <h2 className="text-xl font-display font-bold mb-2 dark:text-white">Search by Image</h2>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mb-6">Drag any image here or upload to find visually matching Pins.</p>
            
            <div className="border-2 border-dashed border-gray-200 dark:border-zinc-700 rounded-2xl py-12 px-6 text-center hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined !text-[24px]">cloud_upload</span>
              </div>
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Upload an image file</p>
              <p className="text-xs text-gray-400 dark:text-zinc-500">Supports JPG, PNG, WEBP (Max 5MB)</p>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => setShowCameraSearch(false)}
                className="px-5 py-2.5 rounded-full font-bold text-sm bg-gray-150 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-800 dark:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
