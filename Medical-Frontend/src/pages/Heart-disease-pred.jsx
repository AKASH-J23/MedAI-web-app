import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeartDiseaseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    chestPainType: "",
    restingBloodPressure: "",
    serumCholesterol: "",
    fastingBloodSugar: "",
    electrocardiographicResults: "",
    maxHeartRate: "",
    exerciseInducedAngina: "",
    stDepression: "",
    slope: "",
    numMajorVessels: "",
    thalassemia: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue =
      [
        "age",
        "restingBloodPressure",
        "serumCholesterol",
        "maxHeartRate",
      ].includes(name) || name === "stDepression"
        ? parseFloat(value)
        : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const structData = prepareDataForRequest(formData);
    console.log(structData);
    try {
      dispatch(showLoading());

      const response = await axios.post(
        "http://127.0.0.1:8000/heart-disease-prediction",
        {
          data: structData,
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
          toast.success("Prediction successful! No heart disease detected.");
        } else {
          toast.error("Prediction successful! Heart disease detected.");
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
          Heart Disease Prediction
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-6 pt-6 pb-6 mb-2"
        >
          <div className="bg-white grid grid-cols-3 gap-4 mb-4">
            {Object.keys(formData).map((key) => (
              <div key={key} className="col-span-1 bg-white">
                <label
                  className="bg-white block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={key}
                >
                  {getLabel(key)}
                </label>
                {[
                  "age",
                  "restingBloodPressure",
                  "serumCholesterol",
                  "maxHeartRate",
                  "stDepression",
                ].includes(key) ? (
                  <input
                    className="border rounded w-full py-2 px-3 mb-2 text-gray-700"
                    name={key}
                    type="number"
                    placeholder={`Enter ${getLabel(key)}`}
                    value={formData[key]}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <select
                    className="border rounded w-full py-2 px-3 mb-2 text-gray-700"
                    name={key}
                    onChange={handleInputChange}
                    value={formData[key]}
                    required
                  >
                    <option value="">Select</option>
                    {getOptions(key).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
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

export default HeartDiseaseForm;

function getLabel(attribute) {
  switch (attribute) {
    case "age":
      return "Age";
    case "gender":
      return "Gender";
    case "chestPainType":
      return "Chest Pain Type";
    case "restingBloodPressure":
      return "Resting Blood Pressure";
    case "serumCholesterol":
      return "Serum Cholesterol Level";
    case "fastingBloodSugar":
      return "Fasting Blood Sugar";
    case "electrocardiographicResults":
      return "Resting Electrocardiographic Results";
    case "maxHeartRate":
      return "Maximum Heart Rate Achieved";
    case "exerciseInducedAngina":
      return "Exercise Induced Angina";
    case "stDepression":
      return "ST Depression";
    case "slope":
      return "Slope of the Peak Exercise ST Segment";
    case "numMajorVessels":
      return "Number of Major Vessels Colored by Fluoroscopy";
    case "thalassemia":
      return "Thalassemia";
    default:
      return attribute;
  }
}

function getOptions(attribute) {
  switch (attribute) {
    case "gender":
      return ["Male", "Female"];
    case "chestPainType":
      return [
        "Typical Angina",
        "Atypical Angina",
        "Non-Anginal Pain",
        "Asymptomatic",
      ];
    case "fastingBloodSugar":
      return ["No", "Yes"];
    case "electrocardiographicResults":
      return [
        "Normal",
        "ST-T Wave Abnormality",
        "Probable or Definite Left Ventricular Hypertrophy",
      ];
    case "exerciseInducedAngina":
      return ["No", "Yes"];
    case "slope":
      return ["Upsloping", "Flat", "Downsloping"];
    case "thalassemia":
      return ["Normal", "Fixed Defect", "Reversible Defect"];
    case "numMajorVessels":
      return ["0", "1", "2", "3"];
    default:
      return [];
  }
}

function getNumericValue(attribute, value) {
  switch (attribute) {
    case "gender":
      return value === "Male" ? 1 : 0;
    case "chestPainType":
      return getOptions("chestPainType").indexOf(value);
    case "fastingBloodSugar":
    case "exerciseInducedAngina":
      return value === "Yes" ? 1 : 0;
    case "electrocardiographicResults":
      return getOptions("electrocardiographicResults").indexOf(value);
    case "slope":
      return getOptions("slope").indexOf(value);
    case "thalassemia":
      return getOptions("thalassemia").indexOf(value);
    case "numMajorVessels":
      return parseInt(value, 10);
    default:
      return value;
  }
}

function prepareDataForRequest(formData) {
  return Object.values(formData).map((value, index) => {
    const key = Object.keys(formData)[index];
    return getNumericValue(key, value);
  });
}
