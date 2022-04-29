import SavedPost_display from "../components/PostDisplaySection/saved_post";
import SidebarSection from "../components/SidebarSection";
import NavSection from "../components/NavbarSection";
import BottomNavbarSection from "../components/BottomNavbarSection/BottomNavbarSection";
import * as React from "react";


function SavedPost_page() {

    return (
        <>
            <SidebarSection/>
            <NavSection/>
            <SavedPost_display/>
            <BottomNavbarSection/>

        </>
    );
}

export default SavedPost_page;
