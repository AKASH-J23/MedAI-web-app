import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import moment from "moment";

function UsersList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUsersData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold flex justify-center mb-4">
        Users List
      </h1>
      <hr className="my-4" />

      <div className="overflow-x-auto px-2">
        <table className="min-w-full bg-black border border-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-black">Name</th>
              <th className="py-2 px-4 border border-black">Email</th>
              <th className="py-2 px-4 border border-black">Created At</th>
              <th className="py-2 px-4 border border-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((record) => (
              <tr key={record._id}>
                <td className="py-2 px-4 border border-black">{record.name}</td>
                <td className="py-2 px-4 border border-black">
                  {record.email}
                </td>
                <td className="py-2 px-4 border border-black">
                  {moment(record.createdAt).format("DD-MM-YYYY")}
                </td>
                <td className="py-2 px-4 border border-black">
                  <div className="flex">
                    <h1 className="text-red-500 underline">Block</h1>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;
