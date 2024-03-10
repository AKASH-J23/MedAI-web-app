import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorRegister = ({ initivalValues }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    speciality: "",
    consultation_fee: 0,
    availability: ["", ""],
    contact_no: 0,
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === "from" || name === "to") {
        const newAvailability = [...prevData.availability];
        newAvailability[name === "from" ? 0 : 1] = value;
        return {
          ...prevData,
          availability: newAvailability,
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/user/apply-doctor-account",
        {
          ...formData,
          userId: user._id,
          timings: [
            moment(formData.availability[0]).format("HH:mm"),
            moment(formData.availability[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success === true) {
        toast.success("Doctor account applied succesfully !");
        navigate("/login");
      } else {
        toast.error("Doctor request failed !");
      }
    } catch (err) {
      dispatch(showLoading());
      toast.error("Something Went Wrong");
    }

    console.log(formData);
  };

  return (
    <div>
      <ToastContainer className="bg-gray-100" />
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
              id="fname"
              type="text"
              placeholder="First Name"
              name="fname"
              onChange={handleInputChange}
              value={formData.fname}
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
              id="lname"
              name="lname"
              value={formData.lname}
              onChange={handleInputChange}
              type="text"
              placeholder="Last Name"
              required
            />
            <label
              className="block bg-white text-gray-700 text-sm font-bold mb-2"
              htmlFor="speciality"
            >
              Speciality
            </label>
            <input
              className="border rounded w-full py-2 px-3 mb-2 text-gray-700"
              name="speciality"
              value={formData.speciality}
              onChange={handleInputChange}
              id="speciality"
              type="text"
              placeholder="Speciality"
              required
            />
            <label
              className="block bg-white text-gray-700 text-sm font-bold mb-2"
              htmlFor="consultation_fee"
            >
              Consultation Fee
            </label>
            <input
              className="border rounded w-full py-2 px-3 mb-2 text-gray-700"
              name="consultation_fee"
              value={formData.consultation_fee}
              onChange={handleInputChange}
              id="consultation_fee"
              type="number"
              placeholder="Consultation fee in rupees"
              required
            />

            <div className="flex">
              <div className="bg-white w-1/2 pr-2">
                <label
                  className="block bg-white text-gray-700 text-sm font-bold mb-2"
                  htmlFor="from"
                >
                  From (24hrs Format)
                </label>
                <input
                  className="border rounded w-full py-2 px-3 mb-2 text-gray-700"
                  name="from"
                  value={formData.availability[0]}
                  onChange={handleInputChange}
                  id="from"
                  type="text"
                  placeholder="Ex. 9:00 "
                  required
                />
              </div>
              <div className="bg-white w-1/2 pl-2">
                <label
                  className="block bg-white text-gray-700 text-sm font-bold mb-2"
                  htmlFor="to"
                >
                  To (24hrs Format)
                </label>
                <input
                  className="border rounded w-full py-2 px-3 mb-2 text-gray-700"
                  name="to"
                  value={formData.availability[1]}
                  onChange={handleInputChange}
                  id="to"
                  type="text"
                  placeholder="Ex. 16:00 "
                  required
                />
              </div>
            </div>

            <label
              className="block bg-white text-gray-700 text-sm font-bold mb-2"
              htmlFor="contact_no"
            >
              Contact Number
            </label>
            <input
              className="border rounded w-full py-2 px-3 mb-2 text-gray-700"
              name="contact_no"
              value={formData.contact_no}
              onChange={handleInputChange}
              id="contact_no"
              type="tel"
              placeholder="+91 xxxxxxxxxx"
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
      </div>
    </div>
  );
};

export default DoctorRegister;
