const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'http://10.10.200.140:3000/graphql',
      changeOrigin: true,
    }),
  );

  app.use(
    '/investment-document',
    createProxyMiddleware({
      target: 'http://10.10.200.140:3000',
      changeOrigin: true,
    }),
  );

  app.use(
    '/project-file',
    createProxyMiddleware({
      target: 'http://10.10.200.140:3000',
      changeOrigin: true,
    }),
  );
};
