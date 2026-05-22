import React from 'react';

export default function Sidebar({ currentView, setView, userProfile }) {
  const navItems = [
    { id: 'feed', label: 'Home', icon: 'home' },
    { id: 'explore', label: 'Explore', icon: 'explore' },
    { id: 'create', label: 'Create', icon: 'add_circle' },
    { id: 'profile', label: 'Profile', icon: 'account_circle' },
  ];

  return (
    <>
      {/* Desktop Side Navigation Bar (Hidden on Mobile) */}
      <nav className="w-[80px] lg:w-[240px] h-screen fixed left-0 top-0 flex flex-col py-8 px-3 bg-white dark:bg-[#111] hidden md:flex z-[40] border-r border-gray-100 dark:border-zinc-800 transition-all duration-300">
        {/* Brand Logo Header */}
        <div className="mb-10 px-3 flex items-center justify-center lg:justify-start gap-3 select-none">
          <svg className="w-8 h-8 text-primary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.966 7.398 6.931 0 4.135-2.607 7.462-6.223 7.462-1.215 0-2.358-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C1.492 23.35 12 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"></path>
          </svg>
          <span className="hidden lg:block text-xl font-display font-bold text-primary tracking-tight">Pinterest</span>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center justify-center lg:justify-start gap-4 px-3 py-3 rounded-full transition-all duration-200 active:scale-95 group ${
                  isActive
                    ? 'bg-on-background dark:bg-white text-white dark:text-black font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-zinc-800'
                }`}
              >
                <span className={`material-symbols-outlined ${isActive ? 'active-icon' : ''}`}>
                  {item.icon}
                </span>
                <span className="hidden lg:block font-body text-base">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer Profile area */}
        <div className="mt-auto border-t border-gray-100 dark:border-zinc-800 pt-6 space-y-4">
          <button
            onClick={() => setView('settings')}
            className={`w-full flex items-center justify-center lg:justify-start gap-4 px-3 py-3 rounded-full transition-all duration-200 active:scale-95 ${
              currentView === 'settings'
                ? 'bg-on-background dark:bg-white text-white dark:text-black font-bold'
                : 'text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-zinc-800'
            }`}
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="hidden lg:block font-bold">Settings</span>
          </button>
          
          <div
            onClick={() => setView('profile')}
            className="px-3 flex items-center justify-center lg:justify-start gap-3 cursor-pointer group"
          >
            <img
              alt="User profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary-container transition-all"
              src={userProfile.avatar}
            />
            <div className="hidden lg:block overflow-hidden">
              <span className="block text-sm font-semibold truncate dark:text-white">{userProfile.name}</span>
              <span className="block text-xs text-gray-400 truncate">@{userProfile.username}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar (Hidden on Desktop) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl flex justify-around items-center py-4 px-6 z-[40] border-t border-gray-100 dark:border-zinc-900 shadow-lg">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center transition-all ${
                isActive ? 'text-primary dark:text-white scale-110 font-bold' : 'text-gray-400 dark:text-zinc-500'
              }`}
            >
              {item.id === 'profile' ? (
                <img
                  alt="User"
                  className={`w-6 h-6 rounded-full object-cover border transition-all ${
                    isActive ? 'border-primary dark:border-white' : 'border-transparent'
                  }`}
                  src={userProfile.avatar}
                />
              ) : (
                <span className={`material-symbols-outlined ${isActive ? 'active-icon' : ''}`}>
                  {item.icon}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
}
