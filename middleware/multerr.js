var multer= require('multer')
var path = require('path')



// function multerr (){
//     this.upload=multer({dest:'public/images', filename: function (req, file, cb) {
//         cb(null, Date.   now() + path.extname(file.originalname)) //Appending extension
//       }})


// }

var storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null,'public/images')
    }, 
    filename:  (req, file, cb)=> {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })
  
 var upload = multer({ storage: storage });

module.exports= upload