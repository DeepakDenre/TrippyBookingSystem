const express = require("express");
const moment = require("moment");

const router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");

router.post("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingid });

    booking.status = "cancelled";
    await booking.save();
    const room = await Room.findOne({ _id: roomid });
    const bookings = room.currentbookings;
    const temp = bookings.filter((x) => x.bookingid.toString() !== bookingid);
    room.currentbookings = temp;
    await room.save();

    res.send("Your booking cancelled successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post(
  "/removebooking",
  async (req, res) => {
    try{
      await Booking.deleteOne({_id: req.body.bookingid});
      res.status(200).json({message: "Booking removed"});
    }catch(err){
      return res.status(400).json({message: err});
    }
  }
);

router.post("/getbookingbyuserid", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid: userid });

    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/bookroom", async (req, res) => {
  try {
    const { room, userid, fromdate, todate, totalAmount, totaldays } = req.body;

    // Check if the room is already booked for the given dates
    const existingBookings = await Booking.find({
      roomid: room._id,
      fromdate: { $lte: moment(todate).format("DD-MM-YYYY") },
      todate: { $gte: moment(fromdate).format("DD-MM-YYYY") },
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({ message: "Room is already booked for the selected dates" });
    }

    const newBooking = new Booking({
      roomName: room.name,
      roomid: room._id,
      userid: userid,
      transactionid: "someTransactionId",
      room: room,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      totalamount: totalAmount,
      totaldays: totaldays,
    });

    await newBooking.save();

    const roomTmp = await Room.findOne({ _id: room._id });

    Object.assign(roomTmp, {
      bookingid: newBooking._id,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      userid: userid,
      status: newBooking.status,
    });

    await roomTmp.save();
    res.send("Payment Successful, Your Room is booked");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
