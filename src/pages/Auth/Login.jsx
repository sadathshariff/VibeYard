import "./auth.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AuthImage from "assets/AuthImage.svg";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
export const Login = () => {
  const navigate = useNavigate();
  const guestLogin = {
    email: "guest@gmail.com",
    password: "guest@123",
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email, Enter in this format name@example.com")
      .required("Please Enter Email!"),
    password: Yup.string()
      .required("Please Enter Password!")
      .min(8, "Password must be 8 or more characters"),
  });
  const onSubmit = (values, actions) => {
    actions.resetForm();
    navigate("/feed", { replace: true });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
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
          <form onSubmit={formik.handleSubmit}>
            <div className="form-input-div">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                className="form-input-text"
                id="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="error-msg">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="form-input-div">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                className="form-input-text"
                id="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="error-msg">{formik.errors.password}</p>
              ) : null}
            </div>

            <div className="form-button-divs">
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
              <p align="center">OR</p>
              <Button variant="contained" color="success" fullWidth>
                Guest Login
              </Button>
            </div>
          </form>
          <Link to="/signup">
            <p align="center">New to VibeYard | SignUp </p>
          </Link>
        </Container>
      </div>
    </div>
  );
};
