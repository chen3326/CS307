import HeroSection from '../components/HeroSection';
import AboutSection from "../components/AboutSection";
import NavSection from "../components/NavbarSection";
import SidebarSection from "../components/SidebarSection";
import PostSection from "../components/PostSection";

document.querySelector('meta[name="theme-color"]').setAttribute('content', '#232323');

function Home() {

    return (
        <>
            <SidebarSection/>
            <NavSection/>
            <HeroSection/>
            <AboutSection/>
            <PostSection/>


        </>
    );
}

export default Home;
