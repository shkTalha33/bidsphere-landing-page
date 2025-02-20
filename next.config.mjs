/** @type {import('next').NextConfig} */
import pkg from './next-i18next.config.js';
const { i18n } = pkg;
const nextConfig = {
    i18n,
    env: {
        GoogleApiKey: process.env.NEXT_APP_GOOGLEAPIKEY,
        PROJECTBASEURL: '',
        PROJECTSOCKETBASEURL: '',
    },
    images: {
        domains: ['storage.googleapis.com', 'lh3.googleusercontent.com', 'res.cloudinary.com'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    }
};

export default nextConfig;