const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

// Get all photos from the specified folder
router.get('/', async (req, res) => {
  try {
    const photoFolder = process.env.PHOTO_FOLDER_PATH;
    if (!photoFolder) {
      return res.status(500).json({ error: 'Photo folder path not configured' });
    }

    // Read files from the photo folder
    const files = await fs.readdir(photoFolder);
    
    // Filter image files (you can add more extensions as needed)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const photos = files.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    // Create array of photo objects with URLs
    const photoUrls = photos.map(file => ({
      name: file,
      url: `/photos/${file}`,
      path: path.join(photoFolder, file)
    }));

    res.json({
      success: true,
      photos: photoUrls
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

module.exports = router;