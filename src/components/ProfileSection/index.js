import React from 'react';
import {
    AppBar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    List,
    ListItem,
    ListItemButton, ListItemText,
    useTheme,
    Grid,
    Tabs,
    Tab,
    Typography,
} from "@mui/material";
// import Grid from '@mui/material/Grid';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import PropTypes from 'prop-types';
import OnePost from "../PostDisplaySection/Post";

import {
    FollowButton,
    ProfileContainer,
    ProfilePic, TabCard, UserName, UserStats,
    styles
} from './ProfileElements';

import pic from "../../images/cat_pic.jpg";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";

// React and Firebase
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    getDoc,
    deleteDoc,
    doc,
    updateDoc,
    arrayRemove, arrayUnion, setDoc, where
} from "firebase/firestore";
import {UseAuth, auth, database, storage} from "../../firebase";
import {getAuth, onAuthStateChanged, updateEmail} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Post from "../PostDisplaySection/Post";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 530,
    bgcolor: 'background.paper',
    border: '2px solid darkblue',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    variant: 'contained',
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const [likedPosts, setLikedPosts] = useState([]);
    const [commentedPosts, setCommentedPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);

    const [postLists1, setPostList1] = useState([]);
    const postsCollectionRef = collection(database, "posts");
    const [uid, setUid] = useState("");
    useEffect(() => {
        const unsubscribe = onSnapshot(query(postsCollectionRef, orderBy('timestamp', 'desc')), snapshot => {
            setPostList1(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })

        return unsubscribe;
    });

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (user){
            onSnapshot(doc(database, "users", user.uid), (snapshot) =>
                setLikedPosts(snapshot.data().likedPosts)
            )
        }
    },[user]);

    useEffect(() => {
        if (user){
            onSnapshot(doc(database, "users", user.uid), (snapshot) =>
                setCommentedPosts(snapshot.data().likedPosts)
            )
        }
    },[user]);

    useEffect(() => {
        if (user){
            onSnapshot(doc(database, "users", user.uid), (snapshot) =>
                setSavedPosts(snapshot.data().likedPosts)
            )
        }
    },[user]);

    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
        return (
            <Box sx={{ bgcolor: 'orange', borderRadius: '10px'}}>
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
                        <OutlinedCard/>
                    </TabCard>
                    <TabCard>
                        <OutlinedCard/>
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
                                        />
                                    ) : (
                                        <div/>

                                    )}
                                </div>
                            )
                        })}
                    </TabCard>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <TabCard>
                        {postLists1.map((post) => {
                            return (
                                <div>
                                    {savedPosts.includes(post.id) ? (
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
    }else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }

}

const card = (
    <React.Fragment>
        <CardContent>
            {/*<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>*/}
            {/*    Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.*/}
            {/*</Typography>*/}
            <Typography variant="h6" component="div">
                Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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

const postCard = (
    <React.Fragment>
        <CardContent>
            {/*<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>*/}
            {/*    Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.*/}
            {/*</Typography>*/}
            <OnePost></OnePost>
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
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}

function OutlinedPostCard() {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{postCard}</Card>
        </Box>
    );
}

/*
TODO:
 - Update the topics UI modal window
    - styling?
*/

function DisplayTopics() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const auth = getAuth();
    //variables to keep user's input
    const [email, setEmail] = useState(""); //email for user auth
    const [nickName, setnickName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [privateUser, setPrivateUser] = React.useState(false);
    const [docid, setDocid] = useState("");
    const [queried, setQueried] = useState(false); //lock

    const [topicList, setTopicList] = useState({
        topic1: "",
        topic2: "",
        topic3: "",
        topic4: "",
        topic5: "",
    });
    const topic1 = topicList.topic1;
    const topic2 = topicList.topic2;
    const topic3 = topicList.topic3;
    const topic4 = topicList.topic4;
    const topic5 = topicList.topic5;

    //get current user's email and settings data
    onAuthStateChanged(auth, (user) => {
        if (user&&!queried) {
            setEmail(user.email); //sets user's email to email
            getUser(); //set other user var
            setQueried(true); //stops overwriting var from firebase backend
        }
    });

    //get user's profile doc and set text boxes with data
    async function getUser(){
        //compare email to other users in collection
        const q = query(collection(database, "users"), where("email", "==", email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //set all the user's settings
                setnickName(doc.data().author.nickName);
                setImageUrl(doc.data().author.imageUrl);
                setPrivateUser(doc.data().author.privateUser);
                setDocid(doc.id); //address to user's profile document
                setTopicList(prevState => {
                    return {
                        ...prevState,
                        topic1: doc.data().topics.topic1,
                        topic2: doc.data().topics.topic2,
                        topic3: doc.data().topics.topic3,
                        topic4: doc.data().topics.topic4,
                        topic5: doc.data().topics.topic5 }
                })
                const topicL = doc.data().topics.length;
                console.log(topicL);
            });
        });
    }

    const [user, loading, error] = useAuthState(auth);
    const topicsCount = Object.keys(topicList).length;

    if (user) {
        return (
            <Container>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <p>Topics:</p>
                    <Button variant="text"
                            tooltip="Show subscribed topics"
                            onClick={handleOpen}
                    >
                        { topicsCount }
                    </Button>
                </Grid>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Topics
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            <Box
                                style={styles.modalBox}
                                // sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                sx={{ bgcolor: 'background.paper' }}>
                                <nav>
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={topic1} />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={topic2} />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={topic3} />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={topic4} />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={topic5} />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </nav>
                            </Box>
                        </Typography>
                        <Stack spacing={2} direction="row">
                            <label>
                                <Button onClick={handleClose} style={{color: 'red'}}>CLOSE</Button>
                            </label>
                        </Stack>
                    </Box>
                </Modal>
            </Container>
        );
    }
}

/*
TODO:
 - Still need to get the count of the followers that the user has
    - Update the button to reflect the count
 - Update the topics UI modal window
    - List the followers that the user has in a list
*/
function DisplayFollowers() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Container>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <p>Followers:</p>
                <Button variant="text"
                        tooltip="Show Followers"
                        onClick={handleOpen}
                >
                    ####
                </Button>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Followers
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {/*<label> Topic:</label>*/}
                        {/*<div className="inputGp">*/}
                        {/*    <input*/}
                        {/*        style={{width:'450px', height:'30px', marginTop:'5px',marginBottom:'10px', border: '2px solid #0D67B5', borderRadius:'5px'}}*/}
                        {/*        placeholder=" Topics..."*/}
                        {/*        width=""*/}
                        {/*        onChange={(event) => {*/}
                        {/*            setTitle(event.target.value);*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        <label> Topic: (At most 35 characters)</label>
                        {/*<div className="inputGp">*/}
                        {/*    <input*/}
                        {/*        style={{width:'450px', height:'30px',marginBottom:'5px', border: '2px solid #0D67B5', borderRadius:'5px'}}*/}
                        {/*        placeholder=" Topic..."*/}
                        {/*        width=""*/}
                        {/*        maxLength="35"*/}
                        {/*        onChange={(event) => {*/}
                        {/*            setTopic(event.target.value);*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<Stack spacing={1} direction="row">*/}
                        {/*    <div>*/}
                        {/*        <Badge color="primary" invisible={!invisibleTopic} variant="dot" >*/}
                        {/*            <AdminPanelSettingsIcon/>*/}
                        {/*        </Badge>*/}
                        {/*        <FormControlLabel*/}
                        {/*            sx={{ color: 'primary' }}*/}
                        {/*            control={<Switch checked={invisibleTopic} onChange={AnonymousSetTopic} />}*/}
                        {/*            label="Anonymous Topic"*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</Stack>*/}

                        {/*<label> Post: (Limit 500 Characters)</label>*/}
                        {/*<div className="inputGp" >*/}
                        {/*    <textarea*/}
                        {/*        style={{width:'450px', height:'200px', marginTop:'5px', marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}*/}
                        {/*        placeholder=" Post..."*/}
                        {/*        maxLength="500"*/}
                        {/*        onInput={checkunderlimit}*/}
                        {/*        onChange={(event) => {*/}
                        {/*            setPostText(event.target.value);*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </Typography>

                    <Stack spacing={2} direction="row">
                        <label>
                            <Button onClick={handleClose} style={{color:'red'}}> CLOSE </Button>
                        </label>
                    </Stack>
                </Box>
            </Modal>
        </Container>

    );
}

/*
TODO:
 - Still need to get the count of the users that the user is following
    - Update the button to reflect the count
 - Update the topics UI modal window
    - List the users that the user is following in a list
*/
function DisplayFollowing() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Container>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <p>Following:</p>
                <Button variant="text"
                        tooltip="Show subscribed topics"
                        onClick={handleOpen}
                >
                    ####
                </Button>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Following
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {/*<label> Topic:</label>*/}
                        {/*<div className="inputGp">*/}
                        {/*    <input*/}
                        {/*        style={{width:'450px', height:'30px', marginTop:'5px',marginBottom:'10px', border: '2px solid #0D67B5', borderRadius:'5px'}}*/}
                        {/*        placeholder=" Topics..."*/}
                        {/*        width=""*/}
                        {/*        onChange={(event) => {*/}
                        {/*            setTitle(event.target.value);*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        <label> Topic: (At most 35 characters)</label>
                        {/*<div className="inputGp">*/}
                        {/*    <input*/}
                        {/*        style={{width:'450px', height:'30px',marginBottom:'5px', border: '2px solid #0D67B5', borderRadius:'5px'}}*/}
                        {/*        placeholder=" Topic..."*/}
                        {/*        width=""*/}
                        {/*        maxLength="35"*/}
                        {/*        onChange={(event) => {*/}
                        {/*            setTopic(event.target.value);*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<Stack spacing={1} direction="row">*/}
                        {/*    <div>*/}
                        {/*        <Badge color="primary" invisible={!invisibleTopic} variant="dot" >*/}
                        {/*            <AdminPanelSettingsIcon/>*/}
                        {/*        </Badge>*/}
                        {/*        <FormControlLabel*/}
                        {/*            sx={{ color: 'primary' }}*/}
                        {/*            control={<Switch checked={invisibleTopic} onChange={AnonymousSetTopic} />}*/}
                        {/*            label="Anonymous Topic"*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</Stack>*/}

                        {/*<label> Post: (Limit 500 Characters)</label>*/}
                        {/*<div className="inputGp" >*/}
                        {/*    <textarea*/}
                        {/*        style={{width:'450px', height:'200px', marginTop:'5px', marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}*/}
                        {/*        placeholder=" Post..."*/}
                        {/*        maxLength="500"*/}
                        {/*        onInput={checkunderlimit}*/}
                        {/*        onChange={(event) => {*/}
                        {/*            setPostText(event.target.value);*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </Typography>

                    <Stack  spacing={2} direction="row">
                        <label>
                            <Button onClick={handleClose} style={{color:'red'}}> CLOSE </Button>
                        </label>
                    </Stack>
                </Box>
            </Modal>
        </Container>

    );
}


/*
* TODO:
*  - Following/Unfollowing Users
*   - Follow Button changes as needed:
*       - Unfollow, if looking at a user that you're currently following
*       - Follow if looking at a user that you're not following
*       - Follow button not there if you're not loggin in? How should this work?
*   - If follow/unfollow button toggled, then edit follow/unfollow entry in database
*   - Prompt message after follow/unfollow complete
* */

function ProfileSection() {

    const { state } = useLocation();

    const [user, loading, error] = useAuthState(auth);

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
                            // style={
                            //     styles.gridRHS
                            // }
                        >

                            <Grid
                                // Name and Follow Button
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                            >
                                <UserName>{state}</UserName>

                                <Grid
                                    // Follow Button container
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                >
                                    <FollowButton>
                                        <Button
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            // fullWidth={true}

                                            variant="outlined">Follow</Button>
                                    </FollowButton>
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
                                        <DisplayTopics/>
                                    </Grid>
                                    <Grid container
                                          direction="column"
                                          alignItems="center"
                                          justifyContent="center"
                                          item xs={4}
                                    >
                                        <DisplayFollowers/>
                                    </Grid>
                                    <Grid container
                                          direction="column"
                                          alignItems="center"
                                          justifyContent="center"
                                          item xs={4}
                                    >
                                        <DisplayFollowing/>
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

    // return (
    //     <ProfileContainer>
    //         <Container fixed>
    //             <Grid
    //                 container
    //                 direction="row"
    //                 justifyContent="center"
    //                 alignItems="flex-start"
    //                 spacing={2}
    //             >
    //
    //                 <Grid
    //                     // LHS Column
    //                     container
    //                     direction="column"
    //                     justifyContent="flex-start"
    //                     alignItems="center"
    //                     item xs={4}
    //                 >
    //                     <ProfilePic src={pic}/>
    //
    //                 </Grid>
    //
    //                 <Grid
    //                     // RHS Column
    //                     container
    //                     direction="column"
    //                     justifyContent="flex-start"
    //                     alignItems="stretch"
    //                     item xs={8}
    //                 >
    //
    //                     <Grid
    //                         // Name and Follow Button
    //                         container
    //                         direction="column"
    //                         justifyContent="flex-start"
    //                         alignItems="flex-start"
    //                     >
    //                         <UserName>{state}</UserName>
    //
    //                         <Grid
    //                             // Follow Button container
    //                             container
    //                             direction="column"
    //                             justifyContent="flex-start"
    //                             alignItems="flex-start"
    //                         >
    //                             <FollowButton>
    //                                 <Button
    //                                     container
    //                                     direction="column"
    //                                     justifyContent="center"
    //                                     alignItems="center"
    //                                     // fullWidth={true}
    //
    //                                     variant="outlined">Follow</Button>
    //                             </FollowButton>
    //                         </Grid>
    //                     </Grid>
    //
    //
    //                     <UserStats>
    //                     <Grid
    //                         // User Stats
    //                         container
    //                         direction="row"
    //                         alignItems="center"
    //                         justifyContent="center"
    //                         spacing={2}
    //                     >
    //                         <Grid
    //                             container
    //                             direction="column"
    //                             alignItems="center"
    //                             justifyContent="center"
    //                             item xs={4}
    //                         >
    //                             <DisplayTopics/>
    //                         </Grid>
    //                         <Grid container
    //                               direction="column"
    //                               alignItems="center"
    //                               justifyContent="center"
    //                               item xs={4}
    //                         >
    //                             <DisplayFollowers/>
    //                         </Grid>
    //                         <Grid container
    //                               direction="column"
    //                               alignItems="center"
    //                               justifyContent="center"
    //                               item xs={4}
    //                         >
    //                             <DisplayFollowing/>
    //                         </Grid>
    //                     </Grid>
    //                     </UserStats>
    //
    //
    //                     <FullWidthTabs/>
    //
    //                 </Grid>
    //             </Grid>
    //         </Container>
    //     </ProfileContainer>
    // );
}

export default ProfileSection;
