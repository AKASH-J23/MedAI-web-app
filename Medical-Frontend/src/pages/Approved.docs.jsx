import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import Doctorcard from '../Components/Cards/doctor.card'

function Approveddocs() {
  const [doctors, setDoctors] = useState([])
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.get("http://localhost:3000/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading())
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='flex flex-wrap'>
      {doctors.map((doctor) => (<Doctorcard key={doctor._id} doctor={doctor} className="mx-2 mb-4"/>))}
    </div>
  )
}

export default Approveddocs