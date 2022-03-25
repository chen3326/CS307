import React, {useEffect, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';


import {auth, database} from "../../firebase";
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    getFirestore,
    doc,
    addDoc,
    deleteDoc,
    updateDoc, arrayRemove, setDoc, arrayUnion, getDocs
} from "firebase/firestore";
import {Post, PostDisplayContainer, PostHeader, PostHeaderTitle} from "./PostDisplayElements";

import OnePost from "./Post";
import {getAuth} from "firebase/auth";
import {useDocument} from "react-firebase-hooks/firestore";
import {Link, useParams} from "react-router-dom";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SavedIcon from "@mui/icons-material/BookmarkAdded";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {CardActions, Fade, Paper, Popper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";


function IndvPost_display() {
    const { postid } = useParams(); //get post id from App.js

    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [topicAuthor, setTopicAuthor] = useState("");
    const [postText, setPostText] = useState("");
    const [authorEmail, setAuthorEmail] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageUrl2, setImageUrl2] = useState("");
    const [imageUrl3, setImageUrl3] = useState("");
    const [FileURl, setFileURl] = useState("");
    const [timestamp, setTimestamp] = useState("");

    async function getUser(){
        //compare email to other users in collection
        const q = query(collection(database, "posts", postid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //set all the user's settings
                setTitle(doc.data().title);
                setTopic(doc.data().topic);
                setPostText(doc.data().postText);
                setAuthorEmail(doc.data().author.email);
                setImageUrl(doc.data().imageUrl);
                setImageUrl2(doc.data().imageUrl2);
                setImageUrl3(doc.data().imageUrl3);
                setFileURl(doc.data().FileURl);
                setTimestamp(doc.data().timestamp);
            });
        });
    }

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [placement, setPlacement] = React.useState();
    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    const [commentText, setCommentText] = useState("");
    const [uid, setUid] = useState("");
    const [commentList, setCommentList] = useState([]);
    const commentsCollectionRef = collection(database, 'posts', postid, 'comments',)
    const [likes, setLikes] = useState([]);
    const [saved, setSaved] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);


    const createComment = async () => {

        await addDoc(commentsCollectionRef, {
            commentText: commentText,
            commentAuthorId: auth.currentUser.uid,
            commentAuthorEmail: auth.currentUser.email
        });
        window.location.pathname = "/home";

    };

    useEffect(
        () =>
            onSnapshot(collection(database, "posts", postid, "likes"), (snapshot) =>
                setLikes(snapshot.docs)
            ),
        [database, postid]
    );

    useEffect(
        () =>
            setHasLiked(
                likes.findIndex((like) => like.id === getAuth().currentUser.uid) !== -1
            ),
        [likes]
    );

    useEffect(
        () =>
            onSnapshot(collection(database, "posts", postid, "savedby"), (snapshot) =>

                setSaved(snapshot.docs)
            ),
        [database, postid]
    );

    useEffect(
        () =>
            setHasSaved(
                saved.findIndex((save) => save.id === getAuth().currentUser.uid) !== -1
            ),
        [saved]
    );


    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(database, 'posts', postid, 'likes', getAuth().currentUser.uid));
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                likedPosts: arrayRemove(postid)
            });
        } else {
            await setDoc(doc(database, "posts", postid, "likes", getAuth().currentUser.uid), {
                username: getAuth().currentUser.email,


            });

            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                likedPosts: arrayUnion(postid)
            });
        }
    };

    const savePost = async () => {
        if (hasSaved) {
            await deleteDoc(doc(database, 'posts', postid, 'savedby', getAuth().currentUser.uid));
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                savedPosts: arrayRemove(postid)
            });
        } else {
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                savedPosts: arrayUnion(postid)
            });
            await setDoc(doc(database, "posts", postid, "savedby", getAuth().currentUser.uid), {
                username: getAuth().currentUser.email,


            });
        }
    };


    //get comments
    useEffect(() => {
        const getComments = async () => {
            const data = await getDocs(commentsCollectionRef);
            setCommentList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getComments();
    });

    const checkUnderLimit = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    async function handleIndvClick() {
        //alert(postid);
        //return (<indv_post postid={postid}/>);
        //return <settings_page/>
        alert(postid);
        console.log("hey there");
    }



    //pre-loading and display single post
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
        return (
            <PostDisplayContainer>
                <div>{postid}</div>
                <div>{authorEmail}</div>

            </PostDisplayContainer>

        );
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }

}


export default IndvPost_display;
