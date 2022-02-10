import HeroSection from '../components/HeroSection';
import AboutSection from "../components/AboutSection";
import NavSection from "../components/NavbarSection";

document.querySelector('meta[name="theme-color"]').setAttribute('content', '#232323');

function Home() {

    return (
        <>

            <NavSection/>


            <HeroSection/>
            <AboutSection/>


        </>
    );
}

export default Home;
