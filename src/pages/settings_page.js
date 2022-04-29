import SettingsSection from "../components/SettingsSection";
import SidebarSection from "../components/SidebarSection";
import NavSection from "../components/NavbarSection";
import BottomNavbarSection from "../components/BottomNavbarSection/BottomNavbarSection";
import * as React from "react";

document.querySelector('meta[name="theme-color"]').setAttribute('content', '#232323');

function Settings() {

    return (
        <>


            {/*<SidebarSection/>*/}
            <NavSection/>
            <SettingsSection/>
            <BottomNavbarSection/>


        </>
    );
}

export default Settings;
