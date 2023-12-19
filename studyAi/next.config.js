/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@mui/icons-material/?(((\\w*)?/?)*)": {
      transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
    "react-icons/?(((\\w*)?/?)*)": {
      transform: "react-icons/{{ matches.[1] }}/{{member}}",
    },
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "lodash": {
      transform: "lodash/{{member}}",
    }
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

module.exports = nextConfig;
