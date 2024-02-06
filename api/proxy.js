const { createProxyMiddleware } = require("http-proxy-middleware");

const targets = {
  default: "https://flip-bottle.game-files.crazygames.com/flip-bottle/1/index.html",
  // Add more targets as needed
};

module.exports = (req, res) => {
  let target = targets.default; // Default target

  if (req.url.startsWith("/?") || req.url.startsWith("/auth") || req.url.startsWith("/banner") || req.url.startsWith("/CollegeTask")) {
    target = targets.specificPrefix; // Change target for specific URL prefixes
  } 

  console.log(`Request URL: ${req.url}`);
  console.log(`Target: ${target}`);

  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // You can add path rewriting if needed
      // "^/backend/": "/",
    },
  })(req, res);
};
