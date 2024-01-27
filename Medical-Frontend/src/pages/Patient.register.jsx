import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading} from "../redux/alertsSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Patientregister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confpassword: "",
    gender: "",
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confpassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);
    const { confpassword, ...dataWithoutConfPassword } = formData;

    try {
      dispatch(showLoading())
      const response = await axios.post(
        "http://localhost:3000/api/user/pat-register",
        dataWithoutConfPassword
      );
      dispatch(hideLoading())
      if (response.data.success === true) {
        // console.log(response.data.message);
        toast.success("User Regostration Successfull")
        // toast.success(response.data.message)
        navigate("/login");
      } else {
        // console.log(response.data.message);
        toast.error(response.data.message)
      }
    } catch (err) {
      dispatch(hideLoading())
      // console.log("Something Went Wrong");
      toast.error("Something Went Wrong")
    }
  };

  return (
    <div className="w-full mx-auto my-8 max-w-md">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-3 bg-white">
          <label
            className="block bg-white text-gray-700 text-sm font-bold mb-2"
            htmlFor="fname"
          >
            First Name
          </label>
          <input
            className="border rounded w-full py-2 px-3 mb-2 text-gray-700"
            name="fname"
            onChange={handleInputChange}
            value={formData.fname}
            id="fname"
            type="text"
            placeholder="First Name"
            required
          />
          <label
            className="block bg-white text-gray-700 text-sm font-bold mb-2"
            htmlFor="lname"
          >
            Last Name
          </label>
          <input
            className="border rounded w-full py-2 px-3 mb-2 text-gray-700"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
            id="lname"
            type="text"
            placeholder="Last Name"
            required
          />
          <label
            className="block bg-white text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border rounded w-full mb-3 py-2 px-3 text-gray-700"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            placeholder="Email"
            required
          />
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
            type="password"
            placeholder="Enter Password"
            required
          />
          <label
            className="bg-white block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confpassword"
          >
            Confirm Password
          </label>
          <input
            className="border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3"
            id="confpassword"
            name="confpassword"
            value={formData.confpassword}
            onChange={handleInputChange}
            type="password"
            placeholder="Confirm Password"
            required
          />
          <div className="mb-3 flex gap-7 bg-white ">
            <label
              className="bg-white text-gray-700 text-sm items-center font-bold gap-3"
              htmlFor="male"
            >
              Male
            </label>
            <input
              className="ml-3 mb-2"
              id="male"
              name="gender"
              type="radio"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleInputChange}
            />
            <label
              className="bg-white text-gray-700 text-sm items-center font-bold gap-3"
              htmlFor="female"
            >
              Female
            </label>
            <input
              className="ml-3 mb-2"
              id="female"
              name="gender"
              type="radio"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleInputChange}
            />
          </div>
          {passwordMatchError && (
            <p className="bg-white text-red-500 text-xs italic">
              Passwords do not match.
            </p>
          )}
        </div>
        <div className="bg-white flex items-center justify-center">
          <button
            className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2024 Alpha Developers. All rights reserved.
      </p>
      <ToastContainer />
    </div>
  );
};

export default Patientregister;
