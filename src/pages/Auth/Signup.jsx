import "./auth.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AuthImage from "assets/AuthImage.svg";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { openToast } from "redux/features/toastSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { createUser, getLoggedInUserData } from "firebaseMethods.js";
import { auth } from "firebase.js";
import { setUserId } from "redux/features/user/userSlice";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const addUser = async (userName, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      createUser(userName, email, password, result.user.uid);
      dispatch(
        openToast({
          message: `SignUp Successful, Welcome ${result.user.email}`,
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
        case "auth/email-already-in-use":
          return dispatch(
            openToast({
              message: "This email is already in use",
              type: "error",
            })
          );
        case "auth/weak-password":
          return dispatch(
            openToast({
              message: "Password should have more than 8 characters",
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
    addUser(values.userName, values.email, values.password);
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
