import React from "react";
import { useNavigate } from "react-router-dom";

function Doctorcard({ doctor }) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/book-appointment/${doctor._id}`);
  };

  const convertToAMPM = (time) => {
    const hours = parseInt(time.split(":")[0], 10);
    const minutes = parseInt(time.split(":")[1], 10);

    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div
      onClick={handleOnClick}
      className="mx-3 my-5 max-w-sm rounded overflow-hidden shadow-lg cursor-pointer"
    >
      <div className="bg-gray-100 px-6 py-4">
        <div className="bg-gray-100 font-bold text-center text-xl mb-2">
          {doctor.fname} {doctor.lname}
        </div>
        <hr className="border-black rounded" />
        <p className="text-black bg-gray-100 text-base my-2">
          <b className="bg-gray-100">Speciality :</b> {doctor.speciality}
        </p>
        <p className="text-black bg-gray-100 text-base my-2">
          <b className="bg-gray-100">Contact No : </b>
          {doctor.contact_no}
        </p>
        <p className="text-black bg-gray-100 text-base my-2">
          <b className="bg-gray-100">Email : </b>
          {doctor.email}
        </p>
        <p className="text-black bg-gray-100 text-base my-2">
          <b className="bg-gray-100">Consultation Fee : </b>
          {doctor.consultation_fee}
        </p>
        <p className="text-black bg-gray-100 text-base my-2">
          <b className="bg-gray-100">Timings: </b>
          {convertToAMPM(doctor.availability[0])} -{" "}
          {convertToAMPM(doctor.availability[1])}
        </p>
      </div>
    </div>
  );
}

export default Doctorcard;
