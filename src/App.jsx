import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import TourDetails from "./pages/TourDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDash";
import ManageBookings from "./pages/ManageBookings";
import BookingDetails from "./pages/BookingDetails";
import PrivateRoute from "./components/PrivateRoute";
import CreateTour from "./pages/CreateTour";
import EditTour from "./pages/EditTour";
import AuthProvider from "./context/AuthContext";
import BookTour from "./pages/BookTour";
import MyBookings from "./pages/MyBookings";


const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<PrivateRoute admin><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/tours/create" element={<PrivateRoute admin><CreateTour /></PrivateRoute>} />
        <Route path="/admin/tours/edit/:id" element={<PrivateRoute admin><EditTour /></PrivateRoute>} />
        <Route path="/tours/details/:id" element={<TourDetails />} />
        <Route path="/book-tour/:id" element={<BookTour />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/admin/bookings" element={<PrivateRoute admin><ManageBookings /></PrivateRoute>} />
        <Route path="/admin/bookings/details/:id" element={<PrivateRoute admin><BookingDetails /></PrivateRoute>} />
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
    
  );
};

export default App;
