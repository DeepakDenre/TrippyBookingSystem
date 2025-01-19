import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";

import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";

function AdminRoomScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns = [
    {
      title: "roomId",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "maxcount",
      dataIndex: "maxcount",
      key: "maxcount"
    },
    {
      title: "phonenumber",
      dataIndex: "phonenumber",
      key: "phonenumber"
    },
    {
      title: "rentperday",
      dataIndex: "rentperday",
      key: "rentperday"
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Action",
      dataIndex: "Ac",
      key: "AC"
    },
  ];

  async function removeRoom(id) {
    Swal.fire(
      {
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }
    ).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post("https://backend.deepakdenre.live/api/rooms/removeroom" || "http://backend.deepakdenre.live/api/rooms/removeroom", { roomid: id });
          fetchMyData();
        } catch (error) {
          console.log(error);
          alert("Room Deletion Failed");
        }
      }
    }
    );
  }

  async function fetchMyData() {
    setError("");
    setLoading(true);
    try {
      setRooms([]);
      const data = (await axios.post("https://backend.deepakdenre.live/api/rooms/getallrooms" || "http://backend.deepakdenre.live/api/rooms/getallrooms")).data;
      data.forEach(room => {
        Object.assign(room, { Ac: <button key={room._id} onClick={() => removeRoom(room._id)}>Remove</button> });
      });
      setRooms(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  }
  async function editRoom(id) {
    const roomToEdit = rooms.find(room => room._id === id);
    if (roomToEdit) {
      const newName = prompt("Enter new name:", roomToEdit.name);
      const newMaxCount = prompt("Enter new max count:", roomToEdit.maxcount);
      const newPhoneNumber = prompt("Enter new phone number:", roomToEdit.phonenumber);
      const newRentPerDay = prompt("Enter new rent per day:", roomToEdit.rentperday);
      const newType = prompt("Enter new type:", roomToEdit.type);
      const numberOfImages = prompt("Enter number of images to edit:");
      var images = [];
      console.log(numberOfImages);
      if (numberOfImages > 0 && numberOfImages <= 3) {
        for (let i = 0; i < numberOfImages; i++) {
          images.push(prompt("Enter image " + (i + 1) + " url:", roomToEdit.imageurls[i]));
        }
      } else {
        alert("Number of images should be between 1 and 3");
      }

      console.log(images);

      if (newName && newMaxCount && newPhoneNumber && newRentPerDay && newType) {
        const updatedRoom = {
          ...roomToEdit,
          roomid: roomToEdit._id,
          name: newName,
          maxcount: newMaxCount,
          phonenumber: newPhoneNumber,
          rentperday: newRentPerDay,
          type: newType,
          imageurls: images,
        };

        try {
          console.log(updatedRoom);
          await axios.post("https://backend.deepakdenre.live/api/rooms/updateroom" || "http://backend.deepakdenre.live/api/rooms/updateroom", updatedRoom);
          alert("Room Updated Successfully");
          fetchMyData();
        } catch (error) {
          console.log(error);
          alert("Room Update Failed");
        }
      } else {
        alert("All fields are required!");
      }
    } else {
      alert("Room not found!");
    }
  }

  columns.push({
    title: "Edit",
    dataIndex: "edit",
    key: "edit",
    render: (text, record) => (
      <button onClick={() => editRoom(record._id)}>Edit</button>
    ),
  });


  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <div className="row">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <>
          <div className="col md-12">
            <button className="btn btn-success" onClick={fetchMyData}>
              Refresh
            </button>
          </div>
          <div className="col-md-12">
            <Table columns={columns} dataSource={rooms} />
          </div>
        </>
      )}
    </div>
  );
}

export default AdminRoomScreen;
