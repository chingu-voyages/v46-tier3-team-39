import GreetingBanner from "../client/greetingBanner";

const GreetingBannerContainer = () => {
  try {
    return (
      <div className="flex w-full">
        <GreetingBanner />
      </div>
    );
  } catch (err: any) {
    console.error(err?.networkError?.result);
    return <></>;
  }
};

export default GreetingBannerContainer;