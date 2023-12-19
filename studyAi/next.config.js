/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@mui/icons-material/?(((\\w*)?/?)*)": {
      transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
    "react-icons/?(((\\w*)?/?)*)": {
      transform: "react-icons/{{ matches.[1] }}/{{member}}",
    },
    // "@fortawesome/free-solid-svg-icons": {
    //   transform: "@fortawesome/free-solid-svg-icons/{{member}}",
    // },
    // "@fortawesome/free-regular-svg-icons": {
    //   transform: "@fortawesome/free-regular-svg-icons/{{member}}",
    // },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

module.exports = nextConfig;
