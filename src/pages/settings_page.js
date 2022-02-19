import SettingsSection from "../components/SettingsSection";

document.querySelector('meta[name="theme-color"]').setAttribute('content', '#232323');

function Settings() {

    return (
        <>

            <SettingsSection/>

        </>
    );
}

export default Settings;
