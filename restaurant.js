const multer = require("multer")
const express = require("express");
const router =express.Router();
const resModel=require("./models/resModel");
const MenuModel=require("./models/menumodel")

const storageEngine = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, `D:/upload`) },
    filename: (req, file, cb) => { cb(null, file.originalname) }, });

    const audiobookFilter = (req, file, cb) => {
        cb(null, true) 
        }
  uploadHandler = multer({ storage: storageEngine, fileFilter: audiobookFilter });


  router.post("/createrestaurant",uploadHandler.fields([
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
    resModel.findOne({email:email}).then((currentUser) => {
            if(currentUser){
                // already have this user
               // console.log('user is: ', currentUser);
              res.status(400).send("Email Already Exists");
            } else {
                // if not, create user in our db
                new resModel({
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
                    websiteLink:req.body.websiteLink,
                    phone:req.body.phone

                  
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                   res.send(newUser);
                });
            }
        });
    
    }
    );
    router.post("/signin",async(req,res)=>{
        const {email,password}=req.body;
          resModel.findOne({email:email, password:password}).then((currentUser) => {
              res.send(currentUser);
      
          }).catch(err=>res.send(err));
      
      
      });
router.get("/details",async(req,res)=>{
    let email=req.query.email;
    resModel.findOne({email}).then(response=>{
      resModel.find({}).then(respo=>{
        res.status(200).send({response,menuLength:respo.length});
      })
      
    }).catch(err=>{
        res.status(404).send("No hotel found with such email");
    })
});

router.put("/update",async(req,res)=>{
    const email1=req.body.email2;
    console.log(req.body);
    const {address,phone,email,name}=req.body;
    resModel.updateOne({_id:req.body._id},{
        address,email,phone,name
    }).then(response=>{
      res.status(200).send(response);
    }).catch(err=>res.status(400).send(err))
});

router.post("/additem",uploadHandler.fields([
    { name: "document", maxCount: 1 },
    { name: "id", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "video", maxCount: 1 },]),(req,res)=>{
        const { itemname,
            itemprice,email,desc}=req.body;
  
    const images=req.files?.images[0]?.originalname;
     
        console.log(req.files);
            
                // if not, create user in our db
                new MenuModel({
                   itemname,
                   itemprice,
                   images,
                   email,
                   desc,
                   available:true,
                   menu:req.body.menu
                  
                }).save().then((newRoom) => {
                    
                   res.send(newRoom);
                });
                }    );

   router.get("/allmenus",async(req,res)=>{
    MenuModel.find({email:req.query.email,available:true}).then(response=>{
        res.send(response);
    }).catch(err=>{
        res.status(400).send(err);
    })
   })
   router.put("/itemupdate",uploadHandler.fields([
    { name: "images", maxCount: 10 },]),async(req,res)=>{
    //console.log(req.body);
    let images;
    console.log(req.files);
    if(req.files.images)
     images=req.files?.images[0]?.originalname;
    const {  itemname,desc,itemprice}=req.body;
    MenuModel.updateOne({_id:req.body.id},{
        itemname,desc,itemprice,images
    }).then(response=>{
      res.status(200).send(response);
    }).catch(err=>res.status(400).send(err))
});
  
router.get("/allhotels",async(req,res)=>{
    hotelModel.find().then(hotels=>{
        res.send(hotels);
    }).catch(err=>{
        res.status(400).send(err);
    })
})




module.exports=router;


