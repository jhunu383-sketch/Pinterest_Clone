import React from 'react';

export default function PinCard({ 
  pin, 
  onPinClick, 
  onSaveToggle, 
  isSaved,
  onShareClick
}) {
  return (
    <div 
      onClick={() => onPinClick(pin)}
      className="masonry-item group cursor-zoom-in pin-animate-in select-none"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gray-100 dark:bg-zinc-800 transition-all duration-300">
        <img 
          src={pin.imageUrl} 
          loading="lazy" 
          className="pin-image w-full object-cover transition-all duration-500 group-hover:scale-105" 
          alt={pin.title || pin.category}
        />
        
        {/* Hover Overlay Panel */}
        <div className="pin-overlay absolute inset-0 bg-black/40 p-4 flex flex-col justify-between z-10">
          <div className="flex justify-end">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSaveToggle(pin.id);
              }}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 active:scale-95 shadow-lg ${
                isSaved 
                  ? 'bg-black text-white hover:bg-black/90' 
                  : 'bg-primary text-white hover:bg-primary/95'
              }`}
            >
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onShareClick(pin);
                }}
                className="w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 text-gray-800 dark:text-gray-150 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 transition-all shadow-sm active:scale-90"
                title="Share link"
              >
                <span className="material-symbols-outlined !text-[18px]">share</span>
              </button>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                // Simulates opening options panel
              }}
              className="w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 text-gray-800 dark:text-gray-150 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 transition-all shadow-sm active:scale-90"
              title="More options"
            >
              <span className="material-symbols-outlined !text-[18px]">more_horiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pin Description & Creator info */}
      <div className="mt-3 px-2 flex flex-col gap-1">
        {pin.title && (
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate leading-snug">
            {pin.title}
          </h3>
        )}
        <div className="flex items-center gap-2 overflow-hidden">
          <img 
            src={`https://i.pravatar.cc/32?u=${pin.avatarId || pin.id}`} 
            className="w-6 h-6 rounded-full flex-shrink-0 object-cover border border-gray-100 dark:border-zinc-850" 
            alt="Creator avatar"
          />
          <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400 truncate hover:underline hover:text-gray-700 dark:hover:text-zinc-200 cursor-pointer">
            {pin.creator || 'Pinterest Inspo'}
          </span>
        </div>
      </div>
    </div>
  );
}
