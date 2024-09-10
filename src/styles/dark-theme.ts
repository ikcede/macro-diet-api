'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const darkTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: '3rem',
      fontWeight: 'medium',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 'medium',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 'medium',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 'medium',
      color: '#b7a1ff',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

export default darkTheme;
