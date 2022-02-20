import React from 'react';
import {
    HeroContainer, HeroContent,
    HeroSLogo,
} from './HeroElements';
import logo from '../../images/Boiler Breakouts-logos.jpeg';
import {auth, useAuth} from "../../firebase";


function HeroSection() {

    const currentUser = useAuth();

    return (
        <HeroContainer id='home'>


            <HeroContent>
                <div>Currently logged in as: { currentUser?.email } </div>

                <HeroSLogo src={logo}/>

            </HeroContent>





        </HeroContainer>
    );
}

export default HeroSection;
