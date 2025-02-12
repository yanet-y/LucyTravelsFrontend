import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import sideImage from "../assets/Img1.jpg"; 

const Register = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await register(name, email, password);
    if (res.success) {
      enqueueSnackbar("Registration successful", { variant: "success" });
      navigate("/login");
    } else {
      enqueueSnackbar(res.message, { variant: "error" });
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="col-md-6 d-none d-md-block">
        <img
          src={sideImage}
          alt="Register"
          className="img-fluid w-100 h-100 object-fit-cover"
        />
      </div>

      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <div className="card p-4 shadow-lg" style={{ width: "30rem" }}>
          <h2 className="text-center mb-3">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-success w-100" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
