import React, { useState, useEffect } from "react";
import axios from "axios";
import TourCard from "../components/TourCard";
import { useSnackbar } from "notistack";

const Home = () => {
  const [tours, setTours] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("https://lucy-travels-backend.vercel.app/tours");
        setTours(res.data);
      } catch (error) {
        enqueueSnackbar("Failed to load tours", { variant: "error" });
      }
    };

    fetchTours();
  }, [enqueueSnackbar]);

  return (
    <div className="container mt-4">
      <h2 className="text-center m-4">Our Tour Packages</h2>
      <div className="row g-3 my-2">
        {tours.length > 0 ? (
          tours.map((tour) => <TourCard key={tour._id} tour={tour} />)
        ) : (
          <p className="text-center">No tours available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
