import { useState, useEffect } from 'react';
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/photos');
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch photos');
        }

        const transformedPhotos = result.data.photos.map((photo, index) => ({
          id: index + 1,
          url: `http://localhost:3000${photo.url}`,
          thumbnail: `http://localhost:3000${photo.url}`,
          title: photo.name.split('.')[0]
        }));

        setPhotos(transformedPhotos);
        setFilteredPhotos(transformedPhotos);
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError('Failed to load photos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg font-medium">{error}</p>
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