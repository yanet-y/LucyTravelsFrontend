import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";


const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await axios.get(`https://lucy-travels-backend.vercel.app/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(res.data);
      } catch (error) {
        enqueueSnackbar("Failed to fetch booking details", { variant: "error" });
        navigate("/admin/bookings");
      }
    };

    fetchBookingDetails();
  }, [id, token, enqueueSnackbar, navigate]);

  if (!booking) {
    return <div className="text-center mt-4">Loading booking details...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Booking Details</h2>
      <div className="card p-4 shadow-lg">
        <div className="row">
          <div className="col-md-6">
            <h4 style={{color:"blue"}}>User Information</h4>
            <p><strong>Name:</strong> {booking.user?.name || "Unknown"}</p>
            <p><strong>Email:</strong> {booking.user?.email || "N/A"}</p>
          </div>

          <div className="col-md-6">
            <h4 style={{color:"blue"}}>Tour Information</h4>
            <p><strong>Tour Name:</strong> {booking.tour?.name || "Tour Removed"}</p>
            <p><strong>Destination:</strong> {booking.tour?.destination || "N/A"}</p>
            <p><strong>Tour Date:</strong> {new Date(booking.tourDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={() => navigate("/admin/bookings")}>
            Back to Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
