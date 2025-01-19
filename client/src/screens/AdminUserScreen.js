import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space } from "antd";

import Loader from "../components/Loader";
import Error from "../components/Error";

function AdminUserScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns = [
    { title: "userid", dataIndex: "_id", key: "_id" },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    { title: "email", dataIndex: "email", key: "email" },

    {
      title: "isAdmin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => (
        <>
          {isAdmin === true ? (
            <Tag color="green">YES</Tag>
          ) : (
            <Tag color="red">NO</Tag>
          )}
        </>
      ),
    },
    {
      title:"Remove",
      dataIndex:"rem",
      key:"rem"
    }
  ];

  async function removeUser(userid) {
    try {
      const data = (await axios.post("https://backend.deepakdenre.live/api/users/deleteuser" || "http://backend.deepakdenre.live/api/users/deleteuser", { "userid":userid })).data;
      alert("User removed successfully");
      fetchMyData();
    } catch (error) {
      console.log(error);
      alert("Error while removing user");
    }
  }

  async function fetchMyData() {
    setUsers([]);
    setError("");
    setLoading(true);
    try {
      const data = (await axios.post("https://backend.deepakdenre.live/api/users/getallusers" || "http://backend.deepakdenre.live/api/users/getallusers")).data;
      setUsers(data);
      console.log(data);
      const updatedData = data.map(user => ({
        ...user,
        rem: <button key={user._id} onClick={() => removeUser(user._id)}>Remove</button>
      }));
      setUsers(updatedData);
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
    <div className="row">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="col-md-12">
          <Table columns={columns} dataSource={users} />
        </div>
      )}
    </div>
  );
}

export default AdminUserScreen;
