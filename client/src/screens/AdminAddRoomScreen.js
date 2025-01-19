import React, { useState } from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, Select } from "antd";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
function AdminAddRoomScreen() {
  const { Option } = Select;

  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };
  const [imageUrls, setImageUrls] = useState([]);

  const handelFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    } else {
      try {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", process.env.REACT_APP_Cloudinary_Upload_Preset);
        data.append("cloud_name", process.env.REACT_APP_Cloudinary_Cloud_Name);
  
        // Make the request to Cloudinary
        const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
  
        // Access the URL from the response
        const url = res.data.url;
        setImageUrls((prevUrls) => [...prevUrls, url]);
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }
  };

  const onFinish = async (values) => {
    setError("");
    setLoading(true);
    try {
      values.imageUrls=[];
      for (let i = 0; i < imageUrls.length; i++) {
        values.imageUrls[i] = imageUrls[i];
      }
      await axios.post("https://backend.deepakdenre.live/api/rooms/addroom" || "http://backend.deepakdenre.live/api/rooms/addroom", values ).data;
      Swal.fire("Congratulations", "Your Room Added Successfully", "success");
    } catch (error) {
      console.log(error);
      setError(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }
    setLoading(false);
  };

  return (
    <div className="row">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="col-md-12">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="maxcount"
              label="maxcount"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber min={1} defaultChecked={1} />
            </Form.Item>
            <Form.Item
              name="phonenumber"
              label="phonenumber"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="rentperday"
              label="rentperday"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber min={1} defaultChecked={1} />
            </Form.Item>
            <Form.List name="imageUrls">
              {
                (fields, { add, remove }) =>{
                  return (
                    <div>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Form.Item
                          {...layout}
                          label="Image"
                          key={key}
                        >
                          <Form.Item
                            {...restField}
                            name={[name, 'url']}
                            fieldKey={[fieldKey, 'url']}
                            rules={[{ required: true, message: 'Missing Image URL' }]}
                          >
                            <input
                              type="file"
                              onChange={handelFileUpload}
                              className="image-upload"
                            />
                          </Form.Item>
                          <Button
                            type="primary"
                            onClick={() => remove(name)}
                          >
                            Remove
                          </Button>
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                        >
                          Add Image
                        </Button>
                      </Form.Item>
                    </div>
                  );
                }
              }
            </Form.List>
            <Form.Item
              name="type"
              label="type"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select a room type" allowClear>
                <Option value="delux">Delux</Option>
                <Option value="non-delux">Non-Delux</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="success" htmlType="submit">
                Add
              </Button>
              <Button type="danger" htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}

export default AdminAddRoomScreen;
