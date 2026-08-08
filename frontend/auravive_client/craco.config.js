module.exports = {
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // Add your custom middleware here
      // This replaces the deprecated onBeforeSetupMiddleware and onAfterSetupMiddleware

      return middlewares;
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      // Ignore deprecation warnings
      webpackConfig.ignoreWarnings = [
        {
          module: /node_modules/,
          message: /DeprecationWarning/,
        },
      ];
      return webpackConfig;
    },
  },
};