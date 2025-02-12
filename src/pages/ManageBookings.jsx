import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import BookingsList from "./BookingsList"; 

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);  
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("https://lucy-travels-backend.vercel.app/bookings/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);  
      } catch (error) {
        enqueueSnackbar("Failed to fetch bookings", { variant: "error" });
      }
    };

    fetchBookings();
  }, [token, enqueueSnackbar]);

  return (
    <div className="container">
    
      <BookingsList bookings={bookings} setBookings={setBookings} />
    </div>
  );
};

export default ManageBookings;
