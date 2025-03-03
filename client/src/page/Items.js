import React, { useEffect, useState } from "react";
import DLayout from "../components/DLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";

function Items() {
  const [itemsData, setItemsData] = useState([]);
  const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const dispatch = useDispatch();
  
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const deleteItem = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/items/delete-item", { itemId: record._id })
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("Item deleted successfully");
        getAllItems();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Something went wrong");
        console.log(error);
      });
  };

  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    const endpoint = editingItem === null ? "/api/items/add-item" : "/api/items/edit-item";
    const payload = editingItem === null ? values : { ...values, itemId: editingItem._id };

    axios
      .post(endpoint, payload)
      .then((response) => {
        dispatch({ type: "hideLoading" });
        if (editingItem === null) {
          message.success("Item added successfully");
        } else {
          message.success("Item edited successfully");
          setEditingItem(null);
        }
        setAddEditModalVisibilty(false);
        getAllItems();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Something went wrong");
        console.log("Error:", error.response ? error.response.data : error.message);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingItem(record);
              setAddEditModalVisibilty(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={() => deleteItem(record)} />
        </div>
      ),
    },
  ];

  return (
    <DLayout>
      <div className="d-flex justify-content-between">
        <h3>Items</h3>
        <Button type="primary" onClick={() => setAddEditModalVisibilty(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />

      {addEditModalVisibilty && (
        <Modal
          onCancel={() => {
            setEditingItem(null);
            setAddEditModalVisibilty(false);
          }}
          visible={addEditModalVisibilty}
          title={`${editingItem !== null ? 'Edit Item' : 'Add New Item'}`}
          footer={false}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="fruits">Fruits</Select.Option>
                <Select.Option value="vegetables">Vegetables</Select.Option>
                <Select.Option value="Snacks">Snacks</Select.Option>
                <Select.Option value="Beverages">Beverages</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button htmlType="submit" type="primary">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DLayout>
  );
}

export default Items;
