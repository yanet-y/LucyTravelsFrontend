import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { useSnackbar } from "notistack";

const ToursList = ({ tours, setTours }) => {
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;

    try {
      await axios.delete(`https://lucy-travels-backend.vercel.app/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTours(tours.filter((tour) => tour._id !== id));
      enqueueSnackbar("Tour deleted successfully", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to delete tour", { variant: "error" });
    }
  };

  return (
    <table className="table table-striped text-center">
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Destination</th>
          <th>Price</th>
          <th>Duration</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tours.map((tour, index) => (
          <tr key={tour._id}>
            <td>{index + 1}</td>
            <td>{tour.name}</td>
            <td>{tour.destination}</td>
            <td>{tour.price} Br</td>
            <td>{tour.duration} days</td>
            <td>
              <div className="d-flex justify-content-center gap-4">
                <Link to={`/tours/details/${tour._id}`} className="text-info">
                  <BsInfoCircle />
                </Link>
                <Link to={`/admin/tours/edit/${tour._id}`} className="text-warning">
                  <AiOutlineEdit />
                </Link>
                <MdOutlineDelete className="text-danger mt-2" style={{ cursor: "pointer" }} onClick={() => handleDelete(tour._id)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ToursList;
