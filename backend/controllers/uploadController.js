// @desc    Upload single image
// @route   POST /api/upload
// @access  Public / Admin
const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('Please select an image file to upload.');
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully!',
      url: fileUrl,
      relativePath: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage,
};
