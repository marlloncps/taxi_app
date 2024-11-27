import { RecoilRoot } from "recoil";
import Routes from "./routes";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./shared/infra/react-query.config";
import { SnackbarProvider } from "notistack";
import { snackbarProviderProps } from "./shared/infra/notistack.config";

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider {...snackbarProviderProps}>
          <Routes />
        </SnackbarProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
