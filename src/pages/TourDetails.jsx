import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import BackBtn from "../components/BackBtn";

const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://lucy-travels-backend.vercel.app/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTour(res.data))
      .catch(() => enqueueSnackbar("Error fetching tour details", { variant: "error" }));
  }, [id]);

 

  if (!tour) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      
      <div className="d-flex mt-5 gap-4">
      <img src={tour.image} alt={tour.name} style={{width:"500px", height: "400px"}} />
      <div>
      <h1 className="text-center mb-3 mt-0">{tour.name}</h1>
      <p><strong>Description:</strong> {tour.description}</p>
      <p><strong>Price:</strong> {tour.price} Br</p>
      <p><strong>Duration:</strong> {tour.duration} days</p>
      <p><strong>Destination:</strong> {tour.destination}</p>
      </div>
      </div>
      
      
      
      
    </div>
  );
};

export default TourDetails;
