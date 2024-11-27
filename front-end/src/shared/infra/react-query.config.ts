import { QueryClient, setLogger } from "react-query";

setLogger({
  error: () => null,
  log: () => null,
  warn: () => null,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: false,
    },
  },
});

export { queryClient };
