import React from 'react';
import {
    HeroContainer, HeroContent,
    HeroSLogo,
} from './HeroElements';
import logo from '../../images/Boiler Breakouts-logos.jpeg';


function HeroSection() {


    return (
        <HeroContainer id='home'>


            <HeroContent>

                <HeroSLogo src={logo}/>

            </HeroContent>





        </HeroContainer>
    );
}

export default HeroSection;
