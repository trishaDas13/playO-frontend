import React, { useState, useEffect } from "react";
import "./main.scss";
import axios from "axios";

const Main = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://playo-backend-jwzz.onrender.com/api/v1/data?pageData=4&pageNum=1"
      );
      setData(res.data.result);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <span>entries</span>
          </div>
          <button> + Add Customer</button>
        </div>

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
                      class="fa-regular fa-pen-to-square"
                      style={{ cursor: "pointer" }}
                    ></i>
                    <i
                      class="fa-solid fa-trash-can"
                      style={{ opacity: "0.3", cursor: "pointer" }}
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
