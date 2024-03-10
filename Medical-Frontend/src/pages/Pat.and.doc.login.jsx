import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/user/pat-login",
        formData
      );
      dispatch(hideLoading());
      if (response.data.success) {
        localStorage.setItem("token", response.data.data);
        navigate("/");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something Went Wrong !");
    }
  };
  return (
    <div className="w-full mx-auto my-24 max-w-xs">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4 bg-white">
          <label
            className="block bg-white text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3 bg-white">
          <label
            className="bg-white block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            type="password"
            placeholder="******************"
          />
          <p className="bg-white text-red-500 text-xs italic">
            *Enter your password.
          </p>
        </div>
        <div className="bg-white flex items-center justify-center">
          <button
            className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
            type="submit"
          >
            Sign In
          </button>
        </div>
        <div className="bg-white mt-2 flex items-center justify-center">
          <Link
            to="/patient-register"
            className="bg-white text-green-700 hover:text-black font-sm"
          >
            New user ?
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2024 Alpha Developers. All rights reserved.
      </p>
      <ToastContainer className="bg-gray-100" />
    </div>
  );
};

export default Login;
