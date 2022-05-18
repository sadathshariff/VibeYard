import styles from "./Landing.module.css";
import video from "assets/video.mp4";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particlesConfig } from "particle-config";
export const Landing = () => {
  const particlesInit = async (main) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  //Commented out will be working on this later on
  // const particlesLoaded = (container) => {
  //   console.log(container);
  // };
  return (
    <>
      <h1 align="center">Welcome to</h1>

      <div className={`${styles.home_container}`}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          // loaded={particlesLoaded}
          options={particlesConfig}
        ></Particles>
        <section className={`${styles.showcase} flex-center`}>
          <video className={`${styles.video} `} autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
          <h3 className={`${styles.title}`}>VibeYard</h3>
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
    </>
  );
};
