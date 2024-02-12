/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost"],
        remotePatterns: [
            {
                hostname: "localhost",
                pathname: "/uploads/*",
            },
        ],
    },
};

export default nextConfig;
