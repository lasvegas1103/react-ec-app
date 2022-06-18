import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DDDDDD",
      contrastText: "#333333",
    },
  },
});

const HeaderLogOut = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              ECサイト（仮）
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
};

export default HeaderLogOut;
