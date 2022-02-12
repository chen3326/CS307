import React from 'react';


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
                        <NavLogo>
                            Boiler Breakouts
                        </NavLogo>
                        <NavMenu>
                            <NavItem>
                                <NavLinks
                                    to='aboutMe'
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact='true'
                                    offset={-80}
                                >
                                    About
                                </NavLinks>
                            </NavItem>

                        </NavMenu>
                        <NavBtn>
                            <NavBtnLink href=""> Settings </NavBtnLink>
                        </NavBtn>
                        <NavBtn>
                            <NavBtnLink href=""> Notifications</NavBtnLink>
                        </NavBtn>
                        <NavBtn>
                            <NavBtnLink href=""> Profile </NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>

        </>
    );
}

export default Navbar;
