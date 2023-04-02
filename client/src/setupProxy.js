/*
Setup Axios connection betw client & backend
*/
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/hotels',
		createProxyMiddleware({
			target: 'http://localhost:4000',
			changeOrigin: true,
		})
	);
};
