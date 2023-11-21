import GreetingBanner from "./greetingBanner";

const GreetingBannerContainer = async () => {
  try {
    return (
      <div className="flex w-full border-2 border-blue-500">
        <GreetingBanner />
      </div>
    );
  } catch (err: any) {
    console.error(err?.networkError?.result);
    return <></>;
  }
};

export default GreetingBannerContainer;
