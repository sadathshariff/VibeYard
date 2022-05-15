import "./auth.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AuthImage from "assets/AuthImage.svg";

export const Signup = () => {
  return (
    <div className="auth-div">
      <div className="item auth-img-div">
        <img src={AuthImage} alt="Banner" />
      </div>
      <div className="item form-container">
        <Container maxWidth="sm">
          <h1>VibeYard</h1>
          <h2>SignUp</h2>
        </Container>

        <Container maxWidth="sm" spacing={6}>
          <div className="form-input-div">
            <label htmlFor="username">UserName*</label>
            <input type="text" className="form-input-text" id="username" />
          </div>
          <div className="form-input-div">
            <label htmlFor="email">Email*</label>
            <input type="email" className="form-input-text" id="email" />
          </div>
          <div className="form-input-div">
            <label htmlFor="password">Password*</label>
            <input type="password" className="form-input-text" id="password" />
          </div>

          <div className="form-button-divs">
            <Button variant="contained" fullWidth>
              SignUp
            </Button>
          </div>
          <Link to="/login">
            <p align="center">Already a User | Login</p>
          </Link>
        </Container>
      </div>
    </div>
  );
};
