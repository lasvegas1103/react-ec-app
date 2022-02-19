import "./App.css";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "./components/utils/Header";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const C_Grid = styled(Grid)({
  margin: "50px auto",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 300000,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <C_Grid container justifyContent="center">
          <Router />
          <ReactQueryDevtools />
        </C_Grid>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
