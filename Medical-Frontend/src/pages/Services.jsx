import React from "react";
import Servicecard from "../Components/Cards/Service.card";
import Chatbot from "../assets/chatbot.webp";
import Appt from "../assets/appointment.webp";
import Diabetes from "../assets/diabetes.webp";
import Heart from "../assets/hdpred.webp";
import Stroke from "../assets/stroke.webp";
import Contact from "../assets/contact-us.webp";
import { useSelector } from "react-redux";

const Services = () => {
  const { user } = useSelector((state) => state.user);
  const isUserDoctor = user && user.isDoctor;

  return (
    <div className="flex flex-wrap mx-4">
      <Servicecard
        src={Chatbot}
        alt="Chatbot page"
        title="Chatbot"
        content="THis is a chatbot navigation page"
        button="Click here"
        route="/chatbot"
      />

      {user && user.isDoctor !== true ? (
        // Render the Appointments card if the user is not a doctor
        <Servicecard
          src={Appt}
          alt="Doctor Appointment Booking page"
          title="Doctor Appointment Booking"
          content="This is an Appointment Booking page "
          button="Click here"
          route="/approved-doctors"
        />
      ) : (
        // Render the my Appointment Booking card if the user is a doctor
        <Servicecard
          src={Appt}
          alt="Appointments page"
          title="Your Appointments"
          content="View and manage your appointments"
          button="Click here"
          route="/doctor/appointments"
        />
      )}

      <Servicecard
        src={Diabetes}
        alt="Diabetes prediction page"
        title="Diabetes prediction"
        content="Diabetes prediction page"
        button="Click here"
      />

      <Servicecard
        src={Heart}
        alt="Heart Disease prediction page"
        title="Heart prediction"
        content="Heart prediction page"
        button="Click here"
      />

      <Servicecard
        src={Stroke}
        alt="Stroke prediction page"
        title="Stroke Risk prediction"
        content="Stroke risk prediction page"
        button="Click here"
      />

      {!isUserDoctor && (
        // Render the Apply Doctor card if the user is not a doctor
        <Servicecard
          src={Contact}
          alt="Apply Doctor"
          title="Apply Doctor"
          content="Apply for Doctor"
          button="Click Here"
          route="/doc-register"
        />
      )}
    </div>
  );
};

export default Services;
