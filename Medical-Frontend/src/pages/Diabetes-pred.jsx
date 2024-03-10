import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DiabetesForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    polyuria: "",
    polydipsia: "",
    sudden_weight_loss: "",
    weakness: "",
    polyphagia: "",
    genital_thrush: "",
    visual_blurring: "",
    irritability: "",
    partial_paresis: "",
    alopecia: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = name === "age" ? parseInt(value, 10) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(showLoading());
      const genderValue = formData.gender.toLowerCase() === "male" ? 1 : 0;
      const orderedDataArray = [
        formData.age,
        genderValue,
        formData.polyuria.toLowerCase() === "yes" ? 1 : 0,
        formData.polydipsia.toLowerCase() === "yes" ? 1 : 0,
        formData.sudden_weight_loss.toLowerCase() === "yes" ? 1 : 0,
        formData.weakness.toLowerCase() === "yes" ? 1 : 0,
        formData.polyphagia.toLowerCase() === "yes" ? 1 : 0,
        formData.genital_thrush.toLowerCase() === "yes" ? 1 : 0,
        formData.visual_blurring.toLowerCase() === "yes" ? 1 : 0,
        formData.irritability.toLowerCase() === "yes" ? 1 : 0,
        formData.partial_paresis.toLowerCase() === "yes" ? 1 : 0,
        formData.alopecia.toLowerCase() === "yes" ? 1 : 0,
      ];

      const response = await axios.post(
        "http://127.0.0.1:8000/diabetes-prediction",
        {
          data: orderedDataArray,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (response.data.success === true) {
        const predictionResult = response.data.prediction;

        if (predictionResult === 0) {
          toast.success("Prediction successful! No diabetes detected.");
        } else {
          toast.error("Prediction successful! Diabetes detected.");
        }
      } else {
        console.log("Prediction failed:", response.data.message);
        toast.error("Prediction failed!");
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log("Error", err.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <ToastContainer className="bg-gray-100" />
      <div className="w-full mx-auto my-2 max-w-2xl">
        <div className="text-center my-2 text-xl text-gray-800 font-bold ">
          Diabetes Prediction
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-6 pt-6 pb-6 mb-2"
        >
          <div className="bg-white grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-1 bg-white">
              <label
                className="bg-white block text-gray-700 text-sm font-bold mb-2"
                htmlFor="age"
              >
                Age
              </label>
              <input
                className="border rounded w-full py-2 px-3 mb-2 text-gray-700"
                name="age"
                type="number"
                placeholder="Enter Age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-span-1 bg-white">
              <label
                className="bg-white block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                className="border rounded w-full py-2 px-3 mb-2 text-gray-700"
                name="gender"
                onChange={handleInputChange}
                value={formData.gender}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {Object.keys(formData)
              .filter((key) => key !== "age" && key !== "gender")
              .map((key) => (
                <div key={key} className="col-span-1 bg-white">
                  <label
                    className="bg-white block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={key}
                  >
                    {key}
                  </label>
                  <select
                    className="border rounded w-full py-2 px-3 mb-2 text-gray-700"
                    name={key}
                    onChange={handleInputChange}
                    value={formData[key]}
                    required
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              ))}
          </div>

          <div className="flex items-center justify-center bg-white">
            <button
              className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Predict
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

export default DiabetesForm;
