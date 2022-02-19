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
        <Header />
        <Grid container direction="column">
          <Grid container>
            <Grid sm={3} />
            <Grid lg={6} sm={6} spacing={10}>
              <div style={{ padding: 30 }}>
                <Router />
                <ReactQueryDevtools />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
