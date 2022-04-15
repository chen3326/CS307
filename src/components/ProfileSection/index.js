import React from 'react';
import {
    AppBar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    useTheme,
    Grid,
    Tabs,
    Tab,
    Typography,
} from "@mui/material";

import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import PropTypes from 'prop-types';
import OnePost from "../PostDisplaySection/Post";

import {
    FollowButton,
    ProfileContainer, ProfileContainerBlack,
    ProfilePic, TabCard, UserName, UserNameBlack, UserStats,
} from './ProfileElements';

import pic from "../../images/cat_pic.jpg";

import {
    collection,
    onSnapshot,
    query,
    orderBy,

    doc, deleteDoc, updateDoc, arrayRemove, arrayUnion, setDoc, where,

} from "firebase/firestore";
import {auth, database} from "../../firebase";

import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

import {getAuth, onAuthStateChanged} from "firebase/auth";


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
                <Box sx={{p: 3}}>
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function FullWidthTabs() {
    const [user, loading, error] = useAuthState(auth);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const {profile_uid} = useParams();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [likedPosts, setLikedPosts] = useState([]);
    const [commentedPosts, setCommentedPosts] = useState([]);

    const [postLists1, setPostList1] = useState([]);
    const postsCollectionRef = collection(database, "posts");

    useEffect(() => {
        onSnapshot(query(postsCollectionRef, orderBy('timestamp', 'desc')), snapshot => {
            setPostList1(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })
    });

    useEffect(() => {
        if (user) {
            onSnapshot(doc(database, "users", profile_uid), (snapshot) =>
                setCommentedPosts(snapshot.data().commentedPosts)
            )
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            onSnapshot(doc(database, "users", profile_uid), (snapshot) =>
                setLikedPosts(snapshot.data().likedPosts)
            )
        }
    }, [user]);

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
                            {/*<Tab label="Saved" {...a11yProps(2)} />*/}
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
                    {/*
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <TabCard>
                            <OutlinedCard/>
                        </TabCard>
                    </TabPanel>
                    */}
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
                        <Tab label="Posts" {...a11yProps(0)} />
                        <Tab label="Liked" {...a11yProps(1)} />
                        {/*<Tab label="Saved" {...a11yProps(2)} />*/}
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
                {/*<TabPanel value={value} index={2} dir={theme.direction}>
                    <TabCard>
                        <OutlinedCard/>
                    </TabCard>
                </TabPanel>*/}
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
        }
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }

}

const card = (
    <React.Fragment>
        <CardContent>

            <Typography variant="h6" component="div">
                Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </Typography>
        </CardContent>
        <CardActions>
            <Container>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center">
                    <ThumbUpAltRoundedIcon/>
                    <TextsmsRoundedIcon/>
                </Grid>
            </Container>
            <Container>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center">
                    <BookmarkRoundedIcon/>
                </Grid>
            </Container>
        </CardActions>
    </React.Fragment>
);


