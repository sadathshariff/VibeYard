import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NotFoundImage from "assets/NotFoundImage.svg";
import { useNavigate } from "react-router-dom";
export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "50%",
        height: "50%",

        margin: "0 auto",
      }}
    >
      <img src={NotFoundImage} alt="Page Not Found" />

      <Button
        variant="contained"
        color="success"
        onClick={() => navigate("/feed", { replace: true })}
      >
        Back to Feed
      </Button>
    </Box>
  );
};
