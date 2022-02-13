import "./App.css";
import { Grid } from "@mui/material";
import Header from "./components/utils/Header";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

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
        <Grid container direction="column">
          <Header />
          <div style={{ padding: 30 }}>
            <Router />
            <ReactQueryDevtools />
          </div>
        </Grid>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
