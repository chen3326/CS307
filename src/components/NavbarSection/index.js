import React from 'react';
import LogoPhoto from '../../images/Boiler Breakouts-logos.jpeg';

import {
    Nav,
    NavbarContainer,
    NavItem,
    NavLinks,
    NavLogo,
    NavMenu,
    NavBtn,
    NavBtnLink, NavBtnLinkR
} from './NavbarElements';
import {auth, useAuth} from "../../firebase";
import {


    Link
} from "react-router-dom";

function Navbar(){
    const currentUser = useAuth();
    const email = currentUser?.email;

    return (
        <>
                <Nav >
                    <NavbarContainer>
                        <img src = {LogoPhoto} alt=''/>
                        <NavLogo>
                            Boiler Breakouts
                        </NavLogo>
                        <NavMenu>
                            <NavBtnLink href="home" > Homepage </NavBtnLink>
                        </NavMenu>
                        <NavBtn>
                            <NavBtnLink href="settings" > Settings </NavBtnLink>
                        </NavBtn>
                        <NavBtn>
                            <NavBtnLink href=""> Notifications</NavBtnLink>
                        </NavBtn>
                        <NavBtn>
                            <NavBtnLinkR
                                to={{
                                    pathname: "/profile",
                                    state: email

                                    // your data array of objects
                                }}
                            > profile </NavBtnLinkR>

                        </NavBtn>

                        <NavBtn style={{marginRight: '-300px'}}>
                            <NavBtnLink href="\"> Log out </NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>

        </>
    );
}

export default Navbar;
