/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**', // Aceptar todas las rutas de Cloudinary
            },
        ],
    },
};

export default nextConfig;
