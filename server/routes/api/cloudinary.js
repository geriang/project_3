const express = require('express');
const router = express.Router()
const cloudinary = require('cloudinary')


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

router.post('/delete-selection-image', (req,res)=>{
    
    const {publicId} = req.body

    // console.log("this public id", publicId)

    cloudinary.v2.uploader.destroy(publicId, (error, result) => {
        if (error){ 
            return res.status(500).send("Error deleting image")}
        return res.send("deleted");
})
})
  
  module.exports = router;