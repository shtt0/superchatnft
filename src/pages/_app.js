import { ThirdwebProvider } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider desiredChainId={1}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
