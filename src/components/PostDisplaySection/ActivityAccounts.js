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
    onSnapshot,query, where, getDoc, orderBy,

} from "firebase/firestore";
import {auth, database} from "../../firebase";

import Avatar from '@mui/material/Avatar';


import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

function ActivityCard({
                     tabType,
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

    const [likesList, setLikesList] = useState([]);
    const likesCollectionRef = collection(database, 'posts', postid, tabType,)

    const [accountName, setAccountName] = useState("");
    const [accountProfilePic, setAccountProfilePic] = useState("");
    const [accountuid, setAccountuid] = useState("");

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

    //get comments
    useEffect(() => {
        const getComments = async () => {
            const data = await getDocs(commentsCollectionRef);
            setCommentList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getComments();
    });

    //get all tabTypes (like or save) on post
    useEffect(() => {
        const getLikes = async () => {
            const data = await getDocs(likesCollectionRef);
            setLikesList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getLikes();
    });

    //get account from user's likes and sets profile, name, and like to profile
    //todo: find a way to have setLikeList have the users profile instead
    async function getAccount(likesEmail) {
        const q = query(collection(database, "users"), where("email", "==", likesEmail));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setAccountName(doc.data().author.nickName);
                setAccountProfilePic(doc.data().author.profilePic);
                setAccountuid(doc.data().id);
            });
        });
    }

    //DISPLAY AND LOADING
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
                        <div>{tabType}</div>
                        <NewLine>
                            {likesList.map((account) => {
                                getAccount(account.username); //gets display for accounts

                                return (
                                    <NewLine>

                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            {/*author email and profile*/}
                                            <Avatar
                                                sx={{width: 30, height: 30}}
                                                alt={account.username}
                                                src={accountProfilePic}
                                            />

                                            <Stack direction="column" spacing={1}>
                                                <Link
                                                    to={{
                                                        pathname: `/profile/${accountuid}`,
                                                        state: account.username
                                                        // your data array of objects
                                                    }}
                                                >
                                                    {accountName}
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



