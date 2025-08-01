const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();
const { sendResponse } = require('../utils/response');

// Get all photos from the specified folder
router.get('/', async (req, res) => {
  try {
    const photoFolder = process.env.PHOTO_FOLDER_PATH;
    if (!photoFolder) {
      return sendResponse(res, 500, null, 'Photo folder path not configured');
    }

    // Read files from the photo folder
    const files = await fs.readdir(photoFolder);
    
    // Filter image files
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

    return sendResponse(res, 200, { photos: photoUrls });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return sendResponse(res, 500, null, 'Failed to fetch photos');
  }
});

module.exports = router;