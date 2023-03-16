import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      );
      axios.defaults.headers.common['csrf-token'] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
