const { createProxyMiddleware } = require("http-proxy-middleware");

const targets = {
  default: "https://www.spotify.com",
  specificPrefix: "http://106.15.2.32:6969",
  accounts: "https://accounts.spotify.com/",
  open: "https://open.spotify.com",
  // Add more targets as needed
};

module.exports = (req, res) => {
  let target = targets.default; // Default target

  if (req.url.startsWith("/api") || req.url.startsWith("/auth") || req.url.startsWith("/banner") || req.url.startsWith("/CollegeTask")) {
    target = targets.specificPrefix; // Change target for specific URL prefixes
  } else if (req.url.startsWith("/signup")) {
    target = targets.signUp; // Change target for sign up requests
  } else if (req.url.startsWith("/open")) {
    target = targets.open; // Change target for "/open" requests
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
