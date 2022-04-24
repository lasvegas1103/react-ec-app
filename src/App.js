import "./App.css";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "./components/utils/Header";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UtilProvider } from "./context/UtilContext";

const Cgrid = styled(Grid)({
  margin: "3rem 1rem 1rem 2rem",
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
        <Cgrid container justifyContent="center">
          <UtilProvider>
            <Router />
          </UtilProvider>
          <ReactQueryDevtools />
        </Cgrid>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
