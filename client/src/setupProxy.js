const { createProxy } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/hotels',
		createProxy({
			target: 'http://localhost:4000',
			changeOrigin: true,
		})
	);
};
