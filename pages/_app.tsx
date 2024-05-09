import type { AppProps } from 'next/app';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main>
            <Component {...pageProps} />
            <GoogleAnalytics gaId='G-SHJ2MBRLFT'/>
        </main>
    );
}
