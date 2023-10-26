import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import Tabs from "./components/Tabs";
import Create from "./components/Create"
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
            <Create/>
            </NavigationWrapper>
        </div>
    )
}