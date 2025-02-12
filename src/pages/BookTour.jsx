import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import sideImage from "../assets/img3.jpg";

const BookTour = () => {
  const { id } = useParams(); 
  const [fullName, setFullName] = useState("");
  const [tour, setTour] = useState(null);
  const [tourDate, setTourDate] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    console.log("Tour ID from URL:", id);
    const fetchTour = async () => {
      try {
        const res = await axios.get(`https://lucy-travels-backend.vercel.app/tours/${id}`);
        setTour(res.data);
      } catch (error) {
        enqueueSnackbar("Failed to load tour details", { variant: "error" });
      }
    };

    fetchTour();
  }, [id, enqueueSnackbar]);

  const handleBooking = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(
        "https://lucy-travels-backend.vercel.app/bookings",
        { fullName, tourId: id, tourDate },
        { headers: { Authorization: `Bearer ${token}` } } 
      );
  
      enqueueSnackbar(res.data.message || "Booking successful!", {
        variant: "success",
      });
  
      navigate("/bookings"); 
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Booking failed, please try again",
        { variant: "error" }
      );
    }
  };
  
  return (
    <div className="d-flex vh-100">
      <div className="col-md-6 d-none d-md-block">
        <img
          src={sideImage}
          alt="Tour Booking"
          className="img-fluid w-100 h-100 object-fit-cover"
        />
      </div>

      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <div className="card p-4 shadow-lg" style={{ width: "30rem" }}>
          <h2 className="text-center mb-3">Book a Tour</h2>

          {tour ? (
            <form onSubmit={handleBooking}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Selected Tour</label>
                <input
                  type="text"
                  className="form-control"
                  value={`${tour.name} - ${tour.destination}`}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Tour Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={tourDate}
                  onChange={(e) => setTourDate(e.target.value)}
                  required
                />
              </div>

              <button className="btn btn-primary w-100" type="submit">
                Book Now
              </button>
            </form>
          ) : (
            <p className="text-center">Loading tour details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookTour;
