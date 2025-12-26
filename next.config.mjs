const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cinevia.dev.retrocubedev.com",
                pathname: "/**",
            },
        ],
    },
    experimental: {
        reactCompiler: true
    }
};


export default nextConfig;