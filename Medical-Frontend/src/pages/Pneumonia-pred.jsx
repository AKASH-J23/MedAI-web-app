import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Pneumonia() {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      dispatch(showLoading());
      const response = await fetch(
        "http://127.0.0.1:8000/pneumonia-prediction",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.ok) {
        const result = await response.json();
        console.log(result);

        if (result.success === true) {
          const predictionResult = result.prediction;

          if (predictionResult === 1.0) {
            toast.error("Prediction successful! Pneumonia detected.");
          } else {
            toast.success("Prediction successful! No Pneumonia detected.");
          }
        } else {
          console.log("Prediction failed:", result.message);
          toast.error("Prediction failed!");
        }
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.error("Error:", err.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <ToastContainer className="bg-gray-100" />
      <div className="text-center my-2 text-xl text-gray-800 font-bold pt-4 ">
        Pneumonia Prediction
      </div>
      <div className="flex justify-center items-center mt-40">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <label
              htmlFor="file_input"
              className="text-center bg-white block mb-4 text-sm font-medium text-gray-900 dark:text-black"
            >
              Upload file
            </label>
            <input
              id="file_input"
              type="file"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              onChange={handleFileChange}
              required
            />
            <p
              className="bg-white mt-2 text-sm text-red-600"
              id="file_input_help"
            >
              *PNG, JPG.
            </p>
            <div className="flex items-center justify-center bg-white">
              <button
                className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Predict
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Pneumonia;
