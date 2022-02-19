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
    NavBtnLink
} from './NavbarElements';

function Navbar(){

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
                            <NavBtnLink href="profile"> Profile </NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>

        </>
    );
}

export default Navbar;
