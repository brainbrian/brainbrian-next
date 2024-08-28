'use client';

import React from 'react';
import { type NextPage } from 'next';

interface ErrorProps {
    message: string;
}

const Error: NextPage<ErrorProps> = ({ message }) => (
    <main>
        <h2>Error</h2>
        <p>{message}</p>
    </main>
);

export default Error;
