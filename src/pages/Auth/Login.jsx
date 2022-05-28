import "./auth.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AuthImage from "assets/AuthImage.svg";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { openToast } from "redux/features/toastSlice";
import { setUserId } from "redux/features/user/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase.js";
import { getLoggedInUserData } from "firebaseMethods";
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const handleLogin = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        openToast({
          message: `Login Successful, Welcome ${result.user.email}`,
          type: "success",
        })
      );
      dispatch(setUserId(result.user.uid));
      dispatch(getLoggedInUserData(result.user.uid));
      localStorage.setItem("userToken", result.user.uid);
      if (result.user) {
        navigate("/feed", { replace: true });
      }
    } catch (error) {
      const errorCode = error.code;

      switch (errorCode) {
        case "auth/wrong-password":
          return dispatch(
            openToast({
              message: "Invalid password,Try recalling it",
              type: "error",
            })
          );
        case "auth/invalid-email":
          return dispatch(
            openToast({
              message: "Invalid emailId",
              type: "error",
            })
          );
        case "auth/user-not-found":
          return dispatch(
            openToast({
              message: "You have to signup First ",
              type: "warning",
            })
          );
        default:
          dispatch(
            openToast({
              message: "Some error occured, please try again later.",
              type: "error",
            })
          );
      }
    }
  };

  const onSubmit = (values, actions) => {
    handleLogin(values.email, values.password);
    actions.resetForm();
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
