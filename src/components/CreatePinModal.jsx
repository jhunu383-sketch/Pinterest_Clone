import React, { useState, useRef } from 'react';

export default function CreatePinModal({ onClose, onPublish }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('UI Design');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const categories = [
    'UI Design', 'Architecture', 'Coding', 'Nature', 
    'Fashion', 'Cars', 'Anime', 'Fitness', 'Food', 'Aesthetic'
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imagePreview) {
      alert('Please select or drop an image first.');
      return;
    }

    onPublish({
      title: title.trim() || 'Untitled Pin',
      description: description.trim() || `Inspiration about ${category}`,
      link: link.trim() || '',
      category,
      imageUrl: imagePreview,
      creator: 'You',
      avatarId: 'you-user-id'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
      
      {/* Click outside to close */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose}></div>

      {/* Sheet Modal Container */}
      <div className="bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-[32px] shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row h-auto max-h-[95vh] sm:max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute left-6 top-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-250 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-800 dark:text-white flex items-center justify-center shadow-sm active:scale-90 z-20 transition-all"
        >
          <span className="material-symbols-outlined !text-[20px]">close</span>
        </button>

        {/* Drag and Drop Upload Area (Left Pane) */}
        <div className="w-full md:w-1/2 p-8 pt-20 flex flex-col bg-gray-50 dark:bg-zinc-950/40 border-b md:border-b-0 md:border-r border-gray-100 dark:border-zinc-800 min-h-[320px] md:min-h-[480px]">
          <h3 className="text-sm font-bold text-gray-500 dark:text-zinc-400 mb-4">DRAG & DROP IMAGE</h3>
          
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
            className={`flex-1 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all ${
              isDragOver 
                ? 'border-primary bg-primary/5 dark:bg-red-950/10 scale-[0.99]' 
                : 'border-gray-200 hover:border-gray-300 dark:border-zinc-800 dark:hover:border-zinc-700'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" 
              accept="image/*"
            />
            
            {imagePreview ? (
              <div className="relative w-full h-full min-h-[220px] flex items-center justify-center rounded-2xl overflow-hidden group">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-[360px] object-contain rounded-2xl shadow-md transition-all group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <span className="text-white text-xs font-bold bg-black/60 px-4 py-2 rounded-full flex items-center gap-1.5 shadow">
                    <span className="material-symbols-outlined !text-[16px]">edit</span> Change Image
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-8">
                <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 flex items-center justify-center mb-4 shadow-inner">
                  <span className="material-symbols-outlined !text-[28px]">upload_file</span>
                </div>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Drag and drop or click to upload
                </p>
                <p className="text-xs text-gray-400 dark:text-zinc-500 max-w-[200px]">
                  We recommend high quality .jpg or .png files under 10MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Form Inputs (Right Pane) */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-8 pt-20 flex flex-col justify-between h-full min-h-[480px]">
          <div className="space-y-6">
            
            {/* Header controls inside form */}
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-zinc-800">
              <h2 className="text-xl font-display font-bold text-gray-800 dark:text-white">Create a Pin</h2>
              <button 
                type="submit" 
                className={`px-6 py-2.5 rounded-full font-bold text-sm text-white shadow-md active:scale-95 transition-all duration-250 ${
                  imagePreview 
                    ? 'bg-primary hover:bg-primary/95' 
                    : 'bg-gray-300 dark:bg-zinc-800 text-gray-500 cursor-not-allowed shadow-none'
                }`}
                disabled={!imagePreview}
              >
                Publish
              </button>
            </div>

            {/* Title Input */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-450 dark:text-zinc-500 mb-1">TITLE</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add your title" 
                className="w-full bg-transparent border-0 border-b border-gray-100 dark:border-zinc-800 focus:border-primary dark:focus:border-primary px-0 py-2.5 text-base md:text-lg font-bold text-gray-800 dark:text-white placeholder:text-gray-300 dark:placeholder:text-zinc-700 focus:outline-none focus:ring-0 transition-colors"
                maxLength={80}
              />
            </div>

            {/* Description Input */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-455 dark:text-zinc-500 mb-1">DESCRIPTION</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell everyone what your Pin is about" 
                rows={3}
                className="w-full bg-transparent border-0 border-b border-gray-100 dark:border-zinc-800 focus:border-primary dark:focus:border-primary px-0 py-2 text-sm text-gray-650 dark:text-zinc-300 placeholder:text-gray-300 dark:placeholder:text-zinc-700 focus:outline-none focus:ring-0 resize-none transition-colors"
                maxLength={500}
              />
            </div>

            {/* Destination Link Input */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-450 dark:text-zinc-500 mb-1">DESTINATION LINK (OPTIONAL)</label>
              <input 
                type="url" 
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Add a destination link (e.g. https://...)" 
                className="w-full bg-transparent border-0 border-b border-gray-100 dark:border-zinc-800 focus:border-primary dark:focus:border-primary px-0 py-2.5 text-sm text-gray-700 dark:text-zinc-350 placeholder:text-gray-300 dark:placeholder:text-zinc-700 focus:outline-none focus:ring-0 transition-colors"
              />
            </div>

            {/* Category Select Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-450 dark:text-zinc-500 mb-2">CHOOSE A CATEGORY</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isSelected = category === cat;
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                        isSelected 
                          ? 'bg-primary/10 border-primary text-primary dark:text-red-400 dark:border-red-900/50' 
                          : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border-transparent hover:bg-gray-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="pt-6 text-center text-[10px] text-gray-400 dark:text-zinc-650">
            Publishing as a creator allows your followers to see this Pin on their home feed.
          </div>
        </form>

      </div>
    </div>
  );
}
