/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";

    // Since Webpack 5 doesn't enable WebAssembly by default, we should do it manually
    config.experiments = { ...config.experiments, asyncWebAssembly: true };

    return config;
  },
};

module.exports = nextConfig;
