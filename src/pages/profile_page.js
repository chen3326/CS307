// import HeroSection from '../components/HeroSection';
// import AboutSection from "../components/AboutSection";
import ProfileSection from "../components/ProfileSection";
import SidebarSection from "../components/SidebarSection";
import NavSection from "../components/NavbarSection";

document.querySelector('meta[name="theme-color"]').setAttribute('content', '#232323');

function Profile() {

    return (
        <>


            <SidebarSection/>
            <NavSection/>
            <ProfileSection/>


        </>
    );
}

export default Profile;
