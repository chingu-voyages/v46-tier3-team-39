import { Footer } from "./server/footer";
import Navbar from "./client/navbar";
const NavigationWrapper = ({
  children,
  appBars,
}: {
  children: React.ReactNode;
  appBars?: {
    navbar: boolean;
    footer: boolean;
  };
}) => {
  return (
    <>
      {appBars ? (
        <>
          {appBars.navbar && <Navbar />}
          <main
            className="bg-White flex flex-col w-100"
            style={{
              minHeight: `calc(100vh - ${appBars.navbar ? "3.5rem" : "0px"}`,
            }}
          >
            {children}
          </main>
          {appBars.footer && <Footer />}
        </>
      ) : (
        children
      )}
    </>
  );
};
export default NavigationWrapper;
