import IndvPost_display from "../components/PostDisplaySection/indv_post";
import SidebarSection from "../components/SidebarSection";
import NavSection from "../components/NavbarSection";
import BottomNavbarSection from "../components/BottomNavbarSection/BottomNavbarSection";
import * as React from "react";


function IndvPost_page() {

    return (
        <>
            <SidebarSection/>
            <NavSection/>
            <IndvPost_display/>
            <BottomNavbarSection/>

        </>
    );
}

export default IndvPost_page;
