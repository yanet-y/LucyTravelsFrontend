import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import sideImage from "../assets/Img1.jpg";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    
    if (res.success) {
      enqueueSnackbar("Login successful", { variant: "success" });
      
      
      if (res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
      
    } else {
      enqueueSnackbar(res.message, { variant: "error" });
    }
  };

  return (
    <div className="d-flex vh-100">
      
      <div className="col-md-6 d-none d-md-block">
        <img
          src={sideImage}
          alt="Login"
          className="img-fluid w-100 h-100 object-fit-cover"
        />
      </div>

      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <div className="card p-4 shadow-lg" style={{ width: "30rem" }}>
          <h2 className="text-center mb-3">Login</h2>
          <form onSubmit={handleLogin}>
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
            <button className="btn btn-primary w-100" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
