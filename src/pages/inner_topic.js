//import InnerTopicSection from "../components/InnerTopicSection/index";
import * as React from 'react';
import NavSection from "../components/NavbarSection";
import SidebarSection from "../components/SidebarSection";
//document.querySelector('meta[name="theme-color"]').setAttribute('content', '#232323');
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useLocation} from "react-router-dom";
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';

import {auth, database} from "../firebase";
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    limit,
    updateDoc,
    doc,
    arrayRemove,
    arrayUnion
} from "firebase/firestore";
import {PostDisplayContainer, PostDisplayContainerDark} from "../components/PostDisplaySection/PostDisplayElements";
import OnePost from "../components/PostDisplaySection/Post";
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {FollowButton} from "../components/ProfileSection/ProfileElements";
import {getAuth, onAuthStateChanged} from "firebase/auth";

function Inner_topic() {
    const [user, loading, error] = useAuthState(auth);
    const {state} = useLocation();

    const [postListsTopic, setPostListTopic] = useState([]);
    const [topicAuthor, setTopicAuthor] = useState("");
    const [topicAuthoruid, setTopicAuthoruid] = useState("");
    const [topicAuthorName, setTopicAuthorName] = useState("");


    const postsTopicCollectionRef = collection(database, "posts");
    const q = query(postsTopicCollectionRef, where("topic", "==", state), limit(1));
    // const q = query(postsTopicCollectionRef, where("topic", "==", state), orderBy("timestamp", "asc"), limit(1));
    const backq = query(postsTopicCollectionRef, where("topic", "==", state));

    const [me_following, setMe_following] = useState([]);
    const [hasFollowed, setHasFollowed] = useState(false);
    // TODO: blocking implementation
    const [me_Blocking, setMe_Blocking] = useState([]);
    const [hasBlocked, setHasBlocked] = useState(false);

    useEffect(() => {
        const unsubscribeTopic = onSnapshot(backq, snapshot => {

            setPostListTopic(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })
        const unsubscribeAuthor = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setTopicAuthor(doc.data().topicAuthor.email);
                setTopicAuthoruid(doc.data().topicAuthor.id);
            });
        });
        return {unsubscribeTopic, unsubscribeAuthor};

    });

    useEffect(() => {
        if (user) {
            setHasFollowed(
                JSON.stringify(me_following).includes(JSON.stringify(state))
            )
        }
    }, [user, me_following]);

    useEffect(() => {
        if (user) {
            onSnapshot(doc(database, "users", user.uid), (snapshot) =>
                setMe_following(snapshot.data().followingTopics),
            )
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            setHasBlocked(
                JSON.stringify(me_Blocking).includes(JSON.stringify(state))
            )
        }
    }, [user, me_Blocking]);

    useEffect(() => {
        if (user) {
            onSnapshot(doc(database, "users", user.uid), (snapshot) =>
                setMe_Blocking(snapshot.data().blockingTopics),
            )
        }
    }, [user]);

    const followTopic = async () => {
        if (hasFollowed) {
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                followingTopics: arrayRemove({topicName: state, topicAuthor: topicAuthor, id: topicAuthoruid})
            });
        } else {
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                followingTopics: arrayUnion({topicName: state, topicAuthor: topicAuthor, id: topicAuthoruid})
            });
        }
    };

    const blockTopic = async () => {
        if (hasBlocked) {
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                blockingTopics: arrayRemove({topicName: state, topicAuthor: topicAuthor, id: topicAuthoruid})
            });
        } else {
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                blockingTopics: arrayUnion({topicName: state, topicAuthor: topicAuthor, id: topicAuthoruid})
            });
        }
    };

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

    async function getTopicAuthorName() {
        //gets the nickname of the topic author
        const q = query(collection(database, "users"), where("email", "==", topicAuthor));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //console.log("!!topic email:", topicAuthor);
                setTopicAuthorName(doc.data().author.nickName);
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
        if (topicAuthor != null) { //get topic author's real name
            //console.log("topic email:", topicAuthor);
            getTopicAuthorName(); //no email shown!! only real name
        }
        if (!themeModeForCheckTheme) {
            return (
                <>
                    <SidebarSection/>
                    <NavSection/>

                    <Typography style={{marginTop: "5%", marginLeft: "10%"}}>
                        <h1>Topic Name: {state}</h1>
                        <h2>Topic Author: {topicAuthorName}</h2>
                        <div>
                            {hasFollowed ? (
                                <FollowButton>
                                    <Button
                                        sx={{
                                            direction: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            '@media screen and (max-width: 768px)': {
                                            },
                                        }}
                                        container
                                        // direction="column"
                                        // justifyContent="center"
                                        // alignItems="center"
                                        // fullWidth={true}
                                        variant="outlined"
                                        onClick={followTopic}>unfollow Topic</Button>
                                </FollowButton>
                            ) : (
                                <Button
                                    container
                                    sx={{
                                        direction: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        '@media screen and (max-width: 768px)': {
                                        },
                                    }}
                                    // fullWidth={true}
                                    variant="outlined"
                                    onClick={followTopic}>follow topic</Button>
                            )}
                        </div>
                        <div>
                            {hasBlocked ? (
                                <FollowButton>
                                    <Button
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        // fullWidth={true}
                                        variant="outlined"
                                        onClick={blockTopic}>unblock Topic</Button>
                                </FollowButton>
                            ) : (
                                <Button
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    // fullWidth={true}
                                    variant="outlined"
                                    onClick={blockTopic}>block topic</Button>
                            )}
                        </div>
                    </Typography>
                    <PostDisplayContainer>
                        {postListsTopic.map((post) => {
                            return (
                                <OnePost
                                    postid={post?.id}
                                    title={post?.title}
                                    location={post?.location}
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
                            )
                        })}
                    </PostDisplayContainer>
                </>
            );
        } else {
            return (
                <>
                    <SidebarSection/>
                    <NavSection/>
                    {/*TODO: finish when regular version is working*/}
                    <Typography style={{paddingTop: "5%", paddingLeft: "10%", background:'#121212'}}>
                        <h1 style={{color:'rgba(255,255,255,0.85)'}}>Topic Name: {state}</h1>
                        <h2 style={{color:'rgba(255,255,255,0.85)'}}>Topic Author: {topicAuthor}</h2>
                        <div style={{paddingBottom:'25px'}}>
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
                                        onClick={followTopic}>unfollow Topic</Button>
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
                                    onClick={followTopic}>follow topic</Button>
                            )}
                        </div>
                    </Typography>
                    <PostDisplayContainerDark style={{paddingBottom:'800px'}}>
                        {postListsTopic.map((post) => {
                            return (
                                <OnePost
                                    postid={post?.id}
                                    title={post?.title}
                                    location={post?.location}
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
                            )
                        })}
                    </PostDisplayContainerDark>
                </>
            );
        }
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }
}

export default Inner_topic;
