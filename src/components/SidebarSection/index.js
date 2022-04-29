import React, {useState} from 'react';
import {
    Side,
    SidebarContainer,
    SideItem,
    SideLinks,
    SideLogo,
    SideMenu,
    SideBtn,
    SideBtnLink, SideDark
} from './SidebarElements';

import HomeIcon from '@mui/icons-material/Home';
import SavedIcon from '@mui/icons-material/BookmarkAdded';
import ContactsIcon from '@mui/icons-material/Contacts';import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {auth, database} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {onAuthStateChanged} from "firebase/auth";

function Sidebar(){

    const [themeModeForCheckTheme, setThemeModeForCheckTheme] = useState(false);
    const [themeEmail, setThemeEmail] = useState("");
    const [queriedTheme, setQueriedTheme] = useState(false);

    async function getUserTheme(){
        const q = query(collection(database, "users"), where("email", "==", themeEmail));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setThemeModeForCheckTheme(doc.data().author.darkTheme);
            });
        });
    }

    const [user, buffering, error] = useAuthState(auth);
    if (buffering) {
        return (
            <h1 style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                Loading...
            </h1>
        );
    } else if (user) {
        //get current user's email and settings data
        onAuthStateChanged(auth, (user) => {
            if (user && !queriedTheme) {
                setThemeEmail(user.email); //sets user's email to email
                getUserTheme();
                setQueriedTheme(true); //stops overwriting var from firebase backend
            }
        });

        //DISPLAY
        if (!themeModeForCheckTheme) {

            return (
                <>
                    <Side>
                        <SidebarContainer>
                            <SideLogo>
                            </SideLogo>
                            <SideBtn>
                                <SideBtnLink href="/home"> <HomeIcon/></SideBtnLink>
                            </SideBtn>
                            <SideBtn>
                                <SideBtnLink href="/saved"> <SavedIcon/></SideBtnLink>
                            </SideBtn>
                            <SideBtn>
                                <SideBtnLink href="/interactions"> <ContactsIcon/></SideBtnLink>
                            </SideBtn>

                        </SidebarContainer>
                    </Side>

                </>
            );
        } else {
            return (
                <>
                    <SideDark>
                        <SidebarContainer>
                            <SideLogo>
                            </SideLogo>
                            <SideBtn>
                                <SideBtnLink href="/home"> <HomeIcon/></SideBtnLink>
                            </SideBtn>
                            <SideBtn>
                                <SideBtnLink href="/saved"> <SavedIcon/></SideBtnLink>
                            </SideBtn>
                            <SideBtn>
                                <SideBtnLink href="/interactions"> <ContactsIcon/></SideBtnLink>
                            </SideBtn>

                        </SidebarContainer>
                    </SideDark>

                </>
            );
        }
    } else if (error) {
        alert("There was an authentication error.")
        window.location.pathname = "/"
        //return <div>There was an authentication error.</div>;
    } else {
        window.location.pathname = "/"
    }
}

export default Sidebar;
