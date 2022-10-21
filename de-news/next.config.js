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
  webpack: function (config, options) {
    //config.module.noParse = /gun\\gun\.js$/;
    config.module.noParse = '/gun\\sea\.js$/';
    config.module.noParse = '/gun\.js$/';
    

    return config;
  },
  
  
};

