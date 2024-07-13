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
        hostname: 'jt-blog.s3.eu-west-2.amazonaws.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
