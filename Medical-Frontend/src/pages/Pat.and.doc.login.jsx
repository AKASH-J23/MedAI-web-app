import React, { useState, useRef } from "react";
// import Webcam from 'react-webcam/'
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
        // console.log(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
        toast.success(response.data.message);
      } else {
        // console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log(error);
      toast.error("Something Went Wrong !");
    }
  };

  // const webcamRef = useRef(null);
  // const [capturedImage, setCapturedImage] = useState(null);
  // const [verificationStatus, setVerificationStatus] = useState(null);

  // const navigate = useNavigate();

  // const capture = async () => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setCapturedImage(imageSrc);

  //   // Turn off the webcam by setting capturedImage to null
  //   webcamRef.current = null;

  //   // Display a message while the API call is in progress
  //   setVerificationStatus('Verifying...');

  //   try {
  //     // Replace 'http://localhost:4000' with your Flask API endpoint
  //     const response = await axios.post('http://localhost:4000/verify', { image: imageSrc });
  //     console.log(response.data)
  //     setVerificationStatus(response.data['status']);
  //     redirect_(response.data['status'])
  //   } catch (error) {
  //     console.error('Error verifying image:', error);
  //     setVerificationStatus('Verification failed.');
  //   }
  // };

  // const redirect_ = async (data)=> {
  //   try{
  //     const response = await axios.get('http://localhost:4000/fetchdata/address/'+data);
  //     console.log(response.data)
  //     if(response.data['type']==='exist'){
  //       navigate('/chatbot/'+data)
  //     }else{
  //       navigate('/register/'+data)
  //     }
  //   } catch(err){
  //     console.log(err)
  //   }
  // }
  // return (
  //   <div className='main'>
  //     <div className='container'>
  //       <div className='webcam'>
  //       <div>
  //         <p>Connect through Face Authentication📸🟩</p>
  //     </div>
  //     {capturedImage ? (
  //       <div className="image-preview">
  //         <img src={capturedImage} alt="Captured" />
  //       </div>
  //     ) : (
  //       <>
  //         <Webcam
  //           audio={false}
  //           ref={webcamRef}
  //           screenshotFormat="image/jpeg"
  //           mirrored={true}
  //           className="webcam"
  //         />
  //         <button onClick={capture} className="capture-button">
  //           Capture
  //         </button>
  //       </>
  //     )}
  //     {verificationStatus && (
  //       <div className="verification-status">{verificationStatus}</div>
  //     )}
  //       </div>
  //     </div>
  //   </div>
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

        {/* <div className="mb-3 flex gap-7 bg-white ">
          <label
            className="bg-white text-gray-700 text-sm items-center font-bold gap-3"
            htmlFor="patient"
          >
            Patient
          </label>
          <input
            className="ml-3 mb-2"
            id="patient"
            name="role"
            value="patient"
            checked={formData.role === "patient"}
            onChange={handleInputChange}
            type="radio"
          />
          <label
            className="bg-white text-gray-700 text-sm items-center font-bold gap-3"
            htmlFor="Patient"
          >
            Doctor
          </label>
          <input
            className="ml-3 mb-2"
            id="doctor"
            name="role"
            value="doctor"
            checked={formData.role === "doctor"}
            onChange={handleInputChange}
            type="radio"
          />
        </div> */}

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
      <ToastContainer />
    </div>
  );
};

export default Login;
