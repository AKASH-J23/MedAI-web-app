import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar.component";
import Patientregister from "./pages/Patient.register";
import Login from "./pages/Pat.and.doc.login";
import Chatbot from "./pages/Chatbot";
import Services from "./pages/Services";
import Notifications from "./pages/Notifications";
import PublicRoute from "./Components/Pub&Pro.routes/publicRoute";
import ProtectedRoute from "./Components/Pub&Pro.routes/ProtectedRoute";
import { useSelector } from "react-redux";
import DoctorRegister from "./pages/Doctor.register";
import DoctorsList from "./pages/Admin/DoctorsList";
import UsersList from "./pages/Admin/UserList";
import Approveddocs from "./pages/Approved.docs";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import DoctorAppointment from "./pages/DoctorAppointment";
import Diabetes from "./pages/Diabetes-pred";
import HeartDisease from "./pages/Heart-disease-pred";
import Pneumonia from "./pages/Pneumonia-pred";
import Tuberculosis from "./pages/Tuberculosis";
import { SpinnerCircular } from "spinners-react";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div className="outer">
      {loading && (
        <div className="flex justify-center items-center bg-black bg-opacity-70 fixed top-0 left-0 w-full h-full z-50">
          <SpinnerCircular />
        </div>
      )}
      <Navbar />
      {/* <BrowserRouter> */}
      <Routes>
        <Route
          path="/approved-doctors"
          exact
          element={
            <ProtectedRoute>
              <Approveddocs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/appointments"
          exact
          element={
            <ProtectedRoute>
              <DoctorAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          exact
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-appointment/:doctorId"
          exact
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/doctorslist"
          exact
          element={
            <ProtectedRoute>
              <DoctorsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/userslist"
          exact
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          exact
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/doc-register"
          exact
          element={
            <ProtectedRoute>
              <DoctorRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-register"
          exact
          element={
            <PublicRoute>
              <Patientregister />
            </PublicRoute>
          }
        />
        <Route
          path="/chatbot"
          exact
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          exact
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          exact
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          exact
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diabetes-prediction"
          exact
          element={
            <ProtectedRoute>
              <Diabetes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/heart-disease-prediction"
          exact
          element={
            <ProtectedRoute>
              <HeartDisease />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pneumonia-prediction"
          exact
          element={
            <ProtectedRoute>
              <Pneumonia />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tuberculosis-prediction"
          exact
          element={
            <ProtectedRoute>
              <Tuberculosis />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
