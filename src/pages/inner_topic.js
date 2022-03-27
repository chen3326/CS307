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

import {database} from "../firebase";
import {collection, onSnapshot, query, orderBy, where , limit} from "firebase/firestore";
import { PostDisplayContainer} from "../components/PostDisplaySection/PostDisplayElements";
import OnePost from "../components/PostDisplaySection/Post";
import {useEffect, useState} from "react";
function Inner_topic() {
    const { state , topicAuthor} = useLocation();
    const [postListsTopic, setPostListTopic] = useState([]);
    //const [topicAuthor, setTopicAuthor] = useState("");
    const postsTopicCollectionRef = collection(database, "posts");
    const postsTopicAuthorCollectionRef = collection(database, "posts", "topicAuthor", "email");
    //const q = query(postsTopicCollectionRef, where("topic", "==",state), orderBy("timestamp", "asc"), limit(1));
    const backq = query(postsTopicCollectionRef, where("topic", "==",state));
    //setTopicAuthor(q);
    useEffect(() => {
        const unsubscribeTopic = onSnapshot(backq, snapshot =>{

            setPostListTopic(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })

        return unsubscribeTopic;

    });

    return (
        <>
            <SidebarSection/>
            <NavSection/>

            <Typography style={{marginTop:"5%", marginLeft:"10%"}}>
                <h1>Topic Name: {state}</h1>
                <h2>Topic Author: {topicAuthor}</h2>
                <label>Unfollow</label>
                <Switch/>
                <label>Follow</label>
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
                            likes = {post?.likes}

                        />
                    )
                })}

            </PostDisplayContainer>

        </>



    );
}

export default Inner_topic;
