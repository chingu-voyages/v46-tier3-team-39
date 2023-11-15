import NavigationWrapper from "../app/util/components/navigation/navigationWrapper";
import Hero from "../app/about/components/Hero";
import Video from "../app/about/components/Video";
import Team from "../app/about/components/Team";
import Process from "../app/about/components/Process";
import ExamPrep from "../app/about/components/ExamPrep";

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