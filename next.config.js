const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: "/wolffy",
  basePath: "/wolffy",
  publicRuntimeConfig: {
    basePath: "/wolffy",
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.alias['C'] = path.resolve(__dirname, './components');
    return config;
  }
}

const removeImports = require('next-remove-imports')();
module.exports = removeImports(nextConfig);
