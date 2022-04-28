import SettingsSection from "../components/SettingsSection";
import SidebarSection from "../components/SidebarSection";
import NavSection from "../components/NavbarSection";

document.querySelector('meta[name="theme-color"]').setAttribute('content', '#232323');

function Settings() {

    return (
        <>


            {/*<SidebarSection/>*/}
            <NavSection/>
            <SettingsSection/>


        </>
    );
}

export default Settings;
