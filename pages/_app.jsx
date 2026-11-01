import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Inter, Space_Grotesk } from 'next/font/google';
import { darkTheme } from '@/themes';
import '../styles/styles.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

function App({ Component, pageProps }) {
  return (
    <div className={`${inter.variable} ${display.variable}`}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="bg-aurora" aria-hidden="true" />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

export default App;
