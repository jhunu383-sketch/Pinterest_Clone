import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CategoryChips from './components/CategoryChips';
import PinCard from './components/PinCard';
import PinDetailModal from './components/PinDetailModal';
import CreatePinModal from './components/CreatePinModal';
import UserProfile from './components/UserProfile';
import { getImageUrlForCategory } from './utils/imageCurator';

// Initial dataset extracted from the original design screens and beautiful mock presets
const seedPins = [
  {
    id: 1,
    title: "Fall Season Streetwear Lookbook",
    description: "A fashion-forward model posing in vibrant streetwear against a minimalist concrete background. The aesthetic is clean and modern, with soft afternoon sunlight casting long shadows. Colors are neutral with sharp red accents, creating a high-fashion editorial mood.",
    category: "Streetwear",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5BJGqj-Q-QGPcSkNgOJAoj4W402y84nckp3W6m-UyAAk6PzoZUAx9lysEqDp_DrGomwj9WMepX1Z9cmN06XptnBuxI7y9vG_QEgE3gtzYo754P-k2hNWnHEXB-Mh9Yn2BaUGXFjg6F0vgMt4y3btgiwlvZWJPDNd83lI5CcTqSGyMkNfexFUHxF4YLoJGSOdL3VT5Q2niytVWb8OgsWwRGyqgwnDH8oeUTmOqlijeEQrDickkMu7xWwdcDP1DCAOfClK_gwKdUGjs",
    creator: "Luxe Style",
    avatarId: "luxe"
  },
  {
    id: 2,
    title: "Productivity Setup 2024",
    description: "A cinematic, high-angle shot of a sleek developer workspace with a mechanical keyboard and a high-resolution monitor displaying clean React code. The room is dimly lit with subtle neon red and blue ambient lighting. The style is productive, tech-focused, and ultra-modern.",
    category: "Coding",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbbNESdTa0NojIez9WlB_xawGprN4mJrZ3H1kvPNxcnxs1bkQb2_NaCZcUeO5ObRXuBHff6b6RFhzNquWrk5qU5QMe0RC0gHpxlyFn9Hd4kpQblbnnOSJuw9iHbqnOaynNyy--soBco3SL6_M5MiokMSiA3eKXjMSSq3JhPNshuMElqHy6gNyfTzfpawg4xKZvpSq_aECgv0CjzjJ-OxS95J0SwxnKxyEqXdssVgq3OQ_zJKflddv_NrD-42Nz-Fp9yJVBi99uqdip",
    creator: "DevDreams",
    avatarId: "dev"
  },
  {
    id: 3,
    title: "10 Must-Visit Alpine Lakes",
    description: "Breathtaking wide-angle landscape of jagged mountain peaks reflected in a crystal-clear alpine lake. The lighting is early morning golden hour, creating a warm and serene atmosphere. The color palette is dominated by deep blues, forest greens, and warm sunlight hues.",
    category: "Nature",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9Wm0CFCnJkRrqJcJTUu4jj6vaR-WhSw-3tF5UJdoyXbjiytLLUZ55h819WiJ3AULETszykTzlzRVf5_8ZGyAJqF31m-BkhkBEiFsuxmsAaZjiZG2-C8YgdiuzehstHICN2iitYXvBsZAawWEbf2emt3q1r1TfeImg4lACsEG-KEJQYrl-i20d3V1ZnNg-_SKhEIh3d_xPHhKha3sl6pXLyW6qbSCTJjIrSfxRXtU1g8j9qXYszkx7U0vuZYK-tCLBOcOWQy3hHmy1",
    creator: "Wanderlust Journal",
    avatarId: "wander"
  },
  {
    id: 4,
    title: "Quick 15-Min Healthy Lunch Bowl",
    description: "A top-down food photography shot of a vibrant, healthy Buddha bowl filled with fresh avocado, quinoa, and roasted vegetables. The scene is set on a light marble tabletop with soft natural light and a minimalist, clean kitchen aesthetic. Rich colors and sharp textures emphasize freshness.",
    category: "Food",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCouBnmQzwg19KGYVIqie90ZjVgLIPDl7Yo5eKcs136Ldp2VceW-F3cr6qTzJb9v-ARj-i-ERAhMaEFQzWL7J064VSOfq87YNrGhyx1wP7seJF15rSRJEsLstOzEw8vaPjLPDo41ZWUT13qsk50q9w9eXkjAxNoo2JJcdFU9ZYNl-_Xbyw-UOIl9eHacO9UJWca4kSX89ZkvUZdtMFXYruK7ioDn0-l9GHms4AgSeP7zYZhxwpyUHR_IB1P0aoRiBBtXRmf7OiKCRgk",
    creator: "Green Kitchen",
    avatarId: "green"
  },
  {
    id: 5,
    title: "Minimalist Corporate Facade",
    description: "Minimalist architectural shot of a modern skyscraper's glass facade reflecting a bright blue sky. The composition focuses on geometric lines and repetitive patterns, creating a sense of scale and futuristic precision. The aesthetic is high-key, clean, and corporate modern.",
    category: "Architecture",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVbK_HdZxaCEmFId21a3OpXnQchBsNOZMwh0_OCKxvxZg38My5EqWYa9V5E7FwPnV5xH7pc6SpwRb8mFHKpCaWIxRkkk4axTwg4OMkzx9EBIAY7V3ZpNg-dHohNR8yf6oSHXExcJ7ydC_g5fwwARzrxngytJ67aNHOLKrS3m2yOzlVltevW2ufIf8lujuuawHjsIYuaL5zpSOGs_VbFuSfPQp9nl32693iYzhoiHbbFA9j9aZuFq_BnTCQoCqKcpSagG9NidaFc9no",
    creator: "ArchDaily",
    avatarId: "arch"
  },
  {
    id: 6,
    title: "Slow Morning Sunset Vibes",
    description: "A cozy, minimalist living room scene during sunset. Warm amber light fills the space, highlighting a stack of books and a ceramic cup on a wooden table. The vibe is peaceful, slow-living, and highly curated with neutral tones and soft textures.",
    category: "Aesthetic Lifestyle",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKVD5jg2ryc9XHTbb3qkPnspEM3L0E4AvYmxuCKcbxK4bHUHlw2XijEvHemAd06CSHcMNdtmbVT9Tbe4VFNLaSXTv0KQhuvOS1WLEVgtWj-HZlbDh5pvZ0pe09lY7ekJTOI8zU_kZj-Hs42IbX0MWKV5qBj5LXDh5uYaE_J_H27JPhViuFZQtJ5dZkz5S1_HI0PVUEVNZCEkFqxddNTN-d9bvPoN56JSUeLfzSB6JtXgpgzTUHPnxlQlnWH0rCJ3s8l6yAdtnWx-d7",
    creator: "Aesthetic Life",
    avatarId: "aest"
  },
  {
    id: 7,
    title: "Future of Performance Hypercar",
    description: "A high-performance luxury sports car parked in a dark, moody industrial garage. Cinematic lighting highlights the car's sleek curves and metallic finish. The scene is sophisticated and masculine, with a focus on high-end engineering and design excellence.",
    category: "Cars",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_WktID5oRv7WP0c_6HM3cWneFV7sh0UWkBei-xtqeD4_WSCbFAAbOz4HZRi1smBIsrjuAUZY0ZK8_L5ikYWJWEZhtKrCN7cxIpgnWldnjA2WcyAiVkOuYaxaA806_PCQ7G_kh_ZxZAof6SbW-D-3VLszKz63dZWdxoGFtSf-4hcOnVsRMYXMXZTKozGfUk0RplV-B8G3sMq9GuOVf6To01-R7XyzJ0qyVE0EPCbOx3GxHgx1QqQ_i-2At1j1IE9uOVOPKDjytiZAA",
    creator: "Speed Hunter",
    avatarId: "speed"
  },
  {
    id: 8,
    title: "Cyberpunk Tokyo Night Rain",
    description: "Stylized digital anime-style illustration of a bustling Tokyo street at night, glowing with neon signs and rain-slicked pavement. The lighting is cinematic with vibrant purples and teals. The art style is crisp and modern, capturing a nostalgic yet futuristic urban atmosphere.",
    category: "Anime",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLcGusVVIbNnCg6whfHbXDgiYcJEJrBE645IuoHwtqlmrLvtKvdu4C5VJ31naiFkhRBY1OBHVDoKj3X8mIqU0Ag-j4fvDL01rV_doF1CRM1xGnTxXPcs5Rd3FvmnetytMvAGJ9ain-3bml5cPnEqLefBQsYBI7ijeb7or29dD3_6KjaQGAw-wd14JI8M93e3LLAjpfeSGQD2s1YyKDNv_w4CXj9ADjj0uX33QHTZZpuSeulPjtvf1WxguGrQQJ5jUKwIwMXW-B2Hqt",
    creator: "Neo Tokyo",
    avatarId: "neo"
  },
  {
    id: 9,
    title: "Push Your Limits: Gym Spotlights",
    description: "A high-contrast, moody action shot of an athlete training in a rugged, dark-themed commercial gym. Dramatic overhead spotlights create deep shadows and highlight physical form. The mood is intense and motivational, focusing on discipline and strength.",
    category: "Fitness",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhwzVmLhZOV-xmbthAM2GjA4UOH6zl9baVQDk1EKjuf2w0uBt4RI9aVtzX_i8isnBROpRlnpl4x-dEu7hEwtRQRwLL8DmO9r3KPHf6OjaiBPB1q37kC41TdzwZCSKlUfDKzyGR5tjt8q8X8kMdC9akNZ3G5TTfxHYYntnA8ix_dhBrVkd6oQpb3hEiALTh12lgMDwlY3wTPGIYc-ihLJRqFKVSjJ3FZVbBV9A4rtIouo3iYRmIKpbMi6XhiSWKcpAorYov2jLe-Cps",
    creator: "Iron Mind",
    avatarId: "iron"
  },
  {
    id: 10,
    title: "Minimalist Titanium Workspace",
    description: "A sharp, minimalist product photography shot of a high-end titanium laptop on a clean white desk. The lighting is diffused and professional, creating soft gradients and emphasizing the premium materials. The overall aesthetic is ultra-clean and tech-forward.",
    category: "Gadgets",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2D5y3Sro3kcMWSET-qoR1p4SLB9NFIJ1o3llWzfWDWcTYMW7QLkNPQLT-8ShPrmpCTa5vShCSbucuxWyX7GrBRXMUSBAeiJpfS3SPaJC-wIsTxk-nYbdt7qvXcPGNXl72MlgA5dtzBIp2bZTK1oYpjFhBDmO8uQdeaqjNt1rEI6VtaDPfFENtQqBw15clgeY9oq8qgNTr1PrdYX17RyKfawA_rdQVUvN1qiY8d9Xlm9DkFPQyEJMudmRNMj0c2JZrxWfkiv1C6Ztg",
    creator: "Tech Focus",
    avatarId: "tech"
  },
  {
    id: 11,
    title: "Misty Redwood Forest Rays",
    description: "Sunlight streaming through tall redwood trees in a misty, lush green forest. The light rays are clearly defined, creating a magical and ethereal atmosphere. The scene is serene, deep in nature, with vibrant emerald greens and soft golden light.",
    category: "Nature",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIMwWUYW0if7Vqqf6KvGVeDnUxkHHIZRyrm1fOz7rtH6zTpNoA3Ll0CGq3dRDPUbChK0BRoKCzIwCEbg6i8J60x0lIt6SjyMbey0ZIeMqinNnV2v0RUM5kQhDfFTHFa7GEDV3B7KLDaT_xU0I7Ek_OeOo2xmfnZDsukm5-VCYFR2GA8dVnmk7VRswXSBFrfT1IGVnhakboBaEiaKk4aEufIuesf20CgjAtAjCIh6Gcmo8UnTXkevi6_CjMTm3mtXPCpepeoiIHyE09",
    creator: "Eco Nomad",
    avatarId: "eco"
  },
  {
    id: 12,
    title: "Golden Hour Glam Kit",
    description: "Artistic high-end cosmetic flatlay with spilled golden powder and luxury lipstick tubes on a textured beige surface. The lighting is soft and flattering, highlighting the rich pigments and elegant packaging. The aesthetic is sophisticated, feminine, and high-fashion.",
    category: "Aesthetic Lifestyle",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCg5ZZjZvfIlpSlXCg2fx278SUJqEV71E-yYxgohbnjS9nMwRzUkvB9TZfyzX40Z6adrwvTM6o4gtStqdOIh1VEL0-EMh50rhGZuvWoJvTUbSexnviZfIy5yjfxot_Sc3lp8LZcz1uqY7vmoNH5b7E4wbcj8Ww0sGbWEFuK0Zxmlvb3qk4CR6UDstls4NJdQ_fiujUfNdaAN4Ept1ze6jhn6QvmUf6hjSDG-yPLBczix1WhojwjIlpN3INCGRL-W-TJBfqI_OS6RQ8g",
    creator: "Beauty Edit",
    avatarId: "beauty"
  },
  {
    id: 13,
    title: "Futuristic Glass Cabin Design",
    description: "Conceptual glass cabin nestled among pine woods. The structure is transparent, blending indoor minimalist living with dense natural surroundings. The lighting captures the twilight blue hour, emitting a cozy indoor amber glow.",
    category: "Architecture",
    imageUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80",
    creator: "Wood & Steel",
    avatarId: "wood"
  },
  {
    id: 14,
    title: "Tokyo Neon Streets",
    description: "A gorgeous rainy night in Shinjuku, Tokyo. Vibrant pink and neon blue signage reflects on damp asphalt surfaces, featuring pedestrian silhouettes under transparent umbrellas.",
    category: "Travel",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    creator: "Wanderlust",
    avatarId: "wander"
  },
  {
    id: 15,
    title: "Corgi Puppy Sitting Outdoors",
    description: "A close-up portrait of an adorable Pembroke Welsh Corgi puppy sitting on a lush green lawn. The background has warm afternoon sun filters, showing rich golden tones.",
    category: "Pets",
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80",
    creator: "Pet Lovers",
    avatarId: "pet"
  },
  {
    id: 16,
    title: "Neomorphic Dashboard Layout",
    description: "Stunning user interface concept featuring glassmorphic charts, smooth shadows, and a curated dark mode palette. Perfect for admin panel inspiration.",
    category: "UI Design",
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80",
    creator: "Pixel Perfect",
    avatarId: "pixel"
  }
];

