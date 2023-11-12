const determineOriginUrl = () => {
  const env = process.env.NODE_ENV;
  const prod = process.env.NEXT_PUBLIC_GRAPHQL_DOMAIN_PROD;
  const dev = process.env.NEXT_PUBLIC_GRAPHQL_DOMAIN_DEV;
  if (env === "development") return dev;
  return prod;
};
export default determineOriginUrl;
