import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space } from "antd";

import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";

function AdminBookingScreen() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "_id",
      key: "_id",
    },
    { title: "roomid", dataIndex: "roomid", key: "roomid" },
    { title: "room", dataIndex: "room", key: "room" },
    { title: "fromdate", dataIndex: "fromdate", key: "fromdate" },
    { title: "todate", dataIndex: "todate", key: "todate" },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          {status === "booked" ? (
            <Tag color="green">BOOKED</Tag>
          ) : (
            <Tag color="red">CANCELLED</Tag>
          )}
        </>
      ),
    }, {
      title: "Action",
      key: "action",
      render: (booking) => (
        <>
          <Space size="middle">
            <button onClick={() => RemoveBooking(booking._id)} style={{ background: '#fcaf97', borderRadius: '3px', border: '1px solid black', color: 'black' }}>Remove</button>
          </Space>
          {booking.status === "booked" && (
            <>
              <span>   </span>
              <Space size="middle">
                <button onClick={() => CancelBooking(booking._id, booking.roomid)} style={{ background: '#fcaf97', borderRadius: '3px', border: '1px solid black', color: 'black' }}>Cancel</button>
              </Space>
            </>
          )}
        </>
      ),
    },
  ];

  async function CancelBooking(id, roomid) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post("https://backend.deepakdenre.live/api/bookings/cancelbooking" || "http://backend.deepakdenre.live/api/bookings/cancelbooking", { bookingid: id, roomid: roomid });
          Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
          fetchMyData();
        } catch (error) {
          console.log(error);
          Swal.fire("Failed!", "Something went wrong.", "error");
        }
      }
    });
  }

  async function RemoveBooking(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post("https://backend.deepakdenre.live/api/bookings/removebooking" || "http://backend.deepakdenre.live/api/bookings/removebooking", { bookingid: id });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          fetchMyData();
        } catch (error) {
          console.log(error);
          Swal.fire("Failed!", "Something went wrong.", "error");
        }
      }
    });
  }
  
  async function fetchMyData() {
    setBookings([]);
    setError("");
    setLoading(true);
    try {
      const data = (await axios.post("https://backend.deepakdenre.live/api/bookings/getallbookings" || "http://backend.deepakdenre.live/api/bookings/getallbookings")).data;
      setBookings(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyData();
  }, []);
  return (
    <>
      <div>
        <button
          onClick={() => fetchMyData()}
          style={{ background: 'black', borderRadius: '3px', border: '1px solid black', color: 'white', fontWeight: 'bold' }}
        >Refresh</button>
      </div>
      <div className="row">
        {loading ? (
          <Loader></Loader>
        ) : error.length > 0 ? (
          <Error msg={error}></Error>
        ) : (
          <div className="col-md-12">
            <Table columns={columns} dataSource={bookings} />
          </div>
        )}
      </div>
    </>
  );
}

export default AdminBookingScreen;
