import React, {useState} from 'react';
import LogoPhoto from '../../images/Boiler Breakouts-logos.jpeg';


import {
    Nav,
    NavbarContainer,
    NavItem,
    NavLinks,
    NavLogo,
    NavMenu,
    NavBtn,
    NavBtnLink, NavBtnLinkR, NavDark
} from './NavbarElements';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, database} from "../../firebase";
import Button from "@material-ui/core/Button";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";


function Navbar(){
    const [user, loading, error] = useAuthState(auth);
    async function handelsettingsclick() {
        window.location = `/settings`;
    }

    async function handleProfClick() {
        window.location = `/profile/${user.uid}`;
    }

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

    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
        onAuthStateChanged(auth, (user) => {
            if (user&&!queriedTheme) {
                setThemeEmail(user.email); //sets user's email to email
                getUserTheme();
                setQueriedTheme(true); //stops overwriting var from firebase backend
            }
        });
        if (!themeModeForCheckTheme) {
            return (
                <>
                    <Nav>
                        <NavbarContainer>

                            <img src={LogoPhoto} alt=''/>
                            <NavLogo>
                                Boiler Breakouts
                            </NavLogo>

                            <NavBtn>
                                <Button onClick={handelsettingsclick} style={{color: 'white'}}> Settings </Button>
                            </NavBtn>

                            <NavBtn>
                                <Button onClick={handleProfClick} style={{color: 'white'}}
                                > profile
                                </Button>

                            </NavBtn>

                            <NavBtn style={{marginRight: '-200px'}}>
                                <NavBtnLink href="\"> Log out </NavBtnLink>
                            </NavBtn>
                        </NavbarContainer>
                    </Nav>

                </>
            );
        } else {
            return (
                <>
                    <NavDark>
                        <NavbarContainer>

                            <img src={LogoPhoto} alt=''/>
                            <NavLogo>
                                Boiler Breakouts
                            </NavLogo>

                            <NavBtn>
                                <Button onClick={handelsettingsclick} style={{color: 'white'}}> Settings </Button>
                            </NavBtn>

                            <NavBtn>
                                <Button onClick={handleProfClick} style={{color: 'white'}}
                                > profile
                                </Button>

                            </NavBtn>

                            <NavBtn style={{marginRight: '-200px'}}>
                                <NavBtnLink href="\"> Log out </NavBtnLink>
                            </NavBtn>
                        </NavbarContainer>
                    </NavDark>

                </>
            );
        }

    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }




}

export default Navbar;
