import React, {useEffect, useState} from 'react';


import {auth, database} from "../../firebase";
import {collection, onSnapshot, query, orderBy, where} from "firebase/firestore";
import {PostDisplayContainer, PostDisplayContainerDark} from "./PostDisplayElements";

import OnePost from "./Post";
import {useAuthState} from "react-firebase-hooks/auth";
import {onAuthStateChanged} from "firebase/auth";


function PostDisplaySection() {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(database, "posts");
    useEffect(() => {
        const unsubscribe = onSnapshot(query(postsCollectionRef, orderBy('timestamp', 'desc')), snapshot => {
            setPostList(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })
        return unsubscribe;
    });

    const [themeModeForCheckTheme, setThemeModeForCheckTheme] = useState(false);
    const [themeEmail, setThemeEmail] = useState("");
    const [queriedTheme, setQueriedTheme] = useState(false);

    async function getUserTheme() {
        const q = query(collection(database, "users"), where("email", "==", themeEmail));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setThemeModeForCheckTheme(doc.data().author.darkTheme);
            });
        });
    }

    const [user, buffering, error] = useAuthState(auth);

    if (buffering) {
        return (
            <h1 style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                Loading...
            </h1>
        );
    } else if (user) {
        //get current user's email and settings data
        onAuthStateChanged(auth, (user) => {
            if (user && !queriedTheme) {
                setThemeEmail(user.email); //sets user's email to email
                getUserTheme();
                setQueriedTheme(true); //stops overwriting var from firebase backend
            }
        });

        //DISPLAY
        if (!themeModeForCheckTheme) {
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
            );
        } else {
            return (
                <PostDisplayContainerDark>

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
                                likes={post?.likes}
                                authorid={post?.author?.id}
                            />
                        )
                    })}
                </PostDisplayContainerDark>
            )
        }
    } else if (error) {
        alert("There was an authentication error.")
        window.location.pathname = "/"
        //return <div>There was an authentication error.</div>;
    } else {
        window.location.pathname = "/"
    }


}

export default PostDisplaySection;