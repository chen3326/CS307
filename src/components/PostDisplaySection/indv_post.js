import React, {useEffect, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';


import {auth, database} from "../../firebase";
import {collection, onSnapshot, query, orderBy, where, getFirestore, doc} from "firebase/firestore";
import {PostDisplayContainer, PostHeader} from "./PostDisplayElements";

import OnePost from "./Post";
import {getAuth} from "firebase/auth";
import {useDocument} from "react-firebase-hooks/firestore";

//when a user clicks on a post, they are taken to a page individually for that post, with more details available
function IndvPost_display(postid) {

    const [indvPost, setIndvPost] = useState([]);
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

    //get the post from the postid
    useEffect(() => {
        if (user){
            onSnapshot(doc(database, "posts", postid), (snapshot) =>
                setIndvPost(snapshot.data().indvPost)
            )
        }
    },[user]);

    //pre-loading and display page
    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
        return (
            <PostDisplayContainer>
                <PostHeader> Posts saved by {user.email} </PostHeader>

                {postLists1.map((post) => {
                    return (
                        <div>
                            {indvPost.includes(post.id) ? (
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

            </PostDisplayContainer>
        );
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }

}

export default IndvPost_display;
