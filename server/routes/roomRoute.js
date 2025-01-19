const express = require("express");
const router = express.Router();

const Room = require("../models/room");

router.post("/getroombyid", async (req, res) => {
  try {
    const roomid = req.body.roomid;
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/addroom", async (req, res) => {
  try {
    const newRoom = req.body;
    const room = new Room();
    room.name = newRoom.name;
    room.maxcount = newRoom.maxcount;
    room.phonenumber = newRoom.phonenumber;
    room.rentperday = newRoom.rentperday;
    room.type = newRoom.type;
    room.description = newRoom.description;
    room.currentbookings = [];
    console.log(newRoom.imageUrls);
    for(var i = 0; i < newRoom.imageUrls.length; i++){
      room.imageurls.push(newRoom.imageUrls[i]);
    }

    console.log(room); 
    const result = await room.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/removeroom", async (req, res)=>{
  try{
    await Room.deleteOne({_id: req.body.roomid});
    res.status(200).json({message: "Room removed"});
    console.log("Room removed");
  }catch(err){
    return res.status(400).json({message: err});
  }
})

router.post("/updateroom", async (req, res) => {
  try{
    const room = await Room.findOne({_id: req.body.roomid});
    room.name = req.body.name;
    room.maxcount = req.body.maxcount;
    room.phonenumber = req.body.phonenumber;
    room.rentperday = req.body.rentperday;
    room.type = req.body.type;
    room.description = req.body.description;
    room.imageurls = [];

    var images = req.body.imageurls;
    if (images && images.length > 0) {
      for(var i = 0; i < images.length; i++){
        console.log("Image: "+images[i]);
        room.imageurls.push(images[i]);
      }
    }

    console.log(room);
    const result = await room.save();
    console.log("Room updated");
    res.send(result);
  }catch(err){
    console.log(err);
    return res.status(400).json({message: err});
  }
})

module.exports = router;
