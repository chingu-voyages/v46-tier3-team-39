import NavigationWrapper from "../../frontend/utils/components/navigation/navigationWrapper";
import Hero from "@/frontend/about/Hero";
import Video from "@/frontend/about/Video";
import Team from "@/frontend/about/Team";
import Process from "@/frontend/about/Process";
import ExamPrep from "@/frontend/about/ExamPrep";

export default function AboutPage() {
  return (
    <div className="bg-White">
      <NavigationWrapper
        appBars={{
          navbar: true,
          footer: true,
        }}
      >
        <Hero />
        <div id="video">
          <Video />
        </div>
        <Team />
        <Process />
        <ExamPrep />
      </NavigationWrapper>
    </div>
  );
}