function OutlinedCard() {
    return (
        <Box sx={{minWidth: 275}}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}


function ProfileSection() {

    const [email, setEmail] = useState(""); //email for user auth
    const [nickName, setnickName] = useState("");
    const [major, setMajor] = useState("");
    const [age, setAge] = useState(0)
    const [year, setYear] = useState(0);
    const [bio, setBio] = useState("");
    const [profilePic, setProfilePic] = useState("");

    const [user, loading, error] = useAuthState(auth);
    const {profile_uid} = useParams();
    const [hasFollowed, setHasFollowed] = useState(false);
    const [profileUser, setProfileUser] = useState("");
    const [profile_following, setProfile_following] = useState([]);
    const [topics_following, setTopics_following] = useState([]);
    const [me_following, setMe_following] = useState([]);

    const [themeModeForCheckTheme, setThemeModeForCheckTheme] = useState(false);
    const [themeEmail, setThemeEmail] = useState("");
    const [queriedTheme, setQueriedTheme] = useState(false);

    async function getUserTheme(){
        const q = query(collection(database, "users"), where("email", "==", themeEmail));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setThemeModeForCheckTheme(doc.data().author.darkTheme);
                setnickName(doc.data().author.nickName);
                setBio(doc.data().author.bio);
                setAge(doc.data().author.age);
                setMajor(doc.data().author.major)
                setYear(doc.data().author.year);
                setProfilePic(doc.data().author.profilePic);
            });
        });
    }

    async function handleProfClick(id) {
        window.location = `/profile/${id}`;
    }


    useEffect(() => {
        if (user) {
            onSnapshot(doc(database, "users", profile_uid), (snapshot) =>

                setTopics_following(snapshot.data().followingTopics),
            )
        }
    }, [user]);


    useEffect(() => {
        if (user) {
            onSnapshot(doc(database, "users", profile_uid), (snapshot) =>

                setProfile_following(snapshot.data().following),
            )
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            onSnapshot(doc(database, "users", user.uid), (snapshot) =>

                setMe_following(snapshot.data().following),
            )
        }
    }, [user]);


    useEffect(() => {
        if (user) {
            setHasFollowed(
                JSON.stringify(me_following).includes(profile_uid)
            )
        }
    }, [user, me_following, profileUser]);


    const followUser = async () => {

        if (hasFollowed) {

            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                following: arrayRemove({email: profileUser, id: profile_uid})
            });
        } else {
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                following: arrayUnion({email: profileUser, id: profile_uid})
            });

        }

    };

    useEffect(() => {
        if (user) {
            onSnapshot(doc(database, "users", profile_uid), (snapshot) =>
                setProfileUser(snapshot.data().email)
            )
        }
    }, [user, profileUser]);


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
            //Light Mode
            <ProfileContainer style={{padding: '80px'}}>
                <Container fixed>

                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={2}
                    >

                        <Grid
                            // LHS Column
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="center"
                            item xs={4}
                        >
                            <ProfilePic src={profilePic}/>


                        </Grid>

                        <Grid
                            // RHS Column
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="stretch"
                            item xs={8}

                        >

                            <Grid
                                // Name and Follow Button
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                            >
                                <UserName>{profileUser}</UserName>


                                {profile_following.map((this_user) => {

                                    return (


                                        <Button onClick={() => handleProfClick(this_user.id)}>
                                            {this_user.email}
                                        </Button>


                                    )


                                })}

                                {topics_following.map((this_topic) => {

                                    return (


                                        <Link to={{
                                            pathname: "/inner_topic",
                                            state: this_topic.topicName,
                                            topicAuthor: this_topic.topicAuthor,
                                            // your data array of objects
                                        }}
                                        >
                                            {this_topic.topicName}
                                        </Link>


                                    )


                                })}


                                <Grid
                                    // Follow Button container
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                >

                                    <div>
                                        {hasFollowed ? (

                                            <FollowButton>
                                                <Button
                                                    container
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    // fullWidth={true}

                                                    variant="outlined"
                                                    onClick={followUser}>unfollow</Button>
                                            </FollowButton>

                                        ) : (

                                            <Button
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                                // fullWidth={true}

                                                variant="outlined"
                                                onClick={followUser}>follow</Button>

                                        )}
                                    </div>

                                </Grid>
                            </Grid>


                            <UserStats>
                                <Grid
                                    // User Stats
                                    container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    spacing={2}
                                >
                                    <Grid
                                        container
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        item xs={4}
                                    >

                                    </Grid>
                                    <Grid container
                                          direction="column"
                                          alignItems="center"
                                          justifyContent="center"
                                          item xs={4}
                                    >

                                    </Grid>
                                    <Grid container
                                          direction="column"
                                          alignItems="center"
                                          justifyContent="center"
                                          item xs={4}
                                    >

                                    </Grid>
                                </Grid>
                            </UserStats>


                            <FullWidthTabs/>

                        </Grid>
                    </Grid>
                </Container>
            </ProfileContainer>
        )
        } else {
            //DARK MODE
            return (
                <ProfileContainerBlack style={{padding: '100px'}}>
                    <Container fixed>

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-start"
                            spacing={2}
                        >

                            <Grid
                                // LHS Column
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="center"
                                item xs={4}
                            >
                                <ProfilePic src={profilePic}/>

                            </Grid>

                            <Grid
                                // RHS Column
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="stretch"
                                item xs={8}

                            >

                                <Grid
                                    // Name and Follow Button
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                >
                                    <UserNameBlack>{profileUser}</UserNameBlack>


                                    {profile_following.map((this_user) => {

                                        return (


                                            <Button onClick={() => handleProfClick(this_user.id)} style={{color:'lightblue'}}>
                                                {this_user.email}
                                            </Button>


                                        )


                                    })}

                                    {topics_following.map((this_topic) => {

                                        return (


                                            <Link to={{
                                                pathname: "/inner_topic",
                                                state: this_topic.topicName,
                                                topicAuthor: this_topic.topicAuthor,
                                                // your data array of objects
                                            }}
                                                  style={{color:'#F0E68C'}}
                                            >
                                                {this_topic.topicName}
                                            </Link>


                                        )


                                    })}


                                    <Grid
                                        // Follow Button container
                                        container
                                        direction="column"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                    >

                                        <div>
                                            {hasFollowed ? (

                                                <FollowButton>
                                                    <Button
                                                        container
                                                        direction="column"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        // fullWidth={true}

                                                        variant="outlined"
                                                        style={{color:'lightblue'}}
                                                        onClick={followUser}>unfollow</Button>
                                                </FollowButton>

                                            ) : (

                                                <Button
                                                    container
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    // fullWidth={true}

                                                    variant="outlined"
                                                    style={{color:'lightblue'}}
                                                    onClick={followUser}>follow</Button>

                                            )}
                                        </div>

                                    </Grid>
                                </Grid>


                                <UserStats>
                                    <Grid
                                        // User Stats
                                        container
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="center"
                                        spacing={2}
                                    >
                                        <Grid
                                            container
                                            direction="column"
                                            alignItems="center"
                                            justifyContent="center"
                                            item xs={4}
                                        >

                                        </Grid>
                                        <Grid container
                                              direction="column"
                                              alignItems="center"
                                              justifyContent="center"
                                              item xs={4}
                                        >

                                        </Grid>
                                        <Grid container
                                              direction="column"
                                              alignItems="center"
                                              justifyContent="center"
                                              item xs={4}
                                        >

                                        </Grid>
                                    </Grid>
                                </UserStats>


                                <FullWidthTabs/>

                            </Grid>
                        </Grid>
                    </Container>
                </ProfileContainerBlack>
            )
        }


    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }

}

export default ProfileSection;