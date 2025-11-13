const multer =require("multer")
const storage = multer.memoryStorage()

const uploadFile=multer({storage}).single("audio")
module.exports=uploadFile