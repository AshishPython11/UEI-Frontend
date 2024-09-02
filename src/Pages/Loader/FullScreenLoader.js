import {
  TailSpin,
  BallTriangle,
  Circles,
  MutatingDots,
  ThreeDots,
  Oval,
} from "react-loader-spinner";
import "./FullScreenLoader.scss"; // Import CSS for styling
import { Box, CircularProgress } from "@mui/material";

const FullScreenLoader = () => {
  return (
    // <div className="fullscreen-loader">
    //   <ThreeDots
    //     height="110"
    //     width="110"
    //     color="#0000FF"
    //     radius="1"
    //     visible={true}
    //     strokeWidth={2}
    //   />
    // </div>
    <Box className="fullscreen-loader" sx={{ display: 'flex' }}>
    <CircularProgress  size={50}
        thickness={3.5} />
  </Box>
  );
};

export default FullScreenLoader;
