import React, {useEffect, useState} from 'react';
import {
    HeroContainer, HeroContent,
    HeroSLogo, HeroContainer2, HeroH1_2, HeroContainer2_sm,
} from './HeroElements';
import logo from '../../images/Boiler Breakouts-logos.jpeg';
import logoDark from '../../images/Boiler Breakouts-logos_transparent.png';
import {auth, database, useAuth} from "../../firebase";

//import {useTheme, ThemeProvider, createTheme} from "@mui/material/styles";
import {collection, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import OnePost from "../PostDisplaySection/Post";
import {
    Link
} from "react-router-dom";
import {NewLine, PostDisplayContainer} from "../PostDisplaySection/PostDisplayElements";
import Button from "@material-ui/core/Button";
import PostDisplaySection from "../PostDisplaySection";
import TimelineSection from "../PostDisplaySection/timeline";





function HeroSection() {

    //const currentUser = useAuth();
    //const email = currentUser?.email;


    const [themeModeForCheckTheme, setThemeModeForCheckTheme] = useState(false);
    const [themeEmail, setThemeEmail] = useState("");
    const [queriedTheme, setQueriedTheme] = useState(false);
    const [postLists1, setPostList1] = useState([]);
    const postsCollectionRef = collection(database, "posts");
    const topics = [];
    const justTopics = [];

    const [allposts, setAllposts] = useState(false); //choose what posts you want to see
    const setdisplaymode = async () => {
        setAllposts(!allposts)
    };

    useEffect(() => {
        onSnapshot(query(postsCollectionRef, orderBy('timestamp', 'desc')), snapshot => {
            setPostList1(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })
    });
    postLists1.map((post) => {
        if (!justTopics.includes(post.topic) && post.topic !== "") {
            topics.push([post.topic, post.topicAuthor]);
            justTopics.push(post.topic);
        }
    })
    async function getUserTheme(){
        const q = query(collection(database, "users"), where("email", "==", themeEmail));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setThemeModeForCheckTheme(doc.data().author.darkTheme);
            });
        });
    }

    const [user, buffering, error] = useAuthState(auth);
    const [emailVerified, setEmailVerified] = useState(false);
    useEffect(() => {
        if (user) {
            setEmailVerified(user.emailVerified);
        }
    });
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
            if (user&&!queriedTheme) {
                setThemeEmail(user.email); //sets user's email to email
                getUserTheme();
                setQueriedTheme(true); //stops overwriting var from firebase backend
            }
        });

        //DISPLAY
        if (!themeModeForCheckTheme) {
            return (

                //<ThemeProvider theme={darkThemeApp}>
                <div>
                    <HeroContainer id='home'>

                            <HeroContent>
                                <div>Currently logged in as: {themeEmail} </div>
                                {themeModeForCheckTheme ? (
                                    <div> the choice about darkTheme is true (dark) </div>
                                ) : (
                                    <div> the choice about darkTheme is false (light) </div>
                                )
                                }
                                {emailVerified ? (
                                    <div> The current user is Verified </div>
                                ) : (
                                    <div> The current user is Not Verified </div>
                                )
                                }

                                <HeroSLogo src={logo}/>
                            </HeroContent>
                    </HeroContainer>
                    <div align={"center"}>
                        <h1 align={"Center"}> Topics On Boiler Breakout: </h1>
                        {topics.map((topic) => {
                            return (
                                <div>
                                    <NewLine>
                                        <Link to={{
                                            pathname: "/inner_topic",
                                            state: topic[0],
                                            topicAuthor: topic[1],
                                            // your data array of objects
                                        }}
                                        >
                                            {topic[0]}
                                        </Link>
                                    </NewLine>
                                </div>
                            )
                        })}
                    </div>
                </div>
                //</ThemeProvider>
            );
        } else {
            return (
                <div>
                    <HeroContainer2 id='home'>
                        <HeroContent>
                            <HeroH1_2> </HeroH1_2>
                            <HeroH1_2>Currently logged in as: {themeEmail} </HeroH1_2>
                            {themeModeForCheckTheme ? (
                                <HeroH1_2> the choice about darkTheme is true (dark) </HeroH1_2>
                            ) : (
                                <HeroH1_2> the choice about darkTheme is false (light) </HeroH1_2>
                            )
                            }
                            {emailVerified ? (
                                <HeroH1_2> The current user is Verified </HeroH1_2>
                            ) : (
                                <HeroH1_2> The current user is Not Verified </HeroH1_2>
                            )
                            }

                            <HeroSLogo src={logoDark}/>

                        </HeroContent>
                    </HeroContainer2>
                    <HeroContainer2>
                        <div align={"center"}>
                            <HeroH1_2> Topics On Boiler Breakout: </HeroH1_2>
                            {topics.map((topic) => {
                                return (
                                    <div>
                                        <NewLine>
                                            <Link to={{
                                                pathname: "/inner_topic",
                                                state: topic[0],
                                                topicAuthor: topic[1],
                                                // your data array of objects
                                            }}
                                            >
                                                {topic[0]}
                                            </Link>
                                        </NewLine>
                                    </div>
                                )
                            })}
                        </div>
                    </HeroContainer2>

                    <div>
                        <PostDisplayContainer>

                            {allposts ? (
                                <Button
                                    variant="outlined"
                                    onClick={setdisplaymode} href="">
                                    <div> displaying all the posts</div>
                                </Button>
                            ) : (
                                <Button
                                    variant="outlined"
                                    onClick={setdisplaymode} href="">
                                    <div> displaying posts in the timeline</div>
                                </Button>
                            )}

                        </PostDisplayContainer>

                        {allposts ? (
                            <PostDisplaySection/>
                        ) : (
                            <TimelineSection/>
                        )}
                    </div>
                </div>
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
