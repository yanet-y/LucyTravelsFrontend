import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import { useSnackbar } from "notistack";

const CreateTour = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [destination, setDestination] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");


  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSaveTour = async () => {
    if (!token) {
      enqueueSnackbar("Unauthorized! Please log in again.", { variant: "error" });
      return;
    }

    try {
      
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "filehandle");

      const result = await axios.post(
        `https://api.cloudinary.com/v1_1/dotmtm926/upload`,
        formData
      );

      let imageUrl = result.data.secure_url || "";

      const data = { name, description, price, duration, destination, image: imageUrl };

      await axios.post("https://lucy-travels-backend.vercel.app/tours", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      enqueueSnackbar("Tour Created Successfully", { variant: "success" });
      navigate("/admin");
    } catch (error) {
      console.error("Error creating tour:", error);
      enqueueSnackbar(error.response?.data?.message || "Error creating tour", { variant: "error" });
    }
  };

  return (
    <div className="m-4">
      <BackBtn />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={{ width: "50rem" }}>
          <h2 className="text-center mb-4">Create a New Tour</h2>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Duration</label>
              <input
                type="text"
                className="form-control"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Destination</label>
              <input
                type="text"
                className="form-control"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image</label>
            <input type="file" className="form-control" onChange={handleFile} />
          </div>

          <button className="btn btn-primary w-25 mt-4 mx-auto " onClick={handleSaveTour}>
            Save Tour
          </button>
        </div>
      </div>
    </div>
  );

};

export default CreateTour;
