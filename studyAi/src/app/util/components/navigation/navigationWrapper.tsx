import { Footer } from "./server/footer";
import Navbar from "./client/navbar";
const NavigationWrapper = ({
  children,
  appBars,
  usePadding = false,
}: {
  children: React.ReactNode;
  usePadding?: boolean;
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
            className={`bg-White flex flex-col h-full w-full text-Black ${
              usePadding ? "px-[3%] md:px-[5%] items-center" : ""
            }`}
            style={{
              minHeight: `calc(100vh - ${appBars.navbar ? "3.5rem" : "0px"})`,
            }}
          >
            {usePadding && (
              <div className="flex flex-col grow w-full max-w-screen-xl pt-8 h-full">
                {children}
              </div>
            )}
            {!usePadding && children}
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
