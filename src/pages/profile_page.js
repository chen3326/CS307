import ProfileSection from "../components/ProfileSection";
import SidebarSection from "../components/SidebarSection";
import NavSection from "../components/NavbarSection";
import BottomNavbarSection from "../components/BottomNavbarSection/BottomNavbarSection";
import * as React from "react";

document.querySelector('meta[name="theme-color"]').setAttribute('content', '#232323');

function Profile() {

    return (
        <>


            <SidebarSection/>
            <NavSection/>
            <ProfileSection/>
            <BottomNavbarSection/>


        </>
    );
}

export default Profile;
