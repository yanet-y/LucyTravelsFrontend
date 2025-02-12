import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackBtn from "../components/BackBtn";

const EditTour = () => {
  const { id } = useParams();
  const [tour, setTour] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    destination: "",
    image: "",
  });

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

  const handleChange = (e) => setTour({ ...tour, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://lucy-travels-backend.vercel.app/tours/${id}`, tour, {
        headers: { Authorization: `Bearer ${token}` },
      });
      enqueueSnackbar("Tour updated successfully", { variant: "success" });
      navigate("/admin");
    } catch {
      enqueueSnackbar("Error updating tour", { variant: "error" });
    }
  };

  return (
    <div className="container card p-4 shadow-lg mt-4">
      <BackBtn />
      <h2 className="text-center">Edit Tour</h2>
      <form onSubmit={handleSubmit}>
        {["name", "description", "price", "duration", "destination"].map((field) => (
          <div key={field} className="mb-3">
            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              className="form-control"
              name={field}
              value={tour[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-25 mt-4">Update Tour</button>
      </form>
    </div>
  );
};

export default EditTour;
