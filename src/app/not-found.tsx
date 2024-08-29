import React from 'react';
import type { Metadata } from 'next';

const NotFound: React.FC = () => (
    <main className="content">
        <h2>404</h2>
        <p>Page not found</p>
    </main>
);

export const metadata: Metadata = {
    title: 'Not Found',
};

export default NotFound;
