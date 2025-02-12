import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FaTrash } from "react-icons/fa";
import { Card } from "react-bootstrap";


const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("https://lucy-travels-backend.vercel.app/bookings/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (error) {
        console.log(error);
        //enqueueSnackbar("Failed to load bookings", { variant: "error" });
      }
    };
  
    fetchBookings();
  }, [ token, enqueueSnackbar]); 
  

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.delete(`https://lucy-travels-backend.vercel.app/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));

      enqueueSnackbar("Booking canceled successfully!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to cancel booking", { variant: "error" });
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mb-4 mt-4">
      <h2 className="p-3">My Bookings</h2>

      <div style={{ width: "70%" }}>
        {bookings.length === 0 ? (
          <p className="text-center">No bookings yet.</p>
        ) : (
          bookings.map((booking) => (
            <Card
              key={booking._id}
              className="mb-3 p-3 d-flex flex-row align-items-center justify-content-between shadow-lg"
            >
              <div>
                <h4 className="mb-2" style={{ color: "blue" }}>{booking.tour.name}</h4>
                <p className="mb-1"><strong>Destination:</strong> {booking.tour.destination}</p>
                <p className="mb-1"><strong>Date:</strong> {new Date(booking.tourDate).toDateString()}</p>
                <p className="mb-0"><strong>Booked by:</strong> {booking.fullName}</p>
              </div>
              <FaTrash
                size={24}
                color="red"
                role="button"
                onClick={() => deleteBooking(booking._id)}
                style={{ cursor: "pointer" }}
              />
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
