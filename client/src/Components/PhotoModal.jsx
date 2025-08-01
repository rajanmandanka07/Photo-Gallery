import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const PhotoModal = ({ photo, onClose, onNavigate, favorites, toggleFavorite }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        onNavigate('prev');
      } else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        onNavigate('next');
      } else if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'f' || event.key === 'F') {
        toggleFavorite(photo.id);
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onNavigate, onClose, toggleFavorite, photo.id]);

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 transition-opacity duration-300"
      tabIndex={0}
    >
      <div
        ref={modalRef}
        className="relative bg-gray-900 rounded-2xl w-full h-full max-w-none max-h-none shadow-2xl transform transition-all duration-300 scale-95 animate-in overflow-hidden flex flex-col m-4"
      >
        {/* Header with title and buttons - floating over the image */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-4 truncate min-w-0">
            <h3 className="text-white font-bold text-xl sm:text-2xl tracking-tight truncate drop-shadow-lg">
              {photo.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(photo.id);
              }}
              className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-gray-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 backdrop-blur-sm"
              aria-label={favorites.has(photo.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-5 h-5 ${favorites.has(photo.id) ? 'text-red-400 fill-current' : 'text-gray-200'}`}
              />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-gray-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Full-size image container with navigation */}
        <div className="relative flex-1 flex items-center justify-center bg-black overflow-hidden">
          <img
            src={photo.url || photo.thumbnail}
            alt={photo.title}
            className="max-w-full max-h-full object-contain"
          />

          {/* Navigation buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('prev');
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-gray-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm shadow-lg"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('next');
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-gray-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm shadow-lg"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;