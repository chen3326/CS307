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
} from './ProfileElements';
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


//shows all other users' interactions with the current user's posts (likes, saves, ?comments)
function OtherInteraction() {
    const [user, loading, error] = useAuthState(auth);
    const [queried, setQueried] = useState(false); //lock
    const [themeModeForCheckTheme, setThemeModeForCheckTheme] = useState(false);
    const [themeEmail, setThemeEmail] = useState("");
    const [queriedTheme, setQueriedTheme] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);

    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
        onAuthStateChanged(auth, (user) => {
            onAuthStateChanged(auth, (user) => {
                if (user&&!queried) {
                    setThemeEmail(user.email);
                    //getUserTheme();
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

                       <h1>People's Interaction</h1>
                        <div>
                            Here you can see all of the interaction on your posts from others all on one page!
                        </div>
                    </Grid>
                </Container>
            </ProfileContainer>
        );
        //todo: find a cleaner way to implement darkmode w/o creating a whole new return
        /*
        return (
            //LIGHT MODE FOR NOW

            <Box sx={{bgcolor: 'orange', borderRadius: '10px'}}>
                <AppBar position="static" sx={{borderRadius: '10px'}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Posts" {...a11yProps(0)} />
                        <Tab label="Liked" {...a11yProps(1)} />
                        <Tab label="Comments" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <TabCard>
                        {postLists1.map((post) => {
                            return (
                                <div>
                                    {post.author.id === profile_uid ? (
                                        <OnePost
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
                                    {likedPosts.includes(post.id) ? (
                                        <OnePost
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
                    <TabCard>
                        {postLists1.map((post) => {
                            return (
                                <div>
                                    {commentedPosts.includes(post.id) ? (
                                        <OnePost
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
            </Box>
        );

             */
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }
}

export default OtherInteraction;
