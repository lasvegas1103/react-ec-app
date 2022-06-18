import * as React from "react";
import Box from "@mui/material/Box";

export default function BoxMid(props) {
  return (
    <Box sx={{ width: "40%", height: "100%", margin: "3rem auto" }}>
      {props.children}
    </Box>
  );
}
