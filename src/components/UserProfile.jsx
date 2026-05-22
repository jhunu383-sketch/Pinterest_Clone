import React, { useState } from 'react';
import PinCard from './PinCard';

export default function UserProfile({ 
  userProfile, 
  onUpdateProfile, 
  allPins,
  onPinClick, 
  onSaveToggle, 
  savedPinIds, 
  onShareClick,
  setView 
}) {
  const [activeTab, setActiveTab] = useState('created'); // 'created' or 'saved'
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editUsername, setEditUsername] = useState(userProfile.username);
  const [editBio, setEditBio] = useState(userProfile.bio || '');
  const [editAvatar, setEditAvatar] = useState(userProfile.avatar);

  // Filter pins based on active tab
  const createdPins = allPins.filter(pin => pin.creator === 'You' || pin.avatarId === 'you-user-id');
  const savedPins = allPins.filter(pin => savedPinIds.includes(pin.id));

  const currentPins = activeTab === 'created' ? createdPins : savedPins;

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      name: editName.trim() || userProfile.name,
      username: editUsername.trim() || userProfile.username,
      bio: editBio.trim(),
      avatar: editAvatar.trim() || userProfile.avatar
    });
    setShowEditModal(false);
  };

  const handleCopyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Profile link copied to clipboard!');
  };

  return (
    <div className="pt-24 pb-24 md:pb-12 px-margin-mobile md:px-margin-desktop transition-all duration-300">
      
      {/* Profile Header Details card */}
      <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-10 mt-4">
        
        {/* Avatar with hover ring */}
        <div className="relative group mb-4">
          <img 
            src={userProfile.avatar} 
            alt={userProfile.name} 
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover shadow-lg border-2 border-white dark:border-zinc-900 group-hover:scale-105 transition-all duration-300"
          />
          <button 
            onClick={() => setShowEditModal(true)}
            className="absolute bottom-1 right-1 bg-white dark:bg-zinc-800 text-gray-800 dark:text-white p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
            title="Edit profile"
          >
            <span className="material-symbols-outlined !text-[16px] block">edit</span>
          </button>
        </div>

        {/* Profile Name & Username */}
        <h1 className="text-3xl font-display font-bold text-gray-800 dark:text-white mb-1 tracking-tight">
          {userProfile.name}
        </h1>
        <p className="text-sm text-gray-400 dark:text-zinc-500 mb-3">
          @{userProfile.username}
        </p>

        {/* Profile Stats */}
        <div className="flex gap-4 text-xs font-semibold text-gray-600 dark:text-zinc-400 mb-4 select-none">
          <span>{userProfile.followers.toLocaleString()} followers</span>
          <span className="text-gray-300 dark:text-zinc-700">•</span>
          <span>{userProfile.following.toLocaleString()} following</span>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-650 dark:text-zinc-350 mb-6 leading-relaxed max-w-md">
          {userProfile.bio || 'Digital Creator. Sharing aesthetics and creative code snippets.'}
        </p>

        {/* Action button toolbar */}
        <div className="flex gap-3">
          <button 
            onClick={handleCopyProfileLink}
            className="px-5 py-2.5 rounded-full font-bold text-xs bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-800 dark:text-white transition-colors"
          >
            Share Profile
          </button>
          <button 
            onClick={() => setShowEditModal(true)}
            className="px-5 py-2.5 rounded-full font-bold text-xs bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-650 text-gray-900 dark:text-white transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex justify-center border-b border-gray-150 dark:border-zinc-850 mb-8 select-none">
        <div className="flex gap-8">
          <button 
            onClick={() => setActiveTab('created')}
            className={`pb-4 px-2 text-sm font-bold relative transition-colors ${
              activeTab === 'created' 
                ? 'text-gray-850 dark:text-white' 
                : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600'
            }`}
          >
            Created
            {activeTab === 'created' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-gray-850 dark:bg-white rounded-full animate-in fade-in zoom-in duration-200"></span>
            )}
          </button>
          
          <button 
            onClick={() => setActiveTab('saved')}
            className={`pb-4 px-2 text-sm font-bold relative transition-colors ${
              activeTab === 'saved' 
                ? 'text-gray-850 dark:text-white' 
                : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600'
            }`}
          >
            Saved
            {activeTab === 'saved' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-gray-850 dark:bg-white rounded-full animate-in fade-in zoom-in duration-200"></span>
            )}
          </button>
        </div>
      </div>

      {/* Feeds Content Canvas */}
      {currentPins.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center max-w-sm mx-auto animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-zinc-850 text-gray-300 dark:text-zinc-650 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined !text-[36px]">
              {activeTab === 'created' ? 'add_a_photo' : 'bookmark_border'}
            </span>
          </div>
          <h3 className="font-display font-bold text-lg text-gray-800 dark:text-white mb-2">
            {activeTab === 'created' ? 'Create your first Pin' : 'Save ideas for later'}
          </h3>
          <p className="text-xs text-gray-400 dark:text-zinc-500 mb-6 leading-relaxed">
            {activeTab === 'created' 
              ? 'Showcase your photography, code setups, vector art, or aesthetic designs directly to your feed.'
              : 'Explore the home or dynamic search feeds, click the red Save button, and they will appear here.'}
          </p>
          {activeTab === 'created' ? (
            <button 
              onClick={() => setView('create')}
              className="px-6 py-3 rounded-full font-bold text-sm bg-primary hover:bg-primary/95 text-white shadow-md active:scale-95 transition-all"
            >
              Create a Pin
            </button>
          ) : (
            <button 
              onClick={() => setView('feed')}
              className="px-6 py-3 rounded-full font-bold text-sm bg-gray-850 hover:bg-black dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white shadow-md active:scale-95 transition-all"
            >
              Find Ideas
            </button>
          )}
        </div>
      ) : (
        <div className="masonry-container">
          {currentPins.map((pin) => (
            <PinCard 
              key={pin.id} 
              pin={pin} 
              onPinClick={onPinClick} 
              onSaveToggle={onSaveToggle}
              isSaved={savedPinIds.includes(pin.id)}
              onShareClick={onShareClick}
            />
          ))}
        </div>
      )}

      {/* Edit Profile Sub-modal Overlay */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
          
          {/* Background click to close */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={() => setShowEditModal(false)}></div>

          {/* Edit form card */}
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl p-6 shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-display font-bold mb-4 dark:text-white">Edit Profile</h2>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              
              {/* Avatar URL */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 mb-1">AVATAR IMAGE URL</label>
                <input 
                  type="text" 
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-850 border border-gray-150 dark:border-zinc-800 focus:border-primary dark:focus:border-primary rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-white focus:outline-none focus:ring-0 transition-colors"
                />
              </div>

              {/* Public Name */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 mb-1">PUBLIC NAME</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full bg-gray-50 dark:bg-zinc-850 border border-gray-150 dark:border-zinc-800 focus:border-primary dark:focus:border-primary rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-white focus:outline-none focus:ring-0 transition-colors"
                />
              </div>

              {/* Username */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 mb-1">USERNAME</label>
                <input 
                  type="text" 
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  required
                  className="w-full bg-gray-50 dark:bg-zinc-850 border border-gray-150 dark:border-zinc-800 focus:border-primary dark:focus:border-primary rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-white focus:outline-none focus:ring-0 transition-colors"
                />
              </div>

              {/* Bio description */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 mb-1">BIO / DESCRIPTION</label>
                <textarea 
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  maxLength={160}
                  className="w-full bg-gray-50 dark:bg-zinc-850 border border-gray-150 dark:border-zinc-800 focus:border-primary dark:focus:border-primary rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-white focus:outline-none focus:ring-0 resize-none transition-colors"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-full font-bold text-xs bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-gray-800 dark:text-white"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-full font-bold text-xs bg-primary hover:bg-primary/95 text-white shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
