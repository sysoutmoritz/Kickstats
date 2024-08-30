/** @type {import('next').NextConfig} */
const nextConfig = {

    env: {
        SEASON: "2024/2025",
    },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: "kickbase.b-cdn.net",
            port: "",
            pathname: "/**",
        }]
    },
};

export default nextConfig;
