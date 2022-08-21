import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { Link } from "react-router-dom";

/**
 * FloatingActionButton
 * @param {*} props
 * @returns
 */
const FloatingActionButton = (props) => {
  return (
    <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
      <Fab
        color={props.color}
        variant={props.variant}
        component={Link}
        to={props.to}
      >
        {props.name}
      </Fab>
    </Box>
  );
};

export default FloatingActionButton;
