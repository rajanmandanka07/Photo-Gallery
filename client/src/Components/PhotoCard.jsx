import { Heart } from 'lucide-react';

const PhotoCard = ({ photo, favorites, toggleFavorite, openModal }) => (
  <div
    className="group relative overflow-hidden rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-xl"
    onClick={() => openModal(photo)}
  >
    <div className="relative aspect-[4/3]">
      <div className="absolute inset-0 bg-gray-800/50 animate-pulse rounded-lg" />
      <img
        src={photo.thumbnail}
        alt={photo.title}
        className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        onLoad={(e) => {
          e.target.classList.remove('opacity-0');
          e.target.previousSibling.remove();
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(photo.id);
        }}
        className="absolute top-3 right-3 p-2 rounded-full bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-900/80 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label={favorites.has(photo.id) ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          className={`w-4 h-4 transition-colors duration-200 ${
            favorites.has(photo.id) ? 'text-red-400 fill-current' : 'text-gray-200'
          }`}
        />
      </button>
      <div className="absolute bottom-4 left-4 right-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <h3 className="text-white font-semibold text-lg tracking-tight">{photo.title}</h3>
      </div>
    </div>
  </div>
);

export default PhotoCard;