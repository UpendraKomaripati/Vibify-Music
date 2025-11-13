const TryCatch = require("../Utils/TryCatch");
const getDataurl = require("../Utils/urlgenerator");
const cloudinary = require("cloudinary")
const song = require("../Models/Songs")
const Album = require("../Models/Album")


const createAlbum = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "you are not admin"
    });

  const { title, description } = req.body


  const file = req.file
  const filterUrl = getDataurl(file)

  const cloud = await cloudinary.v2.uploader.upload(filterUrl.content)
  console.log(cloud)
  await Album.create({
    title,
    description,
    thumbnail: cloud.secure_url

  })

  res.json({
    message: "Album Added"
  })
})
////////////////// get song//////////////////////

const getAllAlbums = TryCatch(async (req, res) => {
  const albums = await Album.find();

  res.json(albums);
});

/////////////////Add Song/////////////////////////

const addSong = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "You are not admin" });
  }



  const { title, description, singer, album: albumId } = req?.body;

  if (!title) return res.status(400).json({ message: "Title is required" });
  if (!req?.file) return res.status(400).json({ message: "Audio file is required" });

  // Optional: ensure it's an audio file
  if (!req?.file?.mimetype?.startsWith("audio/")) {
    return res.status(400).json({ message: "Only audio files are allowed" });
  }

  // If you link songs to albums, verify album exists
  if (albumId) {
    const found = await Album.findById(albumId);
    if (!found) return res.status(404).json({ message: "Album not found" });
  }

  const fileUrl = getDataurl(req.file);

  // IMPORTANT: audio => use resource_type: "video" (or "auto")
  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
    resource_type: "auto",     // <-- fix
    folder: "songs",
    // optional:
    // public_id: `${slugify(title)}-${Date.now()}`
  });

  const created = await song.create({
    title,
    description,
    singer,

    audio: cloud.secure_url,

    album: albumId || undefined,
  });

  return res.json({ message: "Song Added", song: created });
});




const addThumbnail = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not admin",
    });

  const file = req.file;

  const fileUrl = getDataurl(file);

  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  await song.findByIdAndUpdate(
    req.params.id,
    {
      thumbnail: {
        id: cloud.public_id,
        url: cloud.secure_url,
      },
    },
    { new: true }
  );

  res.json({
    message: "thumbnail Added",
  });
});

const getAllSongs = TryCatch(async (req, res) => {
  const songs = await song.find();

  res.json(songs);
});

const getAllSongsByAlbum = TryCatch(async (req, res) => {
  const album = await Album.findById(req.params.id);
  const songs = await song.find({ album: req.params.id });

  res.json({ album, songs });
});

const deleteSong = TryCatch(async (req, res) => {
  const songs = await song.findById(req.params.id);

  await song.deleteOne();

  res.json({ message: "Song Deleted" });
});

const getSingleSong = TryCatch(async (req, res) => {
  const song = await song.findById(req.params.id);

  res.json(song);
});

module.exports = { createAlbum, getAllAlbums, addSong, addThumbnail, getAllSongs, getAllSongsByAlbum, deleteSong, getSingleSong };