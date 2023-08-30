import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        background:
          'linear(to-l,rgba(7, 27, 82, 1) 0%, rgba(0, 128, 128, 1) 100%)',
      },
      html: {
        height: '100%',
      },
    },
  },
});
