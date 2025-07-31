import { useState, useEffect } from 'react';
import photosData from './photos.json';
import GalleryHeader from './GalleryHeader';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';
import GalleryFooter from './GalleryFooter';
import styles from './PhotoGallery.module.css';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPhotos(photosData);
      setFilteredPhotos(photosData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = photos.filter(
      (photo) =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.photographer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    );
    setFilteredPhotos(filtered);
  }, [searchTerm, photos]);

  const toggleFavorite = (photoId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(photoId)) {
      newFavorites.delete(photoId);
    } else {
      newFavorites.add(photoId);
    }
    setFavorites(newFavorites);
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction) => {
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredPhotos.length;
    } else {
      newIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
    }

    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-200 text-lg font-medium">Loading Gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gray-950 text-gray-100 font-sans flex flex-col ${styles.galleryContainer}`}
      style={{ overflowY: 'auto' }}
    >
      <GalleryHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="container mx-auto px-4 sm:px-6 py-8 flex-grow">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-300 text-xl font-medium">No photos found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                openModal={openModal}
              />
            ))}
          </div>
        )}
      </main>
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={closeModal}
          onNavigate={navigatePhoto}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}
      <GalleryFooter />
    </div>
  );
};

export default PhotoGallery;