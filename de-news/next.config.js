module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
  }

  return nextConfig
}

module.exports = {
  webpack: (config, options) => {
    config.resolve.fallback = { fs: false };
    config.module.noParse = [/gun\.js$/, /sea\.js$/];
    return config;
  },
};





