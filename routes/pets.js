const express = require("express");
const formidable = require("express-formidable");

const {
    postPets, 
    uploadImage, 
    removeImage,
    uploadVideo,
    removeVideo, 
    getPets
} = require("../controlers/pets");
const router = express.Router();

router.post('/pets', postPets);
router.post('/pets/upload-image', uploadImage);
router.post('/pets/remove-image', removeImage);
router.post('/pets/upload-video',formidable({ maxFileSize: 500 * 1024 * 1024 }), uploadVideo);
router.post('/pets/remove-video', removeVideo);
router.get('/pets', getPets);

module.exports = router;

