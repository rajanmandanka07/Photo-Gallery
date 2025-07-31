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
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300 p-4"
      tabIndex={0}
    >
      <div
        ref={modalRef}
        className="relative bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[95vh] shadow-2xl transform transition-all duration-300 scale-95 animate-in overflow-hidden flex flex-col"
      >
        {/* Header with title and buttons - now above the image */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4 truncate min-w-0">
            <h3 className="text-white font-bold text-xl sm:text-2xl tracking-tight truncate">
              {photo.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(photo.id);
              }}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
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
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Image container with navigation */}
        <div className="relative flex-1 flex items-center justify-center bg-black/20 overflow-hidden p-8">
          <img
            src={photo.url || photo.thumbnail}
            alt={photo.title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />

          {/* Navigation buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('prev');
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800/90 text-gray-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm shadow-lg"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('next');
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800/90 text-gray-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm shadow-lg"
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