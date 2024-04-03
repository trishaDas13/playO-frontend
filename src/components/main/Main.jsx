import React, { useState, useEffect } from "react";
import "./main.scss";
import axios from "axios";
import Form from "../form/Form";

const Main = () => {
  const [data, setData] = useState([]);
  const [formShow, setFormShow] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [pageData, setPageData] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [order, setOrder] = useState(true);

  //todo: Fetch data from API
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://playo-backend-jwzz.onrender.com/api/v1/data?pageData=${pageData}&pageNum=${pageNum}`
      );
      setData(res.data.result);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  //todo: render on data change
  useEffect(() => {
    fetchData();
  }, [pageData, pageNum]);

  //todo: Open form for adding a new customer
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

  //todo: filter by name
  const searchHandeler = async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.trim() === "") {
      await fetchData();
    } else {
      const filteredData = data.filter(
        (item) =>
          item.cxName.toLowerCase().includes(searchTerm) ||
          item.productName.toLowerCase().includes(searchTerm)
      );
      setData(filteredData);
    }
  };

  //todo: Sort the items
  //todo: Sort the items
const toggleSort = (key) => {
  let sortedData = [...data].sort((a, b) => {
    if (order) {
      // Sort in ascending order
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    } else {
      // Sort in descending order
      if (a[key] > b[key]) return -1;
      if (a[key] < b[key]) return 1;
      return 0;
    }
  });
  setOrder(!order);
  setData(sortedData);
};


  //todo: Render
  return (
    <>
      <header>
        <input
          type="text"
          placeholder="Search by Name and Product"
          onChange={searchHandeler}
        />
        <img src="/me.jpg" alt="profile photo" height={"50px"} width={"50px"} />
      </header>
      <main>
        <div className="above">
          <div className="pagination">
            <span>Show</span>
            <select
              name="page"
              id="page"
              value={pageData}
              onChange={(e) => {
                setPageData(e.target.value);
                setPageNum(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="20">50</option>
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
        {data.length === 0 ? (
          <p className="noData">No More Data Available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>
                  Product{" "}
                  <i className="fa-solid fa-sort" onClick={() => toggleSort("productName")}></i>
                </th>
                <th>
                  {" "}
                  Customer{" "}
                  <i className="fa-solid fa-sort" onClick={() => toggleSort("cxName")}></i>
                </th>
                <th>Email ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment Mode</th>
                <th>
                  Status
                  <i className="fa-solid fa-sort" onClick={() => toggleSort("status")}></i>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <p className="noData">Your data is loading, please wait !!</p>
              ) : (
                data.map((item, i) => {
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
                          onClick={() => deleteItem(item._id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}

        <div className="paginaton">
          <button
            title="Previous"
            onClick={() => setPageNum((prev) => prev - 1)}
            disabled={pageNum === 1}
          >
            <i class="fa-solid fa-caret-left"></i>
          </button>
          <p>{pageNum}</p>
          <button
            title="Next"
            onClick={() => {
              if (data.length === 0) {
                return alert("No more Data available");
              }
              setPageNum((prev) => prev + 1);
            }}
          >
            <i className="fa-solid fa-caret-right"></i>
          </button>
        </div>
      </main>
    </>
  );
};

export default Main;
