import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import moment from "moment";

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "http://localhost:3000/api/admin/get-all-doctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/admin/change-doctor-account-status",
        {
          doctorId: record._id,
          userId: record.userId,
          status: status,
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
        getDoctorsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <div className="container mx-auto my-8 ">
      <h1 className="text-3xl font-semibold justify-center flex mb-4">
        Doctors List
      </h1>
      <hr className="my-4 " />

      <div className="overflow-x-auto px-2">
        <table className="min-w-full bg-black border border-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border-black border">Name</th>
              <th className="py-2 px-4 border-black border">Phone</th>
              <th className="py-2 px-4 border-black border">Created At</th>
              <th className="py-2 px-4 border-black border">Status</th>
              <th className="py-2 px-4 border-black border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((record) => (
              <tr key={record._id}>
                <td className="py-2 px-4 border border-black">
                  {record.fname} {record.lname}
                </td>
                <td className="py-2 px-4 border border-black">
                  {record.contact_no}
                </td>
                <td className="py-2 px-4 border border-black">
                  {moment(record.createdAt).format("DD-MM-YYYY")}
                </td>
                <td className="py-2 px-4 border border-black">
                  {record.status}
                </td>
                <td className="py-2 px-4 border border-black">
                  {record.status === "pending" && (
                    <button
                      className="text-blue-500 underline"
                      onClick={() => changeDoctorStatus(record, "approved")}
                    >
                      Approve
                    </button>
                  )}
                  {record.status === "approved" && (
                    <button
                      className="text-red-500 underline"
                      onClick={() => changeDoctorStatus(record, "blocked")}
                    >
                      Block
                    </button>
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

export default DoctorsList;
