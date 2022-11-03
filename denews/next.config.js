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
  // module:{
  //   noParse: /gun\.js$/,
  // },
  
  webpack: (config, options) => {
    config.module.noParse = [/gun\.js$/, /sea\.js$/];
    return config;
  },
};





