const { ChildCare } = require("@mui/icons-material");

module.exports = {
    webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = { fs: false, child_process: false };
  
      return config;
    },
  };