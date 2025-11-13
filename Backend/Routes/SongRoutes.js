const express=require("express");
const audio=require("../Middlewares/Audio.multer")
const isAuth = require("../Middlewares/isAuth");
const uploadFile = require("../Middlewares/multer");
const {createAlbum,getAllAlbums,addSong,addThumbnail,getAllSongs,getAllSongsByAlbum,deleteSong ,getSingleSong} = require("../Controllers/songControllers");
const router= express.Router();

////////////////songs Routes////////////////////


router.post("/album/new",isAuth,uploadFile,createAlbum)
router.get("/album/all",isAuth,getAllAlbums)
router.post("/album/add",isAuth,audio,addSong)
router.post("/:id", isAuth, uploadFile,addThumbnail);
router.get("/single/:id", isAuth, getSingleSong);
router.delete("/:id", isAuth, deleteSong);
router.get("/all", isAuth, getAllSongs);
router.get("/album/:id", isAuth, getAllSongsByAlbum);

module.exports=router;