export default function App() {
  // Navigation & View States
  const [currentView, setView] = useState('feed'); // 'feed', 'explore', 'create', 'profile', 'settings'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Main data states with local storage checks
  const [pins, setPins] = useState(() => {
    const stored = localStorage.getItem('pinterest-pins');
    return stored ? JSON.parse(stored) : seedPins;
  });

  const [savedPinIds, setSavedPinIds] = useState(() => {
    const stored = localStorage.getItem('pinterest-saved-pins');
    return stored ? JSON.parse(stored) : [1, 2, 6];
  });

  const [userProfile, setUserProfile] = useState(() => {
    const stored = localStorage.getItem('pinterest-user-profile');
    return stored ? JSON.parse(stored) : {
      name: 'Alex Rivera',
      username: 'alexrivera',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACBX0y1BXrx8A3og5owrQ6LKTYzBTrmgjqi4vQVKj-0wcRxcPGwqQW1Hqa7jxRn-q3xjmSC--E6Aj79rrFE47ntbcUZ_X0Sok_NBGdd9-Neo_DKXc6wwgIWetpsn_Ah_8W4gKZ7az69Ys7LQo01bnjySdJFMOKUA_VdRfS_XZBDgcVn7Juc3ots3UhpMXpeOvoCebymW01jXFTCo-8kFqNhBjCAkWPxjNcW3sCuvc82JIYcgMISQikagBbIJxTcV_KbrwkLVmPuG4F',
      bio: 'Digital Creator & Designer. Sharing layout grids, aesthetic lifestyle, code snaps, and minimalist fashion.',
      followers: 4820,
      following: 395
    };
  });

  // Dark Mode States
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('pinterest-dark-mode');
    if (stored) return stored === 'true';
    return false;
  });

  // Overlay states
  const [selectedPin, setSelectedPin] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sync to Local Storage
  useEffect(() => {
    localStorage.setItem('pinterest-pins', JSON.stringify(pins));
  }, [pins]);

  useEffect(() => {
    localStorage.setItem('pinterest-saved-pins', JSON.stringify(savedPinIds));
  }, [savedPinIds]);

  useEffect(() => {
    localStorage.setItem('pinterest-user-profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pinterest-dark-mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pinterest-dark-mode', 'false');
    }
  }, [darkMode]);

  // Auto-generate pins when active category has low count to ensure the feed is filled with relevant images
  useEffect(() => {
    const normCategory = activeCategory.toLowerCase();
    if (normCategory === 'all') return;
    
    setPins(prevPins => {
      const count = prevPins.filter(p => p.category.toLowerCase() === normCategory).length;
      if (count < 15) {
        const newBatch = [];
        const cat = activeCategory;
        const needed = 15 - count;
        
        for (let i = 0; i < needed; i++) {
          const id = Date.now() + i + Math.floor(Math.random() * 10000);
          const randomHeight = [300, 450, 600, 350, 500, 400][Math.floor(Math.random() * 6)];
          newBatch.push({
            id,
            title: `${cat} Design Idea #${id % 100}`,
            description: `A stunning showcase of design ideas, layouts, and curated aesthetics centered around ${cat.toLowerCase()}.`,
            category: cat,
            imageUrl: getImageUrlForCategory(cat, i + count, randomHeight),
            creator: ['Studio Craft', 'Creative Mind', 'Design Labs', 'Aesthetic Hub'][Math.floor(Math.random() * 4)],
            avatarId: `dynamic-${id % 15}`
          });
        }
        return [...prevPins, ...newBatch];
      }
      return prevPins;
    });
  }, [activeCategory]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Scroll logic for Infinite Loading in Feed view
  useEffect(() => {
    if (currentView !== 'feed') return;

    const handleScroll = () => {
      // Trigger when 400px near bottom
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 400) {
        loadMorePins();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView, pins, activeCategory, searchQuery, loading]);

  const loadMorePins = () => {
    if (loading) return;
    setLoading(true);
    
    // Simulate web fetch latency
    setTimeout(() => {
      const newBatch = [];
      const categoriesList = ['UI Design', 'Architecture', 'Coding', 'Nature', 'Fashion', 'Cars', 'Anime', 'Fitness', 'Food', 'Travel', 'Streetwear', 'Gadgets', 'Pets'];
      
      for (let i = 0; i < 12; i++) {
        const id = Date.now() + i + Math.floor(Math.random() * 1000);
        // Match active category if set, otherwise pull random
        const cat = activeCategory.toLowerCase() === 'all' 
          ? categoriesList[Math.floor(Math.random() * categoriesList.length)] 
          : activeCategory;
        
        const randomHeight = [300, 450, 600, 350, 500, 400][Math.floor(Math.random() * 6)];
        newBatch.push({
          id,
          title: `${cat} Workspace Concept #${id % 100}`,
          description: `An artistic aesthetic showcase centering around clean details, modern visual concepts and layout patterns in ${cat}.`,
          category: cat,
          imageUrl: getImageUrlForCategory(cat, id, randomHeight),
          creator: ['Visualist Studio', 'Aesthetic Hub', 'Design Craft', 'Mindful Eye'][Math.floor(Math.random() * 4)],
          avatarId: `dynamic-${id % 15}`
        });
      }
      setPins(prev => [...prev, ...newBatch]);
      setLoading(false);
    }, 750);
  };

  // Save/Unsave Pin State Toggle
  const handleSaveToggle = (id) => {
    let updated;
    if (savedPinIds.includes(id)) {
      updated = savedPinIds.filter(pid => pid !== id);
      showToast('Removed from saved list', 'info');
    } else {
      updated = [...savedPinIds, id];
      showToast('Pin saved successfully!');
    }
    setSavedPinIds(updated);
  };

  // Share Pin Helper
  const handleShareClick = (pin) => {
    const shareUrl = `${window.location.origin}/?pin=${pin.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast('Pin link copied to clipboard!');
    }).catch(() => {
      showToast('Failed to copy link', 'warning');
    });
  };

  // Profile Edit Callback
  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    showToast('Profile updated successfully!');
  };

  // Pin Creation Publisher Callback
  const handlePublishPin = (newPin) => {
    const freshPin = {
      id: Date.now(),
      ...newPin
    };
    setPins([freshPin, ...pins]);
    showToast('Your new Pin was published!');
    setView('profile'); // Switch to profile tab to see it
  };

  // Reset Application Data
  const handleResetData = () => {
    if (window.confirm('Wipe cache and reset to default seed data? All custom comments/saves/pins will be cleared.')) {
      localStorage.clear();
      setPins(seedPins);
      setSavedPinIds([1, 2, 6]);
      setUserProfile({
        name: 'Alex Rivera',
        username: 'alexrivera',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACBX0y1BXrx8A3og5owrQ6LKTYzBTrmgjqi4vQVKj-0wcRxcPGwqQW1Hqa7jxRn-q3xjmSC--E6Aj79rrFE47ntbcUZ_X0Sok_NBGdd9-Neo_DKXc6wwgIWetpsn_Ah_8W4gKZ7az69Ys7LQo01bnjySdJFMOKUA_VdRfS_XZBDgcVn7Juc3ots3UhpMXpeOvoCebymW01jXFTCo-8kFqNhBjCAkWPxjNcW3sCuvc82JIYcgMISQikagBbIJxTcV_KbrwkLVmPuG4F',
        bio: 'Digital Creator & Designer. Sharing layout grids, aesthetic lifestyle, code snaps, and minimalist fashion.',
        followers: 4820,
        following: 395
      });
      setView('feed');
      setActiveCategory('All');
      setSearchQuery('');
      showToast('App reset complete!');
    }
  };

  // Filter Pins for Feed
  const filteredPins = pins.filter(pin => {
    const matchesCategory = activeCategory.toLowerCase() === 'all' || pin.category.toLowerCase() === activeCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      pin.title.toLowerCase().includes(query) || 
      pin.description.toLowerCase().includes(query) ||
      pin.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // curating Explore cards
  const exploreTopics = [
    { name: 'UI Design', label: 'UI Design', desc: 'Neomorphic & Glassmorphic templates', gradient: 'from-blue-600 to-indigo-900', img: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=400&q=80' },
    { name: 'Architecture', label: 'Architecture', desc: 'Minimalist facades & structures', gradient: 'from-orange-500 to-amber-900', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVbK_HdZxaCEmFId21a3OpXnQchBsNOZMwh0_OCKxvxZg38My5EqWYa9V5E7FwPnV5xH7pc6SpwRb8mFHKpCaWIxRkkk4axTwg4OMkzx9EBIAY7V3ZpNg-dHohNR8yf6oSHXExcJ7ydC_g5fwwARzrxngytJ67aNHOLKrS3m2yOzlVltevW2ufIf8lujuuawHjsIYuaL5zpSOGs_VbFuSfPQp9nl32693iYzhoiHbbFA9j9aZuFq_BnTCQoCqKcpSagG9NidaFc9no' },
    { name: 'Coding', label: 'Coding Setups', desc: 'Mechanical keyboards & workspaces', gradient: 'from-purple-600 to-fuchsia-900', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbbNESdTa0NojIez9WlB_xawGprN4mJrZ3H1kvPNxcnxs1bkQb2_NaCZcUeO5ObRXuBHff6b6RFhzNquWrk5qU5QMe0RC0gHpxlyFn9Hd4kpQblbnnOSJuw9iHbqnOaynNyy--soBco3SL6_M5MiokMSiA3eKXjMSSq3JhPNshuMElqHy6gNyfTzfpawg4xKZvpSq_aECgv0CjzjJ-OxS95J0SwxnKxyEqXdssVgq3OQ_zJKflddv_NrD-42Nz-Fp9yJVBi99uqdip' },
    { name: 'Nature', label: 'Nature Scenic', desc: 'Alpine lakes & misty woods', gradient: 'from-green-600 to-emerald-950', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9Wm0CFCnJkRrqJcJTUu4jj6vaR-WhSw-3tF5UJdoyXbjiytLLUZ55h819WiJ3AULETszykTzlzRVf5_8ZGyAJqF31m-BkhkBEiFsuxmsAaZjiZG2-C8YgdiuzehstHICN2iitYXvBsZAawWEbf2emt3q1r1TfeImg4lACsEG-KEJQYrl-i20d3V1ZnNg-_SKhEIh3d_xPHhKha3sl6pXLyW6qbSCTJjIrSfxRXtU1g8j9qXYszkx7U0vuZYK-tCLBOcOWQy3hHmy1' },
    { name: 'Streetwear', label: 'Streetwear Style', desc: 'Fall lookbooks & modern outfits', gradient: 'from-rose-500 to-red-950', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5BJGqj-Q-QGPcSkNgOJAoj4W402y84nckp3W6m-UyAAk6PzoZUAx9lysEqDp_DrGomwj9WMepX1Z9cmN06XptnBuxI7y9vG_QEgE3gtzYo754P-k2hNWnHEXB-Mh9Yn2BaUGXFjg6F0vgMt4y3btgiwlvZWJPDNd83lI5CcTqSGyMkNfexFUHxF4YLoJGSOdL3VT5Q2niytVWb8OgsWwRGyqgwnDH8oeUTmOqlijeEQrDickkMu7xWwdcDP1DCAOfClK_gwKdUGjs' },
    { name: 'Aesthetic Lifestyle', label: 'Cozy Spaces', desc: 'Slow living room sunset vibes', gradient: 'from-amber-500 to-yellow-950', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKVD5jg2ryc9XHTbb3qkPnspEM3L0E4AvYmxuCKcbxK4bHUHlw2XijEvHemAd06CSHcMNdtmbVT9Tbe4VFNLaSXTv0KQhuvOS1WLEVgtWj-HZlbDh5pvZ0pe09lY7ekJTOI8zU_kZj-Hs42IbX0MWKV5qBj5LXDh5uYaE_J_H27JPhViuFZQtJ5dZkz5S1_HI0PVUEVNZCEkFqxddNTN-d9bvPoN56JSUeLfzSB6JtXgpgzTUHPnxlQlnWH0rCJ3s8l6yAdtnWx-d7' }
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-zinc-950 text-on-background dark:text-gray-150 transition-colors duration-300 font-sans antialiased overflow-x-hidden">
      
      {/* 1. Global Navigation Sidebar Shell */}
      <Sidebar 
        currentView={currentView} 
        setView={(v) => {
          setView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        userProfile={userProfile} 
      />

      {/* 2. Global Sticky Header Control */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setView={setView}
        userProfile={userProfile}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentView={currentView}
      />

      {/* 3. Main View Canvas Container */}
      <main className="pt-24 pb-24 md:pb-12 ml-0 md:ml-[80px] lg:ml-[240px]">
        
        {/* VIEW A: FEED (Home Feed / Search Results) */}
        {currentView === 'feed' && (
          <div className="px-margin-mobile md:px-margin-desktop animate-in fade-in duration-300">
            
            {/* Category horizontal scroller */}
            <CategoryChips 
              activeCategory={activeCategory} 
              setActiveCategory={(c) => {
                setActiveCategory(c);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />

            {/* Dynamic Results info label */}
            {(searchQuery || activeCategory !== 'All') && (
              <div className="mb-6 flex justify-between items-center select-none text-xs font-semibold text-gray-500 dark:text-zinc-400 animate-in fade-in duration-300">
                <span>
                  Showing results for {searchQuery ? `"${searchQuery}"` : ''} 
                  {searchQuery && activeCategory !== 'All' ? ' in ' : ''} 
                  {activeCategory !== 'All' ? `#${activeCategory}` : ''}
                </span>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="text-primary dark:text-red-400 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Responsive Masonry Layout */}
            {filteredPins.length === 0 ? (
              <div className="py-24 text-center max-w-sm mx-auto">
                <span className="material-symbols-outlined !text-[44px] text-gray-300 dark:text-zinc-700 mb-4">search_off</span>
                <h3 className="font-display font-bold text-lg text-gray-800 dark:text-white mb-2">No Pins found</h3>
                <p className="text-xs text-gray-400 dark:text-zinc-500 leading-relaxed">
                  We couldn't find matches. Try adjusting your query or resetting category filters to display all presets.
                </p>
              </div>
            ) : (
              <div className="masonry-container">
                {filteredPins.map((pin) => (
                  <PinCard 
                    key={pin.id} 
                    pin={pin} 
                    onPinClick={setSelectedPin} 
                    onSaveToggle={handleSaveToggle}
                    isSaved={savedPinIds.includes(pin.id)}
                    onShareClick={handleShareClick}
                  />
                ))}
              </div>
            )}

            {/* Infinite Scroll loading indicator */}
            <div className="py-12 flex justify-center w-full">
              {loading && (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-4 border-gray-150 border-t-primary dark:border-zinc-800 dark:border-t-red-400 rounded-full animate-spin"></div>
                  <span className="text-xs font-semibold text-gray-400 dark:text-zinc-500">Loading visual concepts...</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW B: EXPLORE */}
        {currentView === 'explore' && (
          <div className="px-margin-mobile md:px-margin-desktop animate-in fade-in duration-300 max-w-5xl mx-auto">
            <div className="text-center py-6 mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 dark:text-white mb-3">Explore the best of Pinterest</h1>
              <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-md mx-auto">Curated design systems, visual trends, and coding presets refreshed daily.</p>
            </div>

            {/* Curated Spotlight Hero Banner */}
            <div 
              onClick={() => {
                setSearchQuery('Japandi');
                setView('feed');
              }}
              className="relative rounded-[32px] overflow-hidden shadow-lg h-60 md:h-80 mb-10 group cursor-pointer"
            >
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80" 
                alt="Spotlight" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8 flex flex-col justify-end">
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1.5">Today's Spotlight</span>
                <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-2 leading-tight">Cozy Japandi Interior Setups</h2>
                <p className="text-xs md:text-sm text-gray-300 max-w-lg leading-relaxed">Discover how minimalism meets warm organic textures in this trending layout system guide.</p>
              </div>
            </div>

            {/* Curated Grid topics */}
            <h3 className="font-display font-bold text-lg text-gray-800 dark:text-white mb-6">Popular Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {exploreTopics.map((topic) => (
                <div 
                  key={topic.name}
                  onClick={() => {
                    setActiveCategory(topic.name);
                    setView('feed');
                  }}
                  className="h-44 rounded-3xl overflow-hidden relative shadow group cursor-pointer active:scale-98 transition-all"
                >
                  <img 
                    src={topic.img} 
                    alt={topic.label} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${topic.gradient} opacity-80 mix-blend-multiply transition-all duration-300 group-hover:opacity-75`}></div>
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h4 className="font-display font-bold text-lg mb-1 leading-snug">{topic.label}</h4>
                    <p className="text-[11px] text-white/80 leading-normal font-medium">{topic.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW C: USER PROFILE */}
        {currentView === 'profile' && (
          <UserProfile 
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            allPins={pins}
            onPinClick={setSelectedPin}
            onSaveToggle={handleSaveToggle}
            savedPinIds={savedPinIds}
            onShareClick={handleShareClick}
            setView={setView}
          />
        )}

        {/* VIEW D: SETTINGS */}
        {currentView === 'settings' && (
          <div className="px-margin-mobile md:px-margin-desktop animate-in fade-in duration-300 max-w-2xl mx-auto">
            <h1 className="text-3xl font-display font-bold text-gray-800 dark:text-white mb-8 border-b border-gray-100 dark:border-zinc-900 pb-4">
              Settings
            </h1>

            <div className="space-y-8">
              
              {/* Account Setting Group */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 dark:text-zinc-500 mb-3 tracking-widest uppercase">Preferences</h3>
                <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 rounded-3xl p-5 space-y-4 shadow-sm">
                  
                  {/* Theme toggler row */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="block text-sm font-bold text-gray-800 dark:text-white leading-tight">Dark Mode Theme</span>
                      <span className="block text-xs text-gray-400">Toggle dark style presets across elements.</span>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ${
                        darkMode ? 'bg-primary' : 'bg-gray-250 dark:bg-zinc-800'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        darkMode ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                </div>
              </div>

              {/* Cache setting Group */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 dark:text-zinc-500 mb-3 tracking-widest uppercase">System Cache</h3>
                <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 rounded-3xl p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="block text-sm font-bold text-gray-800 dark:text-white leading-tight">Reset Application Cache</span>
                      <span className="block text-xs text-gray-400">Clear localStorage comments, saves, and restore original pins.</span>
                    </div>
                    <button 
                      onClick={handleResetData}
                      className="px-5 py-2.5 rounded-full font-bold text-xs bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-650 dark:text-red-400 transition-colors shadow-sm active:scale-95"
                    >
                      Reset App
                    </button>
                  </div>
                </div>
              </div>

              {/* Developer info credit */}
              <div className="bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-3xl p-6 text-center text-xs text-gray-500 dark:text-zinc-400 leading-relaxed shadow-sm">
                <div className="font-display font-bold text-gray-800 dark:text-white text-sm mb-1">Pinterest Frontend Project</div>
                Designed and implemented utilizing Antigravity AI Code System. Incorporates responsive React models, CSS columns masonry, and state persistence tags.
              </div>

            </div>
          </div>
        )}

      </main>

      {/* 4. inline rendering Create modal overlay */}
      {currentView === 'create' && (
        <CreatePinModal 
          onClose={() => setView('feed')} 
          onPublish={handlePublishPin} 
        />
      )}

      {/* 5. Details Modal Overlay Sheet */}
      {selectedPin && (
        <PinDetailModal 
          pin={selectedPin}
          onClose={() => setSelectedPin(null)}
          onSaveToggle={handleSaveToggle}
          savedPinIds={savedPinIds}
          allPins={pins}
          onPinClick={(pin) => {
            setSelectedPin(pin);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onShareClick={handleShareClick}
        />
      )}

      {/* 6. Success / Warning Floating Toasts alerts */}
      {toast && (
        <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white dark:bg-white dark:text-black px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 font-semibold text-xs border border-zinc-800 dark:border-gray-200">
          <span className="material-symbols-outlined text-green-500 dark:text-green-600 !text-[18px] select-none">check_circle</span>
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
}
