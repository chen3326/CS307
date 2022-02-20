import React from 'react';
import {
    HeroContainer, HeroContent,
    HeroSLogo,
} from './HeroElements';
import logo from '../../images/Boiler Breakouts-logos.jpeg';
import {auth} from "../../firebase";


function HeroSection() {
    const email = auth.currentUser.email


    return (
        <HeroContainer id='home'>


            <HeroContent>
                {/*<div> Hello!  { email}</div>*/}

                <HeroSLogo src={logo}/>

            </HeroContent>





        </HeroContainer>
    );
}

export default HeroSection;
