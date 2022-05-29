import "./App.css";
import { useEffect } from "react";
import { RouterPath } from "RouterPath";
import Container from "@mui/material/Container";
import { Toast } from "components";
import { useDispatch } from "react-redux";
import { getLoggedInUserData, getAllPosts } from "firebaseMethods.js";

function App() {
  const token = localStorage.getItem("userToken");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  useEffect(() => {
    dispatch(getLoggedInUserData(token));
  }, [token]);

  return (
    <div className="App">
      <Toast />
      <Container maxWidth="lg">
        <RouterPath />
      </Container>
    </div>
  );
}

export default App;
