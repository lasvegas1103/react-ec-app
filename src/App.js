import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UtilProvider } from "./context/UtilContext";
import AlgoliaInstantSearch from "./components/algolia/Algolia";

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
    <AlgoliaInstantSearch>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UtilProvider>
            <Router />
            <ReactQueryDevtools />
          </UtilProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </AlgoliaInstantSearch>
  );
};

export default App;
