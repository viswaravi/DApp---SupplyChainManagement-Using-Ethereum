var express=require('express');
var mongoose=require('mongoose');

var User = require('../Schemas/user.schema');

var router = express.Router();

mongoose.connect('mongodb://localhost:27017/fchain', { useNewUrlParser: true }).then(()=>{
  console.log('Connected');
}).catch(()=>{
  console.log('Error Connecting to DB');
});

router.post('/signUp',function(req,res,next) {   
    
    var user=new User({
        _id: new mongoose.Types.ObjectId(),
        'password':req.body.password,
        'name' : req.body.name,
        'username':req.body.username,
        'email':req.body.email,
        'public_key':req.body.public_key
     });
     
     user.save(function(err,classes){
       if(err){
         return res.status(500).json({
           title :'An error occured while Signing Up',
           error:err
         });
        }
      res.status(201).json({
            msg:'User Created',
            obj:classes
      });      
      });
});


router.post('/signIn',function(req,res,next){   
  User.findOne({username:req.body.username},function(err,user) {
    if(err){
      return res.status(500).json({
          title:'An error occured',
          error:err
      });
    }
    if(!user){
      return res.status(500).json({
          title:'Login Failed',
          error:{ messages:'Invalid user'}
      });
    }

       if(user.password != req.body.password) {
        return res.status(401).json({
          title:'Login Failes',
          error:{ message: 'Invalid Password'}
        });
    }
    
   res.status(200).json({
    messages:'successfully logged in',
    obj:user
});
  });
  });

  
router.get('/getid/:username',function(req,res,next) {
  User.findOne({username:req.params.username},function(err,user) {
    if(err){
      return res.status(500).json({
          title:'An error occured',
          error:err
      });
    }

    if(!user){
      return res.status(500).json({
          title:'Login Failed',
          error:{ messages:'Invalid user'}
      });
    }    
   res.status(200).json({
    obj: user,
    messages:'successfully logged in',
});
});
});



  
router.get('/all',function(req,res,next) {
  User.find({},function(err,user) {
    if(err){
      return res.status(500).json({
          title:'An error occured',
          error:err
      });
    }

    if(!user){
      return res.status(500).json({
          title:'Login Failed',
          error:{ messages:'Invalid user'}
      });
    }    
   res.status(200).json({
    obj: user,
    messages:'successfully logged in',
});
});
});


module.exports = router;