const multer = require("multer")
const express = require("express");
const router =express.Router();
const hotelModel=require("./models/hotelmodel");
const RoomModel=require("./models/roommodel")
const resModel=require("./models/resModel");

const storageEngine = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, `./upload`) },
    filename: (req, file, cb) => { cb(null, file.originalname) }, });

    const audiobookFilter = (req, file, cb) => {
        cb(null, true) 
        }
  uploadHandler = multer({ storage: storageEngine, fileFilter: audiobookFilter });


  router.post("/createhotel",uploadHandler.fields([
    { name: "document", maxCount: 1 },
    { name: "id", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "video", maxCount: 1 },]),(req,res)=>{
        const {  name,
            address,
            taxId,
            accountName,
            accountNumber,
            email,
            password,cancellationPolicy}=req.body;
    const document=req.files?.document[0]?.originalname;
    const images=req.files?.images[0]?.originalname;
    const idCard=req.files?.id[0]?.originalname;
    const video=req.files?.video[0]?.originalname;
        hotelModel.findOne({email:email}).then((currentUser) => {
            if(currentUser){
                // already have this user
               // console.log('user is: ', currentUser);
              res.status(400).send("Email Already Exists");
            } else {
                // if not, create user in our db
                new hotelModel({
                    name,
                    address,
                    taxId,
                    accountName,
                    accountNumber,
                    email,
                    password,
                    video,
                    document,
                    idCard,
                    cancellationPolicy,
                    images,
                    rooms:0,
                    orders:0,
                    reviews:0,
                    verified:0,
                    income:0,
                    rating:0,
                    desc:req.body.desc,
                    phone:req.body.phone
                  
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                   res.send(newUser);
                });
            }
        });
    
    }
    );
router.get("/details",async(req,res)=>{
    let email=req.query.email;
    hotelModel.findOne({email}).then(response=>{
        res.status(200).send(response);
    }).catch(err=>{
        res.status(404).send("No hotel found with such email");
    })
});

router.put("/update",async(req,res)=>{
    const email1=req.body.email2;
    console.log(req.body);
    const {address,phone,email,name}=req.body;
    hotelModel.updateOne({_id:req.body._id},{
        address,email,phone,name
    }).then(response=>{
      res.status(200).status(response);
    }).catch(err=>res.status(400).send(err))
});

router.post("/createroom",uploadHandler.fields([
    { name: "document", maxCount: 1 },
    { name: "id", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "video", maxCount: 1 },]),(req,res)=>{
        const {  roomname,roomprice,email,desc}=req.body;
  
    const images=req.files?.images[0]?.originalname;
  
        console.log(req.files);
            
                // if not, create user in our db
                new RoomModel({
                   roomname,
                   roomprice,
                   images,
                   email,
                   desc,
                   available:true
                  
                }).save().then((newRoom) => {
                    console.log('created new room: ', newRoom);
                   res.send(newRoom);
                });
                }    );

   router.get("/allrooms",async(req,res)=>{
    RoomModel.find({email:req.query.email,available:true}).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.status(400).send(err);
    })
   });
   router.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
      hotelModel.findOne({email:email, password:password}).then((currentUser) => {
          res.send(currentUser);
  
      }).catch(err=>res.send(err));
  
  
  });
   router.put("/roomupdate",uploadHandler.fields([
    { name: "images", maxCount: 10 },]),async(req,res)=>{
    //console.log(req.body);
    let images;
    console.log(req.files);
    if(req.files.images)
     images=req.files?.images[0]?.originalname;
    const {  roomname,roomdesc,roomprice,available}=req.body;
    RoomModel.updateOne({_id:req.body.id},{
       roomname,roomdesc,roomprice,images,available
    }).then(response=>{
      res.status(200).send(response);
    }).catch(err=>res.status(400).send(err))
});
  
router.get("/allhotels",async(req,res)=>{
    hotelModel.find().then(hotels=>{
        resModel.find().then(restaurants=>{
            res.send({hotels,restaurants});
        })
    }).catch(err=>{
        res.status(400).send(err);
    })
})




module.exports=router;


