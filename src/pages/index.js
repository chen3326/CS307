import HeroSection from '../components/HeroSection';

import NavSection from "../components/NavbarSection";
import SidebarSection from "../components/SidebarSection";
import PostSection from "../components/MakePostSection";
import PostDisplaySection from "../components/PostDisplaySection";
import MakePost from "../components/MakePostSection";



function Home() {

    return (
        <>
            <SidebarSection/>
            <NavSection/>

            <HeroSection/>
            <PostDisplaySection/>

            <MakePost/>

        </>
    );
}

export default Home;
