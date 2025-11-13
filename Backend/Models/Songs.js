const mongoose=require("mongoose")
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    singer: {
      type: String,
      required: true,
    },
    thumbnail: {
      id: String,
      url: String,
    },
    audio: {
      type:String
    },

    album: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

 const song = mongoose.model("song", schema);
 
 module.exports = song ;
