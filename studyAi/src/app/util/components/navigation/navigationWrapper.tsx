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
