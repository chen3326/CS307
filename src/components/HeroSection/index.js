import React from 'react';
import {
    HeroContainer, HeroContent,
    HeroSLogo, HeroContainer2,HeroH1_2,
} from './HeroElements';
import logo from '../../images/Boiler Breakouts-logos.jpeg';
import {useAuth} from "../../firebase";

import {useTheme, ThemeProvider, createTheme} from "@mui/material/styles";

function HeroSection() {

    const currentUser = useAuth();
    const email = currentUser?.email;
    const darkThemeApp = createTheme( {
        palette: {
            mode:'dark',
        },
    });
    return (
        <ThemeProvider theme={darkThemeApp}>
            <HeroContainer id='home'>


                <HeroContent>
                    <div>Currently logged in as: { email  } </div>

                    <HeroSLogo src={logo}/>

                </HeroContent>
            </HeroContainer>
        </ThemeProvider>



    );
}

export default HeroSection;
