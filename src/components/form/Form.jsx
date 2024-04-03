import React, { useState, useEffect } from "react";
import "./form.scss";
import axios from "axios";

const initialState = {
  productName: "",
  cxName: "",
  cxEmail: "",
  date: "",
  amount: "",
  paymentMode: "",
  status: "",
};

const Form = ({ setFormShow, editItem, fetchData }) => {
  const [formData, setFormData] = useState(initialState);

  //todo: Populate form fields with data of the item being edited
  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    } else {
      setFormData(initialState);
    }
  }, []);

  //todo: Handles input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Sending data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        // If editing, use PATCH method and send ID of the item being edited
        try {
          await axios.patch(
            `https://playo-backend-jwzz.onrender.com/api/v1/data`,
            formData
          );
          fetchData()
        } catch (err) {
          console.log(err.message);
        }
      } else {
        // If adding new, use POST method
        try {
          await axios.post(
            "https://playo-backend-jwzz.onrender.com/api/v1/data",
            formData
          );
          fetchData()
        } catch (err) {
          console.log(err.message);
        }
      }
      // Reset form data
      setFormData(initialState);
      // Close the form
      setFormShow(false);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  // Render
  return (
    <div className="form">
      <i className="fa-solid fa-xmark" onClick={() => setFormShow(false)}></i>
      <form onSubmit={handleSubmit}>
        <div className="product field">
          <label htmlFor="productName">Select Product:</label>
          <select
            name="productName"
            id="productName"
            value={formData.productName}
            onChange={handleChange}
          >
            <option value="" hidden>
              Choose Product
            </option>
            <option value="Hat">Hat</option>
            <option value="Laptop">Laptop</option>
            <option value="Phone">Phone</option>
            <option value="Bag">Bag</option>
            <option value="Headset">Headset</option>
            <option value="Mouse">Mouse</option>
            <option value="Clock">Clock</option>
            <option value="Tshirt">Tshirt</option>
            <option value="Monitor">Monitor</option>
            <option value="Keyboard">Keyboard</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="cxName">Customer Name</label>
          <input
            type="text"
            id="cxName"
            name="cxName"
            value={formData.cxName}
            onChange={handleChange}
            placeholder="Enter customer name"
          />
        </div>
        <div className="field">
          <label htmlFor="cxEmail">Customer Email Address</label>
          <input
            type="text"
            id="cxEmail"
            name="cxEmail"
            value={formData.cxEmail}
            onChange={handleChange}
            placeholder="Enter email ID"
          />
        </div>
        <div className="field">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
          />
        </div>
        <div className="product field">
          <label htmlFor="paymentMode">Payment Mode</label>
          <select
            name="paymentMode"
            id="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
          >
            <option value="" hidden>
              Choose Payment Mode...
            </option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="COD">COD</option>
            <option value="UPI">UPI</option>
            <option value="Credit/Debit card">Credit/Debit card</option>
          </select>
        </div>
        <div className="product field">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="" hidden>
              Choose Status
            </option>
            <option value="Placed">Placed</option>
            <option value="Process">Process</option>
            <option value="Delivery">Delivery</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <button type="submit">{editItem ? "Submit" : "+ ADD"}</button>
      </form>
    </div>
  );
};

export default Form;
