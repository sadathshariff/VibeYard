import "./auth.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AuthImage from "assets/AuthImage.svg";

export const Login = () => {
  return (
    <div className="auth-div">
      <div className="item auth-img-div">
        <img src={AuthImage} alt="Banner" />
      </div>
      <div className="item form-container">
        <Container maxWidth="sm">
          <h1>VibeYard</h1>
          <h2>Login</h2>
        </Container>

        <Container maxWidth="sm" spacing={6}>
          <div className="form-input-div">
            <label htmlFor="email">Email*</label>
            <input type="email" className="form-input-text" id="email" />
          </div>
          <div className="form-input-div">
            <label htmlFor="password">Password*</label>
            <input type="password" className="form-input-text" id="password" />
          </div>

          <div className="form-button-divs">
            <Button variant="contained">Login</Button>
            <p align="center">OR</p>
            <Button variant="outlined" color="success">
              Guest Login
            </Button>
          </div>
          <Link to="/signup">
            <p align="center">New to VibeYard | SignUp </p>
          </Link>
        </Container>
      </div>
    </div>
  );
};
