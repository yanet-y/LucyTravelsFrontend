import React from "react";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineBookOnline } from "react-icons/md";

const TourCard = ({ tour }) => {
  return (
    
    <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch d-flex mb-4">
      <div className="card shadow-lg w-100 h-100">
        <img
          src={tour.image}
          alt={tour.name}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{tour.name}</h5>
          <p className="card-text">
            <strong>Destination:</strong> {tour.destination}
          </p>
          <p className="card-text">
            <strong>Duration:</strong> {tour.duration} days
          </p>
          <p className="card-text">
            <strong>Price:</strong> {tour.price} Br
          </p>

          <div className="d-flex justify-content-between mt-auto">
            <Link
              to={`/tours/details/${tour._id}`}
              className="btn btn-primary"
            >
              <BsInfoCircle className="me-2" />
              Details
            </Link>

            <Link to={`/book-tour/${tour._id}`} className="btn btn-success">
              <MdOutlineBookOnline className="me-2" />
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
