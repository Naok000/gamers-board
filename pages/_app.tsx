import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserId, SessionUser } from '../recoil/boardState';
import { parseCookies, setCookie } from 'nookies';
import { options } from '../lib/nookiesOption';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const UserObserver = () => {
  const setUserId = useSetRecoilState(currentUserId);

  useEffect(() => {
    const cookies = parseCookies();
    console.log(cookies.user);

    if (cookies?.user !== 'undefined') {
      const cookiesUserId: SessionUser = JSON?.parse(cookies.user);

      if (cookiesUserId) {
        console.log('UserObserver', cookiesUserId);
        setUserId(cookiesUserId);
      }
    }
  }, [setUserId]);
  return null;
};

function WatchUser() {
  const user = useRecoilValue(currentUserId);

  useEffect(() => {
    setCookie(null, 'user', JSON.stringify(user), options);
  }, [user]);
  return null;
}

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
    <ChakraProvider>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <UserObserver />
          <WatchUser />
        </QueryClientProvider>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default MyApp;
