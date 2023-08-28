import { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import WithSubnavigation from './Navbar';

type Props = {
  title: string;
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children, title = '' }) => {
  return (
    <Box>
      <Head>
        <title>{title}</title>
      </Head>
      <WithSubnavigation />
      <Box bgGradient='linear(to-l,rgba(7,27,82,1) 0%, rgba(0,128,128,1) 100%)'>
        {children}
      </Box>
    </Box>
  );
};
