// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
const { Router } = require("@layer0/core/router");
const { nextRoutes, renderNextPage } = require("@layer0/next");

const foreverEdge = {
	browser: {
		maxAgeSeconds: 0,
		serviceWorkerSeconds: 60 * 60 * 24,
	},
	edge: {
		staleWhileRevalidateSeconds: 1,
		maxAgeSeconds: 60 * 60 * 60 * 365,
	},
};

const assetCache = {
	edge: {
		maxAgeSeconds: 60 * 60 * 60 * 365,
		forcePrivateCaching: true,
	},
	browser: {
		maxAgeSeconds: 0,
		serviceWorkerSeconds: 60 * 60 * 24,
	},
};

let prerenderPages = ["/"];

module.exports = new Router()
	.prerender(prerenderPages.map((page) => ({ path: page })))
	.get("/sitemap.xml", (res) => {
		renderNextPage("/sitemap.xml", res);
	})
  .match('/styles/:file', ({ cache, serveStatic }) => {
    cache(assetCache);
    serveStatic('styles/:file');
  })
  .match('/_next/static/:path*', ({ cache, removeUpstreamResponseHeader }) => {
    removeUpstreamResponseHeader('set-cookie');
    removeUpstreamResponseHeader('cache-control');
    cache(foreverEdge);
  })
  .match('/_next/image/:path*', ({ cache, removeUpstreamResponseHeader }) => {
    removeUpstreamResponseHeader('set-cookie');
    removeUpstreamResponseHeader('cache-control');
    cache(foreverEdge);
  })
	.match("/service-worker.js", ({ serviceWorker }) => {
		return serviceWorker(".next/static/service-worker.js");
	})
	.use(nextRoutes); // automatically adds routes for all files under /pages
