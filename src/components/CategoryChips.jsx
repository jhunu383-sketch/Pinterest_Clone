import React from 'react';

export default function CategoryChips({ activeCategory, setActiveCategory }) {
  const categories = [
    'All',
    'UI Design',
    'Aesthetic Lifestyle',
    'Architecture',
    'Coding',
    'Nature',
    'Anime',
    'Fitness',
    'Cars',
    'Food',
    'Travel',
    'Streetwear',
    'Gadgets',
    'Pets'
  ];

  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6 select-none animate-in fade-in slide-in-from-left-3 duration-300">
      {categories.map((category) => {
        const isActive = activeCategory.toLowerCase() === category.toLowerCase();
        return (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200 active:scale-95 shadow-sm ${
              isActive
                ? 'bg-on-background dark:bg-white text-white dark:text-black font-bold shadow-md'
                : 'bg-surface-container hover:bg-surface-container-highest dark:bg-zinc-800 dark:hover:bg-zinc-700 text-on-surface dark:text-gray-200'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
