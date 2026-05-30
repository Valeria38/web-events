import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    logging: {
        browserToTerminal: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    cacheComponents: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
    experimental: {
        // optimizePackageImports: ['ogl'],
        serverActions: {
            bodySizeLimit: "4mb",
        },
    },
};

export default nextConfig;
