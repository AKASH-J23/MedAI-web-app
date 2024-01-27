import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import moment from "moment";

function DoctorAppointment() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get(
        "http://localhost:3000/api/doc/get-appointments-by-doctor-id",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "http://localhost:3000/api/doc/change-appointment-status",
        { appointmentId : record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        // toast.success(resposne.data.message);
        console.log(resposne.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getAppointmentsData();
  }, []);

  
  return (
    <div>
      <h1 className="text-2xl flex justify-center font-bold my-4">Appointments</h1>
      {/* <hr className="border-gray-500 rounded border-2 mb-4" /> */}

      <div className="overflow-x-auto p-2">
        <table className="min-w-full bg-black border border-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-black">Id</th>
              <th className="py-2 px-4 border border-black">Patient</th>
              <th className="py-2 px-4 border border-black">Email</th>
              <th className="py-2 px-4 border border-black">Date & Time</th>
              <th className="py-2 px-4 border border-black">Status</th>
              <th className="py-2 px-4 border border-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((record) => (
              <tr key={record._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 text-center border border-black">{record._id}</td>
                <td className="py-2 px-4 text-center border border-black">{record.userInfo.fname}</td>
                <td className="py-2 px-4 text-center border border-black">{record.doctorInfo.email}</td>
                <td className="py-2 px-4 text-center border border-black">
                  {moment(record.date).format("DD-MM-YYYY")}{" "}
                  {moment(record.time).format("HH:mm")}
                </td>
                <td className="py-2 px-4 text-center border border-black">{record.status}</td>
                <td className="py-2 px-2 text-center border border-black">
                  {record.status === "pending" && (
                    <div className="flex justify-evenly">
                      <button
                        className="bg-gray-200 px-1 text-green rounded-lg hover:bg-green-400 border border-black"
                        onClick={() => changeAppointmentStatus(record, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-gray-200 px-1 text-green rounded-lg hover:bg-red-500 border border-black"
                        onClick={() => changeAppointmentStatus(record, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorAppointment;