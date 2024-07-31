/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          process.env.NODE_ENV == 'development'
            ? `${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`
            : `${process.env.PRODUCTION_DOMAIN}`,
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
