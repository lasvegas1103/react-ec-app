import * as React from "react";
import Box from "@mui/material/Box";

export default function BoxSx(props) {
  return <Box sx={{ width: "100%", height: "100%" }}>{props.children}</Box>;
}
