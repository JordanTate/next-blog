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
            ? 'jt-blog.s3.eu-west-2.amazonaws.com'
            : 'blog.jordantate.dev',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
