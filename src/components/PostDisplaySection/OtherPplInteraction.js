import React from 'react';
import {
    AppBar,
    Box,
    useTheme,
    Grid,
    Container,
    Tabs,
    Tab,
    Typography,
} from "@mui/material";
import {CssBaseline,} from '@material-ui/core';
import {
    ProfileContainer, ProfileContainerBlack,
    ProfilePic, TabBox, TabCard, TabDiv, TabPanelBox
} from '../ProfileSection/ProfileElements';
import PropTypes from 'prop-types';
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    doc, where,
} from "firebase/firestore";

import {auth, database} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {PostDisplayContainer} from "./PostDisplayElements";
//import OnePost from "./Post";
import ActivityCard from "./ActivityAccounts";
import OnePost from "./Post";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <TabPanelBox>
                    {/*<TabPanelBox sx={{p: 0}}>*/}
                    {/*<Box sx={{p: 3}}>*/}
                    <Typography>{children}</Typography>
                </TabPanelBox>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

//tab display for showing user's posts and interactions
function FullWidthTabs() {
    const [user, loading, error] = useAuthState(auth);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const profile_uid = auth.currentUser.uid;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [postLists1, setPostList1] = useState([]);
    const postsCollectionRef = collection(database, "posts");

    useEffect(() => {
        onSnapshot(query(postsCollectionRef, orderBy('timestamp', 'desc')), snapshot => {
            setPostList1(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })
    });

    const [themeModeForCheckTheme, setThemeModeForCheckTheme] = useState(false);
    const [themeEmail, setThemeEmail] = useState("");
    const [queriedTheme, setQueriedTheme] = useState(false);

    async function getUserTheme(){
        const q = query(collection(database, "users"), where("email", "==", themeEmail));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setThemeModeForCheckTheme(doc.data().author.darkTheme);
            });
        });
    }

    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
        onAuthStateChanged(auth, (user) => {
            if (user&&!queriedTheme) {
                setThemeEmail(user.email); //sets user's email to email
                getUserTheme();
                setQueriedTheme(true); //stops overwriting var from firebase backend
            }
        });

        if (!themeModeForCheckTheme) {

            return (
                <TabBox>
                    <AppBar position="static" sx={{borderRadius: '10px'}}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Likes" {...a11yProps(0)} />
                            <Tab label="Saves" {...a11yProps(1)} />
                            <Tab label="Comments" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <TabCard class={"TabCard"}>
                            {postLists1.map((post) => {
                                return (
                                    <TabDiv class={"TabDiv"}>
                                        {post.author.id === profile_uid ? (
                                            <ActivityCard
                                                tabType={"likes"}
                                                postid={post?.id}
                                                title={post?.title}
                                                location = {post?.location}
                                                topic={post?.topic}
                                                topicAuthor={post?.topicAuthor?.email}
                                                postText={post?.postText}
                                                authorEmail={post?.author?.email}
                                                authorNickName={post?.author?.display?.nickName}
                                                authorProfilePic={post?.author?.display?.profilePic}
                                                imageUrl={post?.imageUrl}
                                                imageUrl2={post?.imageUrl2}
                                                imageUrl3={post?.imageUrl3}
                                                FileURl={post?.FileURl}
                                                timestamp={post?.timestamp}
                                                likes={post?.likes}
                                                authorid={post?.author?.id}
                                                allowComments={post?.allowComments}
                                            />
                                        ) : (
                                            <div/>

                                        )}
                                    </TabDiv>
                                )
                            })}
                        </TabCard>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <TabCard>
                            {postLists1.map((post) => {
                                return (
                                    <div>
                                        {post.author.id === profile_uid ? (
                                            <ActivityCard
                                                tabType={"savedby"}
                                                postid={post?.id}
                                                title={post?.title}
                                                location = {post?.location}
                                                topic={post?.topic}
                                                topicAuthor={post?.topicAuthor?.email}
                                                postText={post?.postText}
                                                authorEmail={post?.author?.email}
                                                authorNickName={post?.author?.display?.nickName}
                                                authorProfilePic={post?.author?.display?.profilePic}
                                                imageUrl={post?.imageUrl}
                                                imageUrl2={post?.imageUrl2}
                                                imageUrl3={post?.imageUrl3}
                                                FileURl={post?.FileURl}
                                                timestamp={post?.timestamp}
                                                likes={post?.likes}
                                                authorid={post?.author?.id}
                                                allowComments={post?.allowComments}
                                            />
                                        ) : (
                                            <div/>

                                        )}
                                    </div>
                                )
                            })}
                        </TabCard>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <TabCard>
                            {postLists1.map((post) => {
                                return (
                                    <div>
                                        {post.author.id === profile_uid ? (
                                            <ActivityCard
                                                tabType={"comments"}
                                                postid={post?.id}
                                                title={post?.title}
                                                location = {post?.location}
                                                topic={post?.topic}
                                                topicAuthor={post?.topicAuthor?.email}
                                                postText={post?.postText}
                                                authorEmail={post?.author?.email}
                                                authorNickName={post?.author?.display?.nickName}
                                                authorProfilePic={post?.author?.display?.profilePic}
                                                imageUrl={post?.imageUrl}
                                                imageUrl2={post?.imageUrl2}
                                                imageUrl3={post?.imageUrl3}
                                                FileURl={post?.FileURl}
                                                timestamp={post?.timestamp}
                                                likes={post?.likes}
                                                authorid={post?.author?.id}
                                                allowComments={post?.allowComments}
                                            />
                                        ) : (
                                            <div/>

                                        )}
                                    </div>
                                )
                            })}
                        </TabCard>
                    </TabPanel>
                </TabBox>
            );
        } else {
            // Dark mode
            return (
                <Box sx={{bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px'}}>
                    <AppBar position="static" sx={{borderRadius: '10px'}}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Likes" {...a11yProps(0)} />
                            <Tab label="Saves" {...a11yProps(1)} />
                            <Tab label="Comments" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <TabCard>
                            {postLists1.map((post) => {
                                return (
                                    <div>
                                        {post.author.id === profile_uid ? (
                                            <ActivityCard
                                                tabType={"likes"}
                                                postid={post?.id}
                                                title={post?.title}
                                                location = {post?.location}
                                                topic={post?.topic}
                                                topicAuthor={post?.topicAuthor?.email}
                                                postText={post?.postText}
                                                authorEmail={post?.author?.email}
                                                authorNickName={post?.author?.display?.nickName}
                                                authorProfilePic={post?.author?.display?.profilePic}
                                                imageUrl={post?.imageUrl}
                                                imageUrl2={post?.imageUrl2}
                                                imageUrl3={post?.imageUrl3}
                                                FileURl={post?.FileURl}
                                                timestamp={post?.timestamp}
                                                likes={post?.likes}
                                                authorid={post?.author?.id}
                                                allowComments={post?.allowComments}
                                            />
                                        ) : (
                                            <div/>

                                        )}
                                    </div>
                                )
                            })}
                        </TabCard>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <TabCard>
                            {postLists1.map((post) => {
                                return (
                                    <div>
                                        {post.author.id === profile_uid ? (
                                            <ActivityCard
                                                tabType={"savedby"}
                                                postid={post?.id}
                                                title={post?.title}
                                                location = {post?.location}
                                                topic={post?.topic}
                                                topicAuthor={post?.topicAuthor?.email}
                                                postText={post?.postText}
                                                authorEmail={post?.author?.email}
                                                authorNickName={post?.author?.display?.nickName}
                                                authorProfilePic={post?.author?.display?.profilePic}
                                                imageUrl={post?.imageUrl}
                                                imageUrl2={post?.imageUrl2}
                                                imageUrl3={post?.imageUrl3}
                                                FileURl={post?.FileURl}
                                                timestamp={post?.timestamp}
                                                likes={post?.likes}
                                                authorid={post?.author?.id}
                                                allowComments={post?.allowComments}
                                            />
                                        ) : (
                                            <div/>

                                        )}
                                    </div>
                                )
                            })}
                        </TabCard>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <TabCard>
                            {postLists1.map((post) => {
                                return (
                                    <div>

                                    </div>
                                )
                            })}
                        </TabCard>
                    </TabPanel>
                </Box>
            );
        }
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }
}

//shows all other users' interactions with the current user's posts (likes, saves, ?comments) all on one page
function OtherInteraction() {
    const [user, loading, error] = useAuthState(auth);
    const [queried, setQueried] = useState(false); //lock
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [themeModeForCheckTheme, setThemeModeForCheckTheme] = useState(false);
    const [themeEmail, setThemeEmail] = useState("");
    const [queriedTheme, setQueriedTheme] = useState(false);
    //const {profile_uid} = auth.currentUser.uid;
    const [profile_uid, setProfile_uid] = useState("");
    const [postLists1, setPostList1] = useState([]);
    const postsCollectionRef = collection(database, "posts");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getUserTheme(){
        const q = query(collection(database, "users"), where("email", "==", themeEmail));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setThemeModeForCheckTheme(doc.data().author.darkTheme);
            });
        });
    }

    //DISPLAY and LOADING
    if (loading) {
        return <div> Loading... </div>; //preloading
    } else if (user) {
        onAuthStateChanged(auth, (user) => {
            onAuthStateChanged(auth, (user) => {
                if (user&&!queried) {
                    setProfile_uid(auth.currentUser.uid);
                    setThemeEmail(user.email);
                    getUserTheme();
                    setQueriedTheme(true);
                    setQueried(true); //stops overwriting var from firebase backend
                }
            });
        });

        if (!themeModeForCheckTheme) {
            return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            spacing={2}
                        >

                            <h1>Activity</h1>
                            <div>
                                Here you can see all of the interaction on your posts from others all on one page!
                            </div>

                            {/*display tab pannels of likes, saves, and ?comments*/}
                            <FullWidthTabs/> {/*TAB PANNEL*/}
                        </Grid>

                    </Box>
                </Container>
            );
        }
        else {
            {/*DARKMODE*/}

        }


        //todo: find a cleaner way to implement darkmode w/o creating a whole new return

    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }
}

export default OtherInteraction;
