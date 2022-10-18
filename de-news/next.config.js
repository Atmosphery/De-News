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
    config.module.noParse = /gun\.js$/;
    config.module.noParse = /gun\\sea\.js$/;
    return config;
  },
};

// module.exports = {
//   webpack: function (config, options) {
//     config.module.noParse = /sea\.js$/;
//     return config;
//   },
// };