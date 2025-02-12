import React from "react";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { useSnackbar } from "notistack";

const BookingsList = ({ bookings = [], setBookings }) => {  
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.delete(`https://lucy-travels-backend.vercel.app/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(bookings.filter((booking) => booking._id !== id));
      enqueueSnackbar("Booking canceled successfully", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to cancel booking", { variant: "error" });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Bookings</h2>

      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th>No.</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Tour</th>
            <th>Tour Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.user?.name || "Unknown"}</td>
                <td>{booking.user?.email || "N/A"}</td>
                <td>{booking.tour?.name || "Tour Removed"}</td>
                <td>{new Date(booking.tourDate).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex justify-content-center gap-4">
                    <Link to={`/admin/bookings/details/${booking._id}`} className="text-info">
                      <BsInfoCircle />
                    </Link>
                    <MdOutlineCancel
                      className="text-danger mt-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCancelBooking(booking._id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsList;
