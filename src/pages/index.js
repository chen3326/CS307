import HeroSection from '../components/HeroSection';
import AboutSection from "../components/AboutSection";

document.querySelector('meta[name="theme-color"]').setAttribute('content', '#232323');

function Home() {

    return (
        <>


            <HeroSection/>
            <AboutSection/>


        </>
    );
}

export default Home;
