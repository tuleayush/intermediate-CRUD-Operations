var express = require('express');
var router = express.Router();
const userCtrl= require('../controller/userCtrl')
const auth = require('../middleware/auth')
const upload=require('../middleware/multerr')
var cors = require('cors')


var whitelist = ['http://127.0.0.1:5500','http://127.0.0.1:5500']
   
var corsOptions = {
  origin: 'http://127.0.0.1:5500',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// router.use(cors(),(req,res,next)=>{

//     next()
// })

router.get('/register',auth,userCtrl.getAllUser)

router.post('/register',userCtrl.insertRegister)
router.post('/login',userCtrl.login)
router.get('/:id',cors(corsOptions),userCtrl.getId)
router.patch('/:id',userCtrl.updateUser)
router.delete('/:id',userCtrl.deleteUser)
// router.post('/accesToken',userCtrl.convert)
router.get('/logout',userCtrl.logedOut)
router.post('/profileupload',upload.single('profile_pic'),userCtrl.profileUpload)
router.post('/convert',userCtrl.xlsx)
router.post('/convertexl',userCtrl.convert)
// router.get("/getphotodata",userCtrl.getphotodata)














//  console.log(corsOptions.origin);
// router.get('/:id', cors(corsOptions), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
// })



module.exports = router;
