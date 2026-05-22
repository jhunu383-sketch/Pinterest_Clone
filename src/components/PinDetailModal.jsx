import React, { useState, useEffect, useMemo } from 'react';
import PinCard from './PinCard';
import { getImageUrlForCategory } from '../utils/imageCurator';

export default function PinDetailModal({ 
  pin, 
  onClose, 
  onSaveToggle, 
  savedPinIds, 
  allPins, 
  onPinClick, 
  onShareClick 
}) {
  const isSaved = savedPinIds.includes(pin.id);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(1280);

  // Generate initial mock comments when pin changes
  useEffect(() => {
    const mockComments = [
      { id: 1, user: 'CreativeMind', avatar: 'https://i.pravatar.cc/32?u=creative', text: 'This is absolutely gorgeous! Going to try this out.', likes: 12, time: '2h ago' },
      { id: 2, user: 'DevSetup', avatar: 'https://i.pravatar.cc/32?u=setup', text: 'Incredible lighting, love the color palette here.', likes: 5, time: '4h ago' }
    ];
    setComments(mockComments);
    setIsFollowing(false);
    setFollowerCount(Math.floor(Math.random() * 5000) + 150);
  }, [pin]);

  // Lock parent window scroll when modal is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      user: 'You',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACBX0y1BXrx8A3og5owrQ6LKTYzBTrmgjqi4vQVKj-0wcRxcPGwqQW1Hqa7jxRn-q3xjmSC--E6Aj79rrFE47ntbcUZ_X0Sok_NBGdd9-Neo_DKXc6wwgIWetpsn_Ah_8W4gKZ7az69Ys7LQo01bnjySdJFMOKUA_VdRfS_XZBDgcVn7Juc3ots3UhpMXpeOvoCebymW01jXFTCo-8kFqNhBjCAkWPxjNcW3sCuvc82JIYcgMISQikagBbIJxTcV_KbrwkLVmPuG4F',
      text: newComment.trim(),
      likes: 0,
      time: 'Just now'
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowerCount(followerCount - 1);
    } else {
      setFollowerCount(followerCount + 1);
    }
    setIsFollowing(!isFollowing);
  };

  const handleDownload = () => {
    // Standard file download helper
    const link = document.createElement('a');
    link.href = pin.imageUrl;
    link.download = `${pin.title || 'pinterest-pin'}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter similar pins for the "More like this" feed
  const relatedPins = useMemo(() => {
    const matches = allPins.filter(
      p => p.id !== pin.id && p.category.toLowerCase() === pin.category.toLowerCase()
    );

    if (matches.length < 6) {
      const generated = [...matches];
      const needed = 6 - matches.length;
      for (let i = 0; i < needed; i++) {
        const fakeId = `fake-related-${pin.id}-${i}`;
        const randomHeight = [300, 450, 350, 400][i % 4];
        generated.push({
          id: fakeId,
          title: `${pin.category} Inspiration #${i + 1}`,
          description: `More inspired ideas and premium layouts in the ${pin.category.toLowerCase()} category.`,
          category: pin.category,
          imageUrl: getImageUrlForCategory(pin.category, pin.id + i + 10, randomHeight),
          creator: ['Studio Design', 'Creative Feed', 'Visual Space', 'Concept Art'][i % 4],
          avatarId: `fake-avatar-${i}`
        });
      }
      return generated;
    }
    return matches.slice(0, 6);
  }, [pin, allPins]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-0 sm:p-4 overflow-y-auto animate-in fade-in duration-300">
      
      {/* Background click to close */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose}></div>

      {/* Main Details Sheet Container */}
      <div className="bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-none sm:rounded-[32px] shadow-2xl relative z-10 flex flex-col h-full sm:h-auto max-h-[100vh] sm:max-h-[90vh] overflow-y-auto no-scrollbar scroll-smooth animate-in zoom-in-95 duration-300">
        
        {/* Close Button overlay */}
        <button 
          onClick={onClose} 
          className="absolute left-4 top-4 w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-800/90 text-gray-800 dark:text-gray-150 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-700 shadow-md active:scale-90 z-20 transition-all"
        >
          <span className="material-symbols-outlined !text-[20px]">arrow_back</span>
        </button>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Pinterest Image */}
          <div className="w-full bg-gray-50 dark:bg-zinc-950 flex items-center justify-center relative min-h-[300px] sm:min-h-[450px]">
            <img 
              src={pin.imageUrl} 
              alt={pin.title} 
              className="w-full h-full object-cover max-h-[50vh] md:max-h-[75vh]"
            />
          </div>

          {/* Right Column: Interaction Hub */}
          <div className="p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 dark:border-zinc-800">
            <div>
              {/* Action Toolbar */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <button 
                    onClick={handleDownload}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200 flex items-center justify-center transition-all active:scale-90"
                    title="Download image"
                  >
                    <span className="material-symbols-outlined !text-[20px]">download</span>
                  </button>
                  <button 
                    onClick={() => onShareClick(pin)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200 flex items-center justify-center transition-all active:scale-90"
                    title="Copy Link"
                  >
                    <span className="material-symbols-outlined !text-[20px]">link</span>
                  </button>
                </div>
                
                <button 
                  onClick={() => onSaveToggle(pin.id)}
                  className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 active:scale-95 shadow-md ${
                    isSaved 
                      ? 'bg-black text-white hover:bg-black/90' 
                      : 'bg-primary text-white hover:bg-primary/95'
                  }`}
                >
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              </div>

              {/* Title & Description */}
              <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-800 dark:text-white mb-2 leading-tight">
                {pin.title || `${pin.category} Inspiration`}
              </h1>
              <p className="text-sm text-gray-600 dark:text-zinc-400 mb-6 leading-relaxed">
                {pin.description || `Explore this gorgeous photography capture and layout ideas centered around ${pin.category.toLowerCase()} and modern aesthetic choices.`}
              </p>

              {/* Creator Card */}
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-zinc-800 pb-6">
                <div className="flex items-center gap-3 overflow-hidden">
                  <img 
                    src={`https://i.pravatar.cc/48?u=${pin.avatarId || pin.id}`} 
                    className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-zinc-800" 
                    alt="Creator"
                  />
                  <div>
                    <span className="block text-sm font-bold text-gray-800 dark:text-white truncate leading-tight hover:underline cursor-pointer">
                      {pin.creator || 'Design Studio'}
                    </span>
                    <span className="block text-xs text-gray-400">
                      {followerCount.toLocaleString()} followers
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={handleFollowToggle}
                  className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all ${
                    isFollowing 
                      ? 'bg-gray-100 hover:bg-gray-200 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-gray-800 dark:text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-gray-850 dark:text-gray-150'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>

              {/* Comments Thread Title */}
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="font-bold text-gray-800 dark:text-white">
                  Comments ({comments.length})
                </h3>
              </div>

              {/* Comments Scroller */}
              <div className="max-h-[220px] overflow-y-auto space-y-4 mb-6 pr-2">
                {comments.length === 0 ? (
                  <p className="text-xs text-gray-400 dark:text-zinc-500 italic py-2">No comments yet. Share your thoughts!</p>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className="flex items-start gap-2.5 text-sm">
                      <img src={c.avatar} className="w-7 h-7 rounded-full object-cover flex-shrink-0" alt="" />
                      <div className="flex-1 bg-gray-50 dark:bg-zinc-800/50 p-2.5 rounded-2xl">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <span className="font-bold text-xs text-gray-800 dark:text-white">{c.user}</span>
                          <span className="text-[10px] text-gray-400">{c.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-zinc-300 leading-normal">{c.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Comment Composer Input */}
            <form onSubmit={handlePostComment} className="flex gap-2.5 items-center border-t border-gray-100 dark:border-zinc-800 pt-4">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACBX0y1BXrx8A3og5owrQ6LKTYzBTrmgjqi4vQVKj-0wcRxcPGwqQW1Hqa7jxRn-q3xjmSC--E6Aj79rrFE47ntbcUZ_X0Sok_NBGdd9-Neo_DKXc6wwgIWetpsn_Ah_8W4gKZ7az69Ys7LQo01bnjySdJFMOKUA_VdRfS_XZBDgcVn7Juc3ots3UhpMXpeOvoCebymW01jXFTCo-8kFqNhBjCAkWPxjNcW3sCuvc82JIYcgMISQikagBbIJxTcV_KbrwkLVmPuG4F" 
                className="w-8 h-8 rounded-full object-cover" 
                alt="Your avatar" 
              />
              <div className="flex-1 flex bg-gray-100 dark:bg-zinc-800 rounded-full px-4 py-2 border border-transparent focus-within:border-gray-200 dark:focus-within:border-zinc-700">
                <input 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="bg-transparent border-none focus:outline-none focus:ring-0 w-full text-xs text-gray-800 dark:text-white placeholder:text-gray-400"
                  placeholder="Add a comment..."
                />
                <button 
                  type="submit" 
                  className={`text-xs font-bold text-primary dark:text-red-400 hover:text-primary-container transition-colors ml-2 ${
                    newComment.trim() ? 'opacity-100' : 'opacity-40 cursor-default'
                  }`}
                  disabled={!newComment.trim()}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Section: More Like This (Pinterest feed style recommendation) */}
        {relatedPins.length > 0 && (
          <div className="p-6 md:p-8 bg-gray-50/50 dark:bg-zinc-950/20 border-t border-gray-100 dark:border-zinc-800">
            <h3 className="font-display font-bold text-lg text-gray-800 dark:text-white mb-6 text-center">
              More like this
            </h3>
            <div className="masonry-container">
              {relatedPins.map((p) => (
                <PinCard 
                  key={p.id} 
                  pin={p} 
                  onPinClick={onPinClick} 
                  onSaveToggle={onSaveToggle}
                  isSaved={savedPinIds.includes(p.id)}
                  onShareClick={onShareClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
