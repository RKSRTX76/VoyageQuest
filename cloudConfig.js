const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'VoyageQuest_cloud',
      allowedFormats: ["png","jpg","jpeg","mp4"],
    },
  });



  module.exports={
    cloudinary,
    storage,
  }