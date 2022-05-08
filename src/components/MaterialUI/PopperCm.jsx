import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";

const PopperCm = (props) => {
  return (
    <Popper
      id={props.poperId}
      open={props.open}
      anchorEl={props.anchorEl}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
            {props.text}
          </Box>
        </Fade>
      )}
    </Popper>
  );
};

export default PopperCm;
