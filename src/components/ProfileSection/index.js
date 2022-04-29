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
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import PropTypes from 'prop-types';
import OnePost from "../PostDisplaySection/Post";
import { green } from '@mui/material/colors';

import {
    FollowButton, NameStatusIconContainer,
    ProfileContainer, ProfileContainerBlack,
    ProfilePic, TabBox, TabCard, TabDiv, TabPanelBox, UserName, UserNameBlack, UserStats,
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
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import {Item} from "react-floating-button";
import {styled} from "@mui/material/styles";
import Badge from "@mui/material/Badge";

//props code from material ui
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
                            <Tab key={0} label="Posts" {...a11yProps(0)} />
                            <Tab key={1} label="Liked" {...a11yProps(1)} />
                            {/*<Tab label="Saved" {...a11yProps(2)} />*/}
                            <Tab key={2} label="Comments" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <TabCard class={"TabCard"}>
                            {postLists1.map((post) => {
                                return (
                                    <TabDiv key={post.id} class={"TabDiv"}>
                                        {post.author.id === profile_uid ? (
                                            <OnePost
                                                key={post.id}
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
                                    <TabDiv key={post.id} class={"TabDiv"}>
                                        {likedPosts.includes(post.id) ? (
                                            <OnePost
                                                key={post.id}
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
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <TabCard>
                            {postLists1.map((post) => {
                                return (
                                    <TabDiv key={post.id} class={"TabDiv"}>
                                        {commentedPosts.includes(post.id) ? (
                                            <OnePost
                                                key={post.id}
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
                                <TabDiv key={post.id} class={"TabDiv"}>
                                    {post.author.id === profile_uid ? (
                                        <OnePost
                                            key={post.id}
                                            postid={post?.id}
                                            title={post?.title}
                                            location = {post?.location}
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
                                <TabDiv key={post.id} class={"TabDiv"}>
                                    {likedPosts.includes(post.id) ? (
                                        <OnePost
                                            key={post.id}
                                            postid={post?.id}
                                            title={post?.title}
                                            location = {post?.location}
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
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <TabCard>
                        {postLists1.map((post) => {
                            return (
                                <TabDiv key={post.id} class={"TabDiv"}>
                                    {commentedPosts.includes(post.id) ? (
                                        <OnePost
                                            key={post.id}
                                            postid={post?.id}
                                            title={post?.title}
                                            location = {post?.location}
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
            </Box>
        );
        }
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }
}

function ProfileSection() {

    const [welcome, setWelcome] = useState("");
    const [email, setEmail] = useState(""); //email for user auth
    const [nickName, setnickName] = useState("");
    const [major, setMajor] = useState("");
    const [age, setAge] = useState(0)
    const [year, setYear] = useState(0);
    const [bio, setBio] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [privateProfile, setPrivateProfile] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const {profile_uid} = useParams();
    const [hasFollowed, setHasFollowed] = useState(false);
    const [hasBlocked, setHasBlocked] = useState(false);
    const [profileUser, setProfileUser] = useState("");
    const [profile_following, setProfile_following] = useState([]);
    const [profile_blocking, setProfile_blocking] = useState([]);
    const [topics_following, setTopics_following] = useState([]);
    const [me_following, setMe_following] = useState([]);
    const [topics_blocking, setTopics_blocking] = useState([]);
    const [me_blocking, setMe_blocking] = useState([]);

    const [themeModeForCheckTheme, setThemeModeForCheckTheme] = useState(false);
    const [themeEmail, setThemeEmail] = useState("");
    const [queriedTheme, setQueriedTheme] = useState(false);
    const [userOnlineStatus, setUserOnlineStatus] = useState(false);

    async function getUserTheme(){
        const q = query(collection(database, "users"), where("email", "==", themeEmail));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setThemeModeForCheckTheme(doc.data().author.darkTheme);
                // TODO: Do we really need this stuff? It might cause errors on this page...
                // setnickName(doc.data().author.nickName);
                // setBio(doc.data().author.bio);
                // setAge(doc.data().author.age);
                // setMajor(doc.data().author.major)
                // setYear(doc.data().author.year);
                // setProfilePic(doc.data().author.profilePic);
                // setPrivateProfile(doc.data().author.privateUser);
                // setUserOnlineStatus(doc.data().loggedIn);
            });
        });
    }

    async function getprivatemode(){
        //compare email to other users in collection
        const q = query(collection(database, "users"), where("email", "==", profileUser));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
             setPrivateProfile(doc.data().author.privateUser)
            });
        });
    }

    // async function getUserStatus(){
    //     //compare email to other users in collection
    //     const q = query(collection(database, "users"), where("email", "==", profileUser));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             setUserOnlineStatus(doc.data().loggedIn)
    //         });
    //     });
    // }

    async function handleProfClick(id) {
        window.location = `/profile/${id}`;
    }

    async function welcomeHome() {
        setWelcome(`Welcome ${auth.currentUser.email}`);
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
                setTopics_blocking(snapshot.data().blockingTopics),
            )
        }
    }, [user]);

    // TODO: what is the difference between these two?
    useEffect(() => {
        if (user) {
            onSnapshot(doc(database, "users", profile_uid), (snapshot) =>
                setProfile_following(snapshot.data().following),
            )
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            onSnapshot(doc(database, "users", profile_uid), (snapshot) =>
                setProfile_blocking(snapshot.data().blockingUsers),
            )
        }
    }, [user]);

    // TODO: what is the difference between these two?
    useEffect(() => {
        if (user) {
            onSnapshot(doc(database, "users", user.uid), (snapshot) =>
                setMe_following(snapshot.data().following),
            )
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            onSnapshot(doc(database, "users", user.uid), (snapshot) =>
                setMe_blocking(snapshot.data().blockingUsers),
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

    useEffect(() => {
        if (user) {
            setHasBlocked(
                JSON.stringify(me_blocking).includes(profile_uid)
            )
        }
    }, [user, me_blocking, profileUser]);


    const followUser = async () => {
        if (hasFollowed) {
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                following: arrayRemove({nickName: nickName, id: profile_uid})
            });
        } else {
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                following: arrayUnion({nickName: nickName, id: profile_uid})
            });
        }
    };

    const blockUser = async () => {
        if (hasBlocked) {
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                blockingUsers: arrayRemove({nickName: nickName, id: profile_uid})
            });
        } else {
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                blockingUsers: arrayUnion({nickName: nickName, id: profile_uid})
            });
        }
    };


    const StyledBadge = styled(Badge)(() => ({
        "& .MuiBadge-badge": {
            backgroundColor: "#44b700",
            color: "#44b700",
            width: 12,
            height: 12,
            borderRadius: "50%",
            // boxShadow: "0 0 0 2" ${theme.palette.background.paper}
        }
    }));

    function StatusBadgeOnline() {
        return (
            <StyledBadge
                disableRipple
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                sx={{
                    "& .MuiBadge-badge": {
                        backgroundColor: "#44b700",
                        color: "#44b700",
                    }
                }}
            >
            </StyledBadge>
        );
    }

    const StatusBadgeOffline = () => {
        return (
            <StyledBadge
                disableRipple
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                sx={{
                    "& .MuiBadge-badge": {
                    backgroundColor: '#8f8f8f',
                    color: '#8f8f8f',
                    }
                }}
            >
            </StyledBadge>
        );
    }

    useEffect(() => {
        if (user) {
            onSnapshot(doc(database, "users", profile_uid), (snapshot) => {
                setProfileUser(snapshot.data().email);
                setnickName(snapshot.data().author.nickName);
                setBio(snapshot.data().author.bio);
                setAge(snapshot.data().author.age);
                setMajor(snapshot.data().author.major);
                setYear(snapshot.data().author.year);
                setProfilePic(snapshot.data().author.profilePic);
                setUserOnlineStatus(snapshot.data().loggedIn);
                })
            if (user.email===profileUser) {
                welcomeHome();
                console.log("HOME");
            }
        }

    }, [user, profileUser]);

    // useEffect(() => {
    //     if (user) {
    //         onSnapshot(doc(database, "users", profile_uid), (snapshot) => {
    //             setUserOnlineStatus(snapshot.data().loggedIn);
    //         })
    //         getUserStatus();
    //     }
    // }, [profileUser]);


    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
        getprivatemode()
        // getUserStatus()
        if (user.email===profileUser || !privateProfile ){

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
                    <ProfileContainer>
                        <Container
                            fixed
                            sx={{
                                '@media screen and (max-width: 768px)': {
                                    padding: "0",
                                    marginY: "10px"
                                },
                            }}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={2}
                                sx={{
                                    '@media screen and (max-width: 768px)': {
                                        alignItems: "center",
                                        margin: "0",
                                        spacing: 0,
                                        width: "100%",
                                    },
                                }}
                            >
                                <Grid
                                    // LHS Column
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    xs={12} sm={4}
                                >
                                    {/*profile section*/}
                                    <Stack direction="column"
                                           justifyContent="center"
                                           alignItems="flex-start"
                                           spacing={2}
                                    >
                                        <ProfilePic src={profilePic}/>
                                        <div>
                                            {welcome}
                                        </div>

                                        <div>Bio: {bio}</div>
                                        <div>Age: {age}</div>
                                        <div>Year: {year}</div>
                                        <div>Major: {major}</div>
                                    </Stack>
                                </Grid>
                                <Grid
                                    // RHS Column
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="stretch"
                                    xs={12} sm={8}
                                    sx={{
                                        '@media screen and (max-width: 768px)': {
                                            alignItems: "center",
                                            margin: "auto",
                                        },
                                    }}
                                >
                                    <Grid
                                        // Name and Follow Button
                                        container
                                        direction="column"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        sx={{
                                            '@media screen and (max-width: 768px)': {
                                                alignItems: "center",
                                                marginY: "10px"
                                            },
                                        }}
                                    >
                                        {/*TODO: this may need to be updated later on wrt styling*/}
                                        <NameStatusIconContainer>
                                            <UserName>{nickName}</UserName>
                                            {userOnlineStatus ? (
                                                <StatusBadgeOnline />
                                            ) : (
                                                <StatusBadgeOffline />
                                            )
                                            }
                                        </NameStatusIconContainer>
                                        <div>Following Users</div>
                                        {/*TODO: Add list of people/topics that we're blocking too...*/}
                                        {profile_following.map((this_user) => {
                                            return (
                                                <Button disableRipple key={this_user.id} onClick={() => handleProfClick(this_user.id)}>
                                                    {this_user.nickName}
                                                </Button>
                                            )
                                        })}

                                        <div>Following Topics</div>
                                        {topics_following.map((this_topic) => {
                                            return (
                                                <Link key={this_topic.id} to={{
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

                                        <div>Blocking Users</div>
                                        {profile_blocking.map((this_user) => {
                                            return (
                                                <Button disableRipple key={this_user.id} onClick={() => handleProfClick(this_user.id)}>
                                                    {this_user.nickName}
                                                </Button>
                                            )
                                        })}

                                        <div>Blocking Topics</div>
                                        {topics_blocking.map((this_topic) => {
                                            return (
                                                <Link key={this_topic.id} to={{
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
                                            sx={{
                                                '@media screen and (max-width: 768px)': {
                                                    alignItems: "center",
                                                    marginTop: "10px"
                                                },
                                            }}
                                        >
                                            <div>
                                                {hasFollowed ? (
                                                    <FollowButton>
                                                        <Button
                                                            disableRipple
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
                                                        disableRipple
                                                        container
                                                        direction="column"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        // fullWidth={true}
                                                        variant="outlined"
                                                        onClick={followUser}>follow</Button>
                                                )}
                                            </div>

                                            {/*TODO: (WIP) Blocking implementation*/}
                                            <div>
                                                {hasBlocked ? (
                                                    <FollowButton>
                                                        <Button
                                                            disableRipple
                                                            container
                                                            direction="column"
                                                            justifyContent="center"
                                                            alignItems="center"
                                                            // fullWidth={true}
                                                            variant="outlined"
                                                            onClick={blockUser}>unblock</Button>
                                                    </FollowButton>

                                                ) : (
                                                    <Button
                                                        disableRipple
                                                        container
                                                        direction="column"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        // fullWidth={true}
                                                        variant="outlined"
                                                        onClick={blockUser}>block</Button>
                                                )}
                                            </div>
                                        </Grid>
                                    </Grid>
                                    {/*<UserStats>*/}
                                    {/*    /!*<Grid*!/*/}
                                    {/*    /!*    // User Stats*!/*/}
                                    {/*    /!*    container*!/*/}
                                    {/*    /!*    direction="row"*!/*/}
                                    {/*    /!*    alignItems="center"*!/*/}
                                    {/*    /!*    justifyContent="center"*!/*/}
                                    {/*    /!*    spacing={2}*!/*/}
                                    {/*    /!*>*!/*/}
                                    {/*    /!*    <Grid*!/*/}
                                    {/*    /!*        container*!/*/}
                                    {/*    /!*        direction="column"*!/*/}
                                    {/*    /!*        alignItems="center"*!/*/}
                                    {/*    /!*        justifyContent="center"*!/*/}
                                    {/*    /!*        item xs={4}*!/*/}
                                    {/*    /!*    >*!/*/}

                                    {/*    /!*    </Grid>*!/*/}
                                    {/*    /!*    <Grid container*!/*/}
                                    {/*    /!*          direction="column"*!/*/}
                                    {/*    /!*          alignItems="center"*!/*/}
                                    {/*    /!*          justifyContent="center"*!/*/}
                                    {/*    /!*          item xs={4}*!/*/}
                                    {/*    /!*    >*!/*/}

                                    {/*    /!*    </Grid>*!/*/}
                                    {/*    /!*    <Grid container*!/*/}
                                    {/*    /!*          direction="column"*!/*/}
                                    {/*    /!*          alignItems="center"*!/*/}
                                    {/*    /!*          justifyContent="center"*!/*/}
                                    {/*    /!*          item xs={4}*!/*/}
                                    {/*    /!*    >*!/*/}
                                    {/*    /!*    </Grid>*!/*/}
                                    {/*    </Grid>*/}
                                    {/*</UserStats>*/}
                                    <FullWidthTabs/>
                                </Grid>
                            </Grid>
                        </Container>
                    </ProfileContainer>
                )
            } else {
                //DARK MODE
                return (
                    <ProfileContainerBlack>
                        <Container
                            fixed
                            sx={{
                                '@media screen and (max-width: 768px)': {
                                    padding: "0",
                                    marginY: "10px"
                                },
                            }}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={2}
                                sx={{
                                    '@media screen and (max-width: 768px)': {
                                        alignItems: "center",
                                        margin: "0",
                                        spacing: 0,
                                        width: "100%",
                                    },
                                }}
                            >
                                <Grid
                                    // LHS Column
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    xs={12} sm={4}
                                >
                                    {/*profile section*/}
                                    <Stack direction="column"
                                           justifyContent="center"
                                           alignItems="flex-start"
                                           spacing={2}
                                    >
                                        <ProfilePic src={profilePic}/>
                                        <div>Bio: {bio}</div>
                                        <div>Age: {age}</div>
                                        <div>Year: {year}</div>
                                        <div>Major: {major}</div>
                                    </Stack>
                                </Grid>
                                <Grid
                                    // RHS Column
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="stretch"
                                    xs={12} sm={8}
                                    sx={{
                                        '@media screen and (max-width: 768px)': {
                                            alignItems: "center",
                                            margin: "auto",
                                        },
                                    }}
                                >
                                    <Grid
                                        // Name and Follow Button
                                        container
                                        direction="column"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        sx={{
                                            '@media screen and (max-width: 768px)': {
                                                alignItems: "center",
                                                marginY: "10px"
                                            },
                                        }}
                                    >
                                        {/*TODO: this may need to be updated later on wrt styling*/}
                                        <NameStatusIconContainer>
                                            <UserNameBlack>{nickName}</UserNameBlack>
                                            {userOnlineStatus ? (
                                                <StatusBadgeOnline />
                                            ) : (
                                                <StatusBadgeOffline />
                                            )
                                            }
                                        </NameStatusIconContainer>


                                        {profile_following.map((this_user) => {
                                            return (
                                                <Button
                                                    disableRipple
                                                    key={this_user.id} onClick={() =>
                                                    handleProfClick(this_user.id)
                                                } style={{color:'lightblue'}}>
                                                    {this_user.nickName}
                                                </Button>
                                            )
                                        })}

                                        {topics_following.map((this_topic) => {
                                            return (
                                                <Link key={this_topic.id} to={{
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
                                            sx={{
                                                '@media screen and (max-width: 768px)': {
                                                    alignItems: "center",
                                                    marginTop: "10px"
                                                },
                                            }}
                                        >
                                            <div>
                                                {hasFollowed ? (
                                                    <FollowButton>
                                                        <Button
                                                            disableRipple
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
                                                    // TODO: add <followButton> later
                                                    <Button
                                                        disableRipple
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
                                            {/*TODO: Blocking implementation*/}
                                            <div>
                                                {hasBlocked ? (
                                                    <FollowButton>
                                                        <Button
                                                            disableRipple
                                                            container
                                                            direction="column"
                                                            justifyContent="center"
                                                            alignItems="center"
                                                            // fullWidth={true}

                                                            variant="outlined"
                                                            style={{color:'lightblue'}}
                                                            onClick={blockUser}>unblock</Button>
                                                    </FollowButton>
                                                ) : (
                                                    // TODO: add <followButton> later
                                                    <Button
                                                        disableRipple
                                                        container
                                                        direction="column"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        // fullWidth={true}

                                                        variant="outlined"
                                                        style={{color:'lightblue'}}
                                                        onClick={blockUser}>block</Button>
                                                )}
                                            </div>

                                        </Grid>
                                    </Grid>
                                    <FullWidthTabs/>
                                </Grid>
                            </Grid>
                        </Container>
                    </ProfileContainerBlack>
                )
            }
        } else {
            return (<div> This is a private profile</div>)
        }
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }

}

export default ProfileSection;