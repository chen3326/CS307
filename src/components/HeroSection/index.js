import React, {useEffect, useState} from 'react';
import {
    HeroContainer, HeroContent,
    HeroSLogo, HeroContainer2,HeroH1_2,
} from './HeroElements';
import logo from '../../images/Boiler Breakouts-logos.jpeg';
import {auth, database, useAuth} from "../../firebase";

import {useTheme, ThemeProvider, createTheme} from "@mui/material/styles";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

function HeroSection() {

    //const currentUser = useAuth();
    //const email = currentUser?.email;
    const [email, setEmail] = useState("");
    const [queried, setQueried] = useState(false); //lock
    const darkThemeApp = createTheme( {
        palette: {
            mode:'dark',
        },
    });

    //const usersForCheckThemeCollectionRef = collection(database, "users");

    const [themeModeForCheckTheme, setThemeModeForCheckTheme] = useState(false);
    const [themeEmail, setThemeEmail] = useState("");
    //setEmailForCheckTheme(getAuth().currentUser.email);
    //const UsersRef = collection(database, "users");

    async function getUserTheme(){
        //compare email to other users in collection
        const q = query(collection(database, "users"), where("email", "==", themeEmail));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setThemeModeForCheckTheme(doc.data().author.darkTheme);
            });
        });
    }

    const [user, buffering, error] = useAuthState(auth);

    if (buffering) {
        return (
            <h1 style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                Loading...
            </h1>
        );
    } else if (user) {
        //get current user's email and settings data
        onAuthStateChanged(auth, (user) => {
            if (user&&!queried) {
                setThemeEmail(user.email); //sets user's email to email
                getUserTheme();
                setQueried(true); //stops overwriting var from firebase backend
            }
        });

        //DISPLAY
        if (!themeModeForCheckTheme) {
            return (
                <ThemeProvider theme={darkThemeApp}>
                    <HeroContainer id='home'>


                        <HeroContent>
                            <div>Currently logged in as: {themeEmail} </div>
                            {themeModeForCheckTheme ? (
                                <div> the choice about darkTheme is true (dark) </div>
                            ) : (
                                <div> the choice about darkTheme is false (light) </div>
                            )
                            }

                            <HeroSLogo src={logo}/>

                        </HeroContent>
                    </HeroContainer>
                </ThemeProvider>
            );
        } else {
            return (
                <ThemeProvider theme={darkThemeApp}>
                    <HeroContainer2 id='home'>


                        <HeroContent>
                            <HeroH1_2>Currently logged in as: {themeEmail} </HeroH1_2>
                            {themeModeForCheckTheme ? (
                                <HeroH1_2> the choice about darkTheme is true (dark) </HeroH1_2>
                            ) : (
                                <HeroH1_2> the choice about darkTheme is false (light) </HeroH1_2>
                            )
                            }

                            <HeroSLogo src={logo}/>

                        </HeroContent>
                    </HeroContainer2>
                </ThemeProvider>
            )
        }

    } else if (error) {
        alert("There was an authentication error.")
        window.location.pathname = "/"
        //return <div>There was an authentication error.</div>;
    } else {
        window.location.pathname = "/"
    }


}

export default HeroSection;
