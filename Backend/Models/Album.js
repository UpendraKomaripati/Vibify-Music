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
    thumbnail: {
      type: String,
      required:true
    },
   
  },
  {
    timestamps: true,
  }
);
 const Album = mongoose.model("Album", schema);
 
 module.exports = Album ;