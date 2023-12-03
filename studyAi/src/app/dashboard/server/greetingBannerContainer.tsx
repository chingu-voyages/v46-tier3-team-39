import GreetingBanner from "../client/greetingBanner";

const GreetingBannerContainer = () => {
  try {
    return (
        <GreetingBanner />
    );
  } catch (err: any) {
    console.error(err?.networkError?.result);
    return <></>;
  }
};

export default GreetingBannerContainer;