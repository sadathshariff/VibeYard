import "./auth.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AuthImage from "assets/AuthImage.svg";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Signup = () => {
  const navigate = useNavigate();
  const initialValues = {
    userName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("Please Enter UserName!")
      .min(4, "UserName must be atleast 4 characters"),
    email: Yup.string()
      .email("Enter a valid email, in this format name@example.com")
      .required("Enter EmailId"),
    password: Yup.string()
      .required("Enter Password")
      .min(8, "Password must be 8 or more characters"),
  });

  const onSubmit = (values, actions) => {
    actions.resetForm();
    navigate("/login");
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
          <h2>SignUp</h2>
        </Container>

        <Container maxWidth="sm" spacing={6}>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-input-div">
              <label htmlFor="username">UserName*</label>
              <input
                type="text"
                className="form-input-text"
                id="username"
                {...formik.getFieldProps("userName")}
              />
              {formik.touched.userName && formik.errors.userName ? (
                <p className="error-msg">{formik.errors.userName}</p>
              ) : null}
            </div>
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
              <Button variant="contained" type="submit" fullWidth>
                SignUp
              </Button>
            </div>
          </form>
          <Link to="/login">
            <p align="center">Already a User | Login</p>
          </Link>
        </Container>
      </div>
    </div>
  );
};
