import { Footer } from "./footer";
import Navbar from "./navbar";

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
    <div>
      {appBars ? (
        <>
          {appBars.navbar && <Navbar />}
          {children}
          {appBars.footer && <Footer />}
        </>
      ) : (
        children
      )}
    </div>
  );
};
export default NavigationWrapper;
