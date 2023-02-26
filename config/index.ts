const env = process.env.NODE_ENV;

export const config = {
    contentDirectory: env == 'development' ? './content' : './content',
};
