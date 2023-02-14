const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'http://10.10.200.140:3000/graphql',
      changeOrigin: true,
    }),
  );
};
