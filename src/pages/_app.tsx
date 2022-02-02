import 'styles/globals.css';
//import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import mui_theme from '../config/mui_theme';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={mui_theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
