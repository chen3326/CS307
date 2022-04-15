import React, {useEffect, useState} from 'react';
import {NewLine, Post, PostDark, PostDisplayContainer, PostHeader, PostHeaderTitle} from "./PostDisplayElements";


import {

    Link
} from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {CardActions, Fade, Paper, Popper} from "@mui/material";
import Button from "@material-ui/core/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import {
    addDoc,
    collection,
    doc,
    getDocs,
    onSnapshot,
    setDoc,
    deleteDoc,
    updateDoc,
    arrayUnion,
    arrayRemove, query, where, getDoc,

} from "firebase/firestore";
import {auth, database} from "../../firebase";

import Avatar from '@mui/material/Avatar';


import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {HeroContainer, HeroContainer2, HeroContent, HeroH1_2, HeroSLogo} from "../HeroSection/HeroElements";
import logo from "../../images/Boiler Breakouts-logos.jpeg";

function ActivityCard({
                     postid,
                     title,
                     topic,
                     topicAuthor,
                     postText,
                     authorEmail,
                     imageUrl,
                     imageUrl2,
                     imageUrl3,
                     timestamp,
                     likes_unused,
                     FileURl,
                     authorid
                 }) {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [placement, setPlacement] = React.useState();
    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    const [uid, setUid] = useState("");
    const [commentList, setCommentList] = useState([]);
    const commentsCollectionRef = collection(database, 'posts', postid, 'comments',)
    const [likes, setLikes] = useState([]);
    const [saved, setSaved] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);
    const [commentProfilePic, setCommentProfilePic] = useState("");
    const [commentName, setCommentName] = useState("");

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

    async function getCommentData(uid){
        console.log(uid);

        const ref = doc(database, "users", uid);
        const udocSnap = await getDoc(ref);

        if (udocSnap.exists()) {
            setCommentProfilePic(udocSnap.data().author.profilePic);
            setCommentName(udocSnap.data().author.nickName);
        } else {
            console.log("comment pull error");
        }
    }

    //get comments
    useEffect(() => {
        const getComments = async () => {
            const data = await getDocs(commentsCollectionRef);
            setCommentList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getComments();
    });

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
            if (user&&!queriedTheme) {
                setThemeEmail(user.email); //sets user's email to email
                getUserTheme();
                setQueriedTheme(true); //stops overwriting var from firebase backend
            }
        });

        if (!themeModeForCheckTheme) {
            return (

                <Post>
                    <PostHeader>
                        <PostHeaderTitle>
                            <h1> {title}</h1>
                            <div align="left">{timestamp.toDate().getDate().toString() + "/" + (timestamp.toDate().getMonth() + 1).toString() + "/" + timestamp.toDate().getFullYear().toString() + " | " + timestamp.toDate().getHours().toString() + ":" + timestamp.toDate().getMinutes().toString()}</div>
                        </PostHeaderTitle>
                    </PostHeader>

                    <PostDisplayContainer>
                        <div>Account here!!</div>
                        <NewLine>
                            {commentList.map((account) => {
                                //console.log(comment.commentAuthorId);
                                //getCommentData(comment.commentAuthorId);
                                return (
                                    <NewLine>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            {/*author email and profile*/}
                                            <Avatar
                                                sx={{width: 30, height: 30}}
                                                alt={account.commentAuthorEmail}
                                                src={commentProfilePic}
                                            />

                                            <Stack direction="column" spacing={1}>
                                                <h3>{commentName}</h3>
                                                <Link
                                                    to={{
                                                        pathname: "/profile",
                                                        state: account.commentAuthorEmail
                                                        // your data array of objects
                                                    }}
                                                >
                                                    {account.commentAuthorEmail}
                                                </Link>

                                            </Stack>

                                        </Stack>
                                    </NewLine>
                                )
                            })}
                        </NewLine>
                    </PostDisplayContainer>
                </Post>
            );
        } else {
            //PostDark
            return (
                <PostDark>
                    <PostHeader>
                        <PostHeaderTitle>
                            <h1> {title}</h1>
                            <div align="left">{timestamp.toDate().getDate().toString() + "/" + (timestamp.toDate().getMonth() + 1).toString() + "/" + timestamp.toDate().getFullYear().toString() + " | " + timestamp.toDate().getHours().toString() + ":" + timestamp.toDate().getMinutes().toString()}</div>
                        </PostHeaderTitle>
                    </PostHeader>

                    <PostDisplayContainer>
                        <div>Account here!!</div>
                    </PostDisplayContainer>
                </PostDark>
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

export default ActivityCard;



