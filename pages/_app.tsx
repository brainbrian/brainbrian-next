import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

import '../styles/Styles.scss';
import { Footer } from '../components';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            {pageProps.recentPosts && <Footer posts={pageProps.recentPosts} />}
            <Analytics />
        </>
    );
}
export default App;
