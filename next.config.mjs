/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode : false,
  images: {
    domains: [
      's3.ap-northeast-2.amazonaws.com',
      'lh3.googleusercontent.com',
      'ssl.pstatic.net',
      'k.kakaocdn.net',
      't1.kakaocdn.net',
    ],
  },
};

export default nextConfig;