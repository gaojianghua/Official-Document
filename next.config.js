const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gaojianghua.oss-cn-hangzhou.aliyuncs.com', 'official-document.oss-cn-hangzhou.aliyuncs.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
  output:"standalone",
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.alias['C'] = path.resolve(__dirname, './components');
    return config;
  }
}

const removeImports = require('next-remove-imports')();
module.exports = removeImports(nextConfig);
