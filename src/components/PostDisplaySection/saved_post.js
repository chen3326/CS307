import React, {useEffect, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';


import {auth, database} from "../../firebase";
import {collection, onSnapshot, query, orderBy, where, getFirestore, doc} from "firebase/firestore";
import {PostDisplayContainer, PostDisplayContainerDark, PostHeader} from "./PostDisplayElements";

import OnePost from "./Post";
import {onAuthStateChanged} from "firebase/auth";



function SavedPost_display() {
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

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (user){
            onSnapshot(doc(database, "users", user.uid), (snapshot) =>
                setSavedPosts(snapshot.data().savedPosts)
            )
        }
    },[user]);

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

                <PostDisplayContainer>

                    {postLists1.map((post) => {

                        return (
                            <div>
                                {savedPosts.includes(post.id) ? (
                                    <OnePost
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
                            </div>
                        )
                    })}

                </PostDisplayContainer>
            );
        } else {
            return (

                <PostDisplayContainerDark style={{paddingBottom:'1000px'}}>

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

                </PostDisplayContainerDark>

            );
        }
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }

}


export default SavedPost_display;
