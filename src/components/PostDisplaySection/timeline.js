import React, {useEffect, useState} from 'react';
import {auth, database} from "../../firebase";
import {collection, onSnapshot, query, orderBy, where, doc} from "firebase/firestore";
import {PostDisplayContainer, PostDisplayContainerDark} from "./PostDisplayElements";
import OnePost from "./Post";
import {useAuthState} from "react-firebase-hooks/auth";
import {onAuthStateChanged} from "firebase/auth";
import Button from "@material-ui/core/Button";
import SavedIcon from "@mui/icons-material/BookmarkAdded";


function TimelineSection() {
    const [user, buffering, error] = useAuthState(auth);
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(database, "posts");
    useEffect(() => {
        const unsubscribe = onSnapshot(query(postsCollectionRef, orderBy('timestamp', 'desc')), snapshot => {
            setPostList(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })
        return unsubscribe;
    });

    const [usersFollowingList, setUsersFollowingList] = useState("");
    const [usersFollowingTopicList, setUsersFollowingTopicList] = useState("");

    // TODO: blocking implementation
    const [usersBlockingList, setUsersBlockingList] = useState("");
    const [usersBlockingTopicList, setUsersBlockingTopicList] = useState("");

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

    useEffect(() => {
        if (user) {
            onSnapshot(doc(database, "users", user.uid), (snapshot) =>
                setUsersFollowingList(JSON.stringify(snapshot.data().following)),
            )
        }
        if (user) {
            onSnapshot(doc(database, "users", user.uid), (snapshot) =>
                setUsersFollowingTopicList(JSON.stringify(snapshot.data().followingTopics)),
            )
        }
        if (user) {
            onSnapshot(doc(database, "users", user.uid), (snapshot) =>
                setUsersBlockingList(JSON.stringify(snapshot.data().blockingUsers)),
            )
        }
        if (user) {
            onSnapshot(doc(database, "users", user.uid), (snapshot) =>
                setUsersBlockingTopicList(JSON.stringify(snapshot.data().blockingTopics)),
            )
        }
    }, [user]);


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
                        if (usersFollowingList.includes(post.author.id)) {
                            if (!usersBlockingTopicList.includes(post.topic) && post.topic !== "") {
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
                            }
                        }
                        if (usersFollowingTopicList.includes(post.topic) && post.topic !== "") {
                            if (!usersBlockingList.includes(post.author.id)) {
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
                            }
                        }
                    })}
                </PostDisplayContainer>
            );
        } else {
            return (
                <PostDisplayContainerDark>
                    {postLists.map((post) => {
                        if (usersFollowingList.includes(post.author.id)) {
                            if (!usersBlockingTopicList.includes(post.topic) && post.topic !== "") {
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
                            }
                        }
                        if (usersFollowingTopicList.includes(post.topic) && post.topic !== "") {
                            if (!usersBlockingList.includes(post.author.id)) {
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
                            }
                        }
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

export default TimelineSection;