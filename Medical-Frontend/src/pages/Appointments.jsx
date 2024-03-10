import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import moment from "moment";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get(
        "http://localhost:3000/api/user/get-appointments-by-user-id",
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

  const formatDateAndTime = (date, time) => {
    return `${moment(date).format("DD-MM-YYYY")} ${moment(time).format(
      "HH:mm"
    )}`;
  };

  useEffect(() => {
    getAppointmentsData();
  }, []);

  return (
    <div>
      <div className="text-xl font-bold flex justify-center my-2">
        Appointments
      </div>

      <div className="overflow-x-auto p-2">
        <table className="min-w-full bg-black border border-black ">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-black">Id</th>
              <th className="py-2 px-4 border border-black">Doctor</th>
              <th className="py-2 px-4 border border-black">Phone</th>
              <th className="py-2 px-4 border border-black">Date & Time</th>
              <th className="py-2 px-4 border border-black">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((record) => (
              <tr key={record._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border border-black">{record._id}</td>
                <td className="py-2 px-4 border border-black">{`${record.doctorInfo.fname} ${record.doctorInfo.lname}`}</td>
                <td className="py-2 px-4 border border-black">
                  {record.doctorInfo.contact_no}
                </td>
                <td className="py-2 px-4 border border-black">
                  {formatDateAndTime(record.date, record.time)}
                </td>
                <td className="py-2 px-4 border border-black">
                  {record.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;
