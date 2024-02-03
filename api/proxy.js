const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  let target = "https://open.spotify.com"; // Default target

  if (
    req.url.startsWith("/api") ||
    req.url.startsWith("/auth") ||
    req.url.startsWith("/banner") ||
    req.url.startsWith("/CollegeTask")
  ) {
    target = "http://106.15.2.32:6969"; // Change target for specific URL prefixes
  }

  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // You can add path rewriting if needed
      // "^/backend/": "/",
    },
  })(req, res);
};
