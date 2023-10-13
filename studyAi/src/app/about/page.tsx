import Hero from "./components/Hero";
import Video from "./components/Video";
import Team from "./components/Team"
import Process from "./components/Process";
import ExamPrep from "./components/ExamPrep";
export default function AboutPage() {
    return (
    <>
        {/* <Navbar/> */}
            <Hero/>
            <Video/>
            <Team/>
            <Process/>
            <ExamPrep/>
        {/* <Footer/> */}
    </>
    )
}