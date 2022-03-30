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
import Button from "@material-ui/core/Button";


function Navbar(){
    const [user, loading, error] = useAuthState(auth);
    async function handelsettingsclick() {
        window.location = `/settings`;
    }

    async function handleProfClick() {
        window.location = `/profile/${user.uid}`;
    }

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

                        <NavBtn>
                            <Button onClick={handelsettingsclick} style={{color:'white'}}  > Settings </Button>
                        </NavBtn>

                        <NavBtn>
                            <Button onClick={handleProfClick} style={{color:'white'}}
                            > profile
                            </Button>

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
