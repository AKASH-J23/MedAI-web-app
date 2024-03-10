import React from "react";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notifications() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/user/mark-all-notifications-as-seen",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3000/api/user/delete-all-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full my-2 px-2 h-full">
      <Tabs className="border p-2 border-black">
        <Tabs.TabPane tab="Unseen" key={0}>
          <hr className="border-black" />
          <div className="flex justify-end">
            <h1
              className="cursor-pointer hover:text-red-500 mt-2"
              onClick={() => markAllAsSeen()}
            >
              Mark all as seen
            </h1>
          </div>
          {user?.unseenNotifications.map((notification, index) => (
            <div
              key={`unseen-${index}`}
              className=" p-1 mt-1"
              onClick={() => navigate(notification.onClickPath)}
            >
              <div className="bg-white rounded p-2 cursor-pointer">
                {notification.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={1}>
          <hr className="border-black" />
          <div className="flex justify-end">
            <h1
              className="cursor-pointer hover:text-red-500 mt-2"
              onClick={() => deleteAll()}
            >
              Delete all
            </h1>
          </div>
          {user?.seenNotifications.map((notification, index) => (
            <div
              key={`seen-${index}`}
              className="p-1 mt-1"
              onClick={() => navigate(notification.onClickPath)}
            >
              <div className="bg-white rounded p-2">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
      <ToastContainer className="bg-gray-100" />
    </div>
  );
}

export default Notifications;
