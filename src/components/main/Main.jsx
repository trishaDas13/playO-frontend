import React, { useState, useEffect } from "react";
import "./main.scss";
import axios from "axios";
import Form from "../form/Form";

const Main = () => {
  const [data, setData] = useState([]);
  const [formShow, setFormShow] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://playo-backend-jwzz.onrender.com/api/v1/data?pageData=10&pageNum=1`
      );
      setData(res.data.result);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open form for adding a new customer
  const openFormForAdd = () => {
    setEditItem(null);
    setFormShow(true);
  };

  //todo: Open form for editing an existing customer
  const openFormForEdit = (item) => {
    setEditItem(item);
    setFormShow(true);
  };

  //todo: Delete item by ID
  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `https://playo-backend-jwzz.onrender.com/api/v1/data/${id}`
      );
      // Remove the deleted item from the state
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Render
  return (
    <>
      <header>
        <input type="text" placeholder="Search by name" />
        <img src="/me.jpg" alt="profile photo" height={"50px"} width={"50px"} />
      </header>
      <main>
        <div className="above">
          <div className="pagination">
            <span>Show</span>
            <select name="" id="">
              <option value="5">5</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <span>entries</span>
          </div>
          <button onClick={openFormForAdd}> + Add Customer</button>
        </div>
        {formShow && (
          <Form
            setFormShow={setFormShow}
            editItem={editItem}
            fetchData={fetchData}
          />
        )}
        <table>
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Email ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment Mode</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item._id}</td>
                  <td>{item.productName}</td>
                  <td>{item.cxName}</td>
                  <td>{item.cxEmail}</td>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>
                  <td>{item.paymentMode}</td>
                  <td>{item.status}</td>
                  <td
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="fa-regular fa-pen-to-square"
                      style={{ cursor: "pointer" }}
                      onClick={() => openFormForEdit(item)}
                    ></i>
                    <i
                      className="fa-solid fa-trash-can"
                      style={{ opacity: "0.3", cursor: "pointer" }}
                      onClick={() => deleteItem(item._id)} // Call deleteItem function with item ID
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Main;
