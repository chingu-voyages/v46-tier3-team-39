import { protectRouteSSR } from "../api/utils/protectRoute";

export default async function DashboardPage() {
  const canAccess = await protectRouteSSR("/auth/login");
  return <>Hello</>;
}

// export { getSessionServerSideProps as getServerSideProps };
