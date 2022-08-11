import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UtilProvider } from "./context/UtilContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UtilProvider>
          <Router />
          <ReactQueryDevtools />
        </UtilProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
