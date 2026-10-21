import fs from 'fs';
import path from 'path';
import { imageSize } from 'image-size';
import { config } from '@/config';

const FALLBACK_DIMENSIONS = { width: 1200, height: 800 };

// Read an image's intrinsic dimensions from a public URL like
// /content/posts/<slug>/photo.webp so it isn't scaled past its natural size.
export const getImageDimensions = (src: string) => {
    try {
        const filePath = path.join(
            config.contentDirectory,
            src.replace(/^\/content\//, ''),
        );
        const { width, height } = imageSize(fs.readFileSync(filePath));
        return width && height ? { width, height } : FALLBACK_DIMENSIONS;
    } catch {
        return FALLBACK_DIMENSIONS;
    }
};
