'use client';

import React from 'react';
import type { Metadata, NextPage } from 'next';

interface ErrorProps {
    message: string;
}

const Error: NextPage<ErrorProps> = ({ message }) => (
    <main>
        <h2>Error</h2>
        <p>{message}</p>
    </main>
);

export const metadata: Metadata = {
    title: 'Error',
};

export default Error;
