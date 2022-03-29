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
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase";


function Navbar(){
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
        return (
            <>
                <Nav >
                    <NavbarContainer>

                        <img src = {LogoPhoto} alt=''/>
                        <NavLogo>
                            Boiler Breakouts
                        </NavLogo>
                        {/*<NavMenu>*/}
                        {/*    <NavBtnLink href="home" > Homepage </NavBtnLink>*/}
                        {/*</NavMenu>*/}
                        <NavBtn>
                            <NavBtnLink href="settings" > Settings </NavBtnLink>
                        </NavBtn>
                        {/*<NavBtn>*/}
                        {/*    <NavBtnLink href=""> Notifications</NavBtnLink>*/}
                        {/*</NavBtn>*/}
                        <NavBtn>
                            <NavBtnLinkR
                                to={{
                                    pathname: `/profile/${auth.currentUser.uid}`,


                                    // your data array of objects
                                }}
                            > profile
                            </NavBtnLinkR>

                        </NavBtn>

                        <NavBtn style={{marginRight: '-200px'}} >
                            <NavBtnLink href="\"> Log out </NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>

            </>
        );

    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }




}

export default Navbar;
