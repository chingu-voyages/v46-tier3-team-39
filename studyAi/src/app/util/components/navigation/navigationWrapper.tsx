import { Footer } from "./server/footer";
import Navbar from "./client/navbar";
const NavigationWrapper = ({
  children,
  appBars,
  usePadding = false,
  limitWidth = true,
}: {
  children: React.ReactNode;
  usePadding?: boolean;
  limitWidth?: boolean;
  appBars?: {
    navbar: boolean;
    footer: boolean;
  };
  }) => {
  return (
    <>
      {appBars ? (
        <>
          {appBars.navbar && <Navbar limitWidth={limitWidth} />}
          <main
            className={`bg-White flex flex-col h-full w-full text-Black ${
              usePadding ? "px-[3%] md:px-[5%] items-center" : ""
            }`}
            style={{
              minHeight: `calc(100vh - ${appBars.navbar ? "3.5rem" : "0px"})`,
            }}
          >
            {usePadding && (
              <div
                className={`flex flex-col grow w-full pt-2 h-full ${
                  limitWidth ? "max-w-screen-xl" : ""
                }`}
              >
                {children}
              </div>
            )}
            {!usePadding && children}
          </main>
          {appBars.footer && <Footer limitWidth={limitWidth} />}
        </>
      ) : (
        children
      )}
    </>
  );
};
export default NavigationWrapper;
