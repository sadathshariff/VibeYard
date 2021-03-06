import styles from "./Landing.module.css";
import video from "assets/video.mp4";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";

export const Landing = () => {
  return (
    <div className={`${styles.full_container}`}>
      <h1 align="center">Welcome to</h1>
      <div className={`${styles.home_container}`}>
        <section className={`${styles.showcase} flex-center`}>
          <video className={`${styles.video} `} autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
          <div className={`${styles.title}`}>VibeYard</div>
        </section>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ width: "12rem", m: 2, p: 1 }}>
            <Link to="/login">
              <Button variant="contained" color="primary" fullWidth>
                Let's Vibe
              </Button>
            </Link>
          </Box>
        </Box>
      </div>
    </div>
  );
};
