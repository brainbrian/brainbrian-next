import React from 'react';

export const Loader = () => (
    <div className="w-40 h-28 relative mx-auto my-32">
        <div className="bg-[url('/images/brain.svg')] bg-no-repeat w-full h-full absolute animate-float">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);
