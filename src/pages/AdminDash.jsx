import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import ToursList from "../pages/ToursList";
import { useSnackbar } from "notistack";

const AdminDash = () => {
  const [tours, setTours] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    axios
      .get("https://lucy-travels-backend.vercel.app/tours", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setTours(response.data);
      })
      .catch((error) => {
        enqueueSnackbar("Error fetching tours", { variant: "error" });
      });
  }, []);

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="display-5 mt-5">Manage Tours</h5>
        <Link to="/admin/tours/create">
          <MdOutlineAddBox className="display-5" />
        </Link>
      </div>

      <ToursList tours={tours} setTours={setTours} />
    </div>
  );
};

export default AdminDash;
