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
      <main>{children}</main>
    </Box>
  );
};
