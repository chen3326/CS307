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
import {PostDisplayContainer} from "../components/PostDisplaySection/PostDisplayElements";
import OnePost from "../components/PostDisplaySection/Post";
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {FollowButton} from "../components/ProfileSection/ProfileElements";
import {getAuth} from "firebase/auth";

function Inner_topic() {
    const [user, loading, error] = useAuthState(auth);
    const {state} = useLocation();

    const [postListsTopic, setPostListTopic] = useState([]);
    const [topicAuthor, setTopicAuthor] = useState("");
    const postsTopicCollectionRef = collection(database, "posts");
    const q = query(postsTopicCollectionRef, where("topic", "==", state), orderBy("timestamp", "asc"), limit(1));
    const backq = query(postsTopicCollectionRef, where("topic", "==", state));
    const [me_following, setMe_following] = useState([]);
    const [hasFollowed, setHasFollowed] = useState(false);
    useEffect(() => {
        const unsubscribeTopic = onSnapshot(backq, snapshot => {

            setPostListTopic(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })
        const unsubscribeAuthor = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setTopicAuthor(doc.data().topicAuthor.email);
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


    const followTopic = async () => {

        if (hasFollowed) {

            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                followingTopics: arrayRemove({topicName: state, topicAuthor: topicAuthor, id: user.uid})
            });
        } else {
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                followingTopics: arrayUnion({topicName: state, topicAuthor: topicAuthor, id: user.uid})
            });

        }

    };

    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
        return (
            <>
                <SidebarSection/>
                <NavSection/>

                <Typography style={{marginTop: "5%", marginLeft: "10%"}}>
                    <h1>Topic Name: {state}</h1>
                    <h2>Topic Author: {topicAuthor}</h2>
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
                                onClick={followTopic}>follow topic</Button>

                        )}
                    </div>
                </Typography>
                <PostDisplayContainer>

                    {postListsTopic.map((post) => {
                        return (

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
                        )
                    })}

                </PostDisplayContainer>

            </>


        );
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }

}

export default Inner_topic;
