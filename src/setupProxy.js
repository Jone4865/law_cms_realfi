const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/investment-document',
    createProxyMiddleware({
      target: 'http://10.10.200.140:3000',
      changeOrigin: true,
    }),
  );
};
