import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { DatePicker, TimePicker } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const convertToAMPM = (time) => {
    const hours = parseInt(time.split(":")[0], 10);
    const minutes = parseInt(time.split(":")[1], 10);

    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/doc/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/user/check-booking-avilability",
        {
          doctorId: params.doctorId,
          date: date.format("DD-MM-YYYY"),
          time: time.format("HH:mm"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };
  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date.format("DD-MM-YYYY"),
          time: time.format("HH:mm"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <div>
      <ToastContainer className="bg-gray-100" />
      {doctor && (
        <div className="flex justify-center items-center mt-2">
          <div className="max-w-md p-4 bg-white shadow-lg rounded-md">
            <div>
              <img
                className="border"
                src="https://imgs.search.brave.com/OsNA2_iYd4j5ruvKVY1sUnOBMsjrta2niksG1pn_Orc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNC8x/Mi8xMC8yMS8wMS9k/b2N0b3ItNTYzNDI5/XzY0MC5qcGc"
                alt="Book Now"
              />
            </div>
            <div className="flex justify-center items-center bg-white my-2">
              <div className="">
                <h2 className="text-xl text-center bg-white font-bold">
                  Dr {doctor.fname} {doctor.lname}
                </h2>
                <p className="text-semibold text-center bg-white">
                  {doctor.speciality}
                </p>
              </div>
            </div>
            <p className="text-black bg-white">
              <span className="font-bold bg-white">Fee Per Visit :</span>{" "}
              {doctor.consultation_fee}
            </p>
            <p className="text-black bg-white">
              <span className="font-bold bg-white">Contact No :</span>{" "}
              {doctor.contact_no}
            </p>
            <p className="text-black bg-white">
              <span className="font-bold bg-white">Timing :</span>{" "}
              {convertToAMPM(doctor.availability[0])} -{" "}
              {convertToAMPM(doctor.availability[1])}
            </p>
            <div className="mt-2 flex gap-5 bg-white">
              <DatePicker
                format="DD-MM-YYYY"
                className=""
                onChange={(value) => {
                  setDate(value);
                  setIsAvailable(false);
                }}
              />
              <TimePicker
                format="HH:mm"
                className=""
                onChange={(value) => {
                  setIsAvailable(false);
                  setTime(value);
                }}
              />
            </div>
            {!isAvailable && (
              <button
                className="bg-green-700 text-white hover:bg-green-600 rounded-md w-full mt-2"
                onClick={checkAvailability}
              >
                Check Availability
              </button>
            )}

            {isAvailable && (
              <button
                className="bg-green-700 text-white hover:bg-green-600 rounded-md w-full mt-2"
                onClick={bookNow}
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookAppointment;
