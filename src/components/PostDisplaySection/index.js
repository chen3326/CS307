import React, {useEffect, useState} from 'react';


import {auth, database} from "../../firebase";
import {getDocs, collection, deleteDoc, doc, addDoc, onSnapshot, query, orderBy} from "firebase/firestore";
import {Post, PostDisplayContainer, PostHeader, PostHeaderTitle} from "./PostDisplayElements";

import OnePost from "./Post";


function PostDisplaySection() {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(database, "posts");
    useEffect(() => {
        const unsubscribe = onSnapshot(query(postsCollectionRef, orderBy('timestamp', 'desc')), snapshot =>{

            setPostList(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })

        return unsubscribe;

    });

    return (

        <PostDisplayContainer>

            {postLists.map((post) => {
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

                    />
                )
            })}

        </PostDisplayContainer>
    );
}


export default PostDisplaySection;
