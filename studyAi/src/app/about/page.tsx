import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import Hero from "./components/Hero";
import Video from "./components/Video";
import Team from "./components/Team"
import Process from "./components/Process";
import ExamPrep from "./components/ExamPrep";

export default function AboutPage() {
    return (
        <div className="bg-White">
            <NavigationWrapper
                appBars={{
                    navbar: true,
                    footer: true,
                }}
            >
                <Hero/>
                <Video/>
                <Team/>
                <Process/>
                <ExamPrep/>
            </NavigationWrapper>
        </div>
    )
}