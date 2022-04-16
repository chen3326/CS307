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
import {
    FollowButton,
    ProfileContainer, ProfileContainerBlack,
    ProfilePic, TabCard, UserName, UserNameBlack, UserStats,
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
import {Link, useParams} from "react-router-dom";

import {getAuth, onAuthStateChanged} from "firebase/auth";
import {PostDisplayContainer} from "./PostDisplayElements";
//import OnePost from "./Post";
import ActivityCard from "./ActivityAccounts";



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

//shows all other users' interactions with the current user's posts (likes, saves, ?comments)
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

    useEffect(() => {
        onSnapshot(query(postsCollectionRef, orderBy('timestamp', 'desc')), snapshot => {
            setPostList1(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })
    });

    //DISPLAY
    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
        onAuthStateChanged(auth, (user) => {
            onAuthStateChanged(auth, (user) => {
                if (user&&!queried) {
                    setProfile_uid(auth.currentUser.uid);
                    console.log(profile_uid);

                    setThemeEmail(user.email);
                    getUserTheme();
                    setQueriedTheme(true);
                    setQueried(true); //stops overwriting var from firebase backend
                }
            });
        });

        return (
            <ProfileContainer style={{padding: '80px'}}>
                <Container fixed>
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

                        <PostDisplayContainer>
                            <Box sx={{bgcolor: 'orange', borderRadius: '10px', width: 700}}>
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
                                                            topic={post?.topic}
                                                            topicAuthor={post?.topicAuthor?.email}
                                                            postText={post?.postText}
                                                            authorEmail={post?.author?.email}
                                                            imageUrl={post?.imageUrl}
                                                            imageUrl2={post?.imageUrl2}
                                                            imageUrl3={post?.imageUrl3}
                                                            FileURl={post?.FileURl}
                                                            timestamp={post?.timestamp}
                                                            likes={post?.likes}
                                                            authorid={post?.author?.id}
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
                                                            topic={post?.topic}
                                                            topicAuthor={post?.topicAuthor?.email}
                                                            postText={post?.postText}
                                                            authorEmail={post?.author?.email}
                                                            imageUrl={post?.imageUrl}
                                                            imageUrl2={post?.imageUrl2}
                                                            imageUrl3={post?.imageUrl3}
                                                            FileURl={post?.FileURl}
                                                            timestamp={post?.timestamp}
                                                            likes={post?.likes}
                                                            authorid={post?.author?.id}
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
                                    <div>comments</div>
                                </TabPanel>
                            </Box>
                        </PostDisplayContainer>


                    </Grid>
                </Container>
            </ProfileContainer>
        );

        //todo: find a cleaner way to implement darkmode w/o creating a whole new return

    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }
}

export default OtherInteraction;
