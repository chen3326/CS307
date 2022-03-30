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
    ProfileContainer,
    ProfilePic, TabCard, UserName, UserStats,
} from './ProfileElements';

import pic from "../../images/cat_pic.jpg";

import {
    collection,
    onSnapshot,
    query,
    orderBy,

    doc, deleteDoc, updateDoc, arrayRemove, arrayUnion, setDoc,

} from "firebase/firestore";
import {auth, database} from "../../firebase";

import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {getAuth} from "firebase/auth";


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

    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
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
                        <Tab label="Saved" {...a11yProps(2)} />
                        <Tab label="Comments" {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <TabCard>
                        {postLists1.map((post) => {
                            return (
                                <div>
                                    {post.author.id === user.uid ? (
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
                        <OutlinedCard/>
                    </TabCard>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
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


    const [user, loading, error] = useAuthState(auth);
    const {profile_uid} = useParams();
    const [hasFollowed, setHasFollowed] = useState(false);
    const [profileUser, setProfileUser] = useState("");
    const [profile_following, setProfile_following] = useState([]);
    const [me_following, setMe_following] = useState([]);
    const [userlist, SetUserlist] = useState([]);
    const [topicList, SetTopicList] = useState([]);
    async function handleProfClick(id) {
        window.location = `/profile/${id}`;
    }

    useEffect(() => {
         onSnapshot(query(collection(database, "users")), snapshot => {
            SetUserlist(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })


    });
    useEffect(() => {
        onSnapshot(query(collection(database, "topics")), snapshot => {
            SetTopicList(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })


    });


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
                me_following.includes(profileUser),
            )
        }
    }, [user, me_following, profileUser]);


    const followUser = async () => {

        if (hasFollowed) {

            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                following: arrayRemove(profileUser)
            });
        } else {
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                following: arrayUnion(profileUser)
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
        return (
            <ProfileContainer>
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
                            <ProfilePic src={pic}/>

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




                                    {userlist.map((this_user) => {
                                        if (profile_following.includes(this_user.email)){
                                            return (


                                                <Button onClick={() => handleProfClick(this_user.id)}>
                                                    {this_user.email}
                                                </Button>


                                            )
                                        }


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
        );
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }

}

export default ProfileSection;