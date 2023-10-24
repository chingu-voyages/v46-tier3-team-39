import NavigationWrapper from "../util/components/navigation/navigationWrapper";

export default function GeneratePage() {
    return (
        <div className="bg-White">
            <NavigationWrapper
                appBars={{
                    navbar: true,
                    footer: true,
                }}
            >
            <Tabs/>
            </NavigationWrapper>
        </div>
    )
}