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

//formating display to show all of the accounts that like/follow this post
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

    //tag var (likes, saved)
    const [likesList, setLikesList] = useState([]);
    const likesCollectionRef = collection(database, 'posts', postid, tabType,)

    //account var
    const [accountName, setAccountName] = useState("");
    const [accountProfilePic, setAccountProfilePic] = useState("");
    const [accountuid, setAccountuid] = useState("");
    const accountList = [];

    //darkmode var
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

    //get all tabTypes (like or save) on post from the posts collection
    useEffect(() => {
        const getLikes = async () => {
            const data = await getDocs(likesCollectionRef);
            setLikesList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));

            /*
            likesList.map((account) => {
                getAccount(account.uid); //gets display for each account
                console.log("out", accountList);
            })

             */

        };
        getLikes();
    });

    //get account from user's likes and sets profile, name, and like to profile
    //todo: if have time, find a way to deal w async loading to allow for automatic
    // change if user changed something in settings ie. their name
    async function getAccount(accountuid, callback) {
        //finds profile doc from users and matches based on uid
        const docRef = doc(database, "users", accountuid);
        const data = await getDoc(docRef);

        //console.log("accountlist:", accountList);
        //console.log("account:", data.data());

        accountList.push(data.data()); //pushes account from users doc to array
        //accountList.push("hello");

        console.log("in", accountList);
    }

    //DISPLAY AND LOADING
    const [user, buffering, error] = useAuthState(auth);
    if (buffering) {
        //preloading
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
        console.log("START AGAIN");
        onAuthStateChanged(auth, (user) => {
            if (user&&!queriedTheme) {
                setThemeEmail(user.email); //sets user's email to email
                getUserTheme(); //check for darkmode
                setQueriedTheme(true); //stops overwriting var from firebase backend
            }
        });
        //todo: darkmode
        if (!themeModeForCheckTheme) {
            {/*DISPLAY CARDS*/}
            return (
                <Post>
                    <PostHeader>
                        <PostHeaderTitle>
                            <h1> {title}</h1>
                            <div align="left">{timestamp.toDate().getDate().toString() + "/" + (timestamp.toDate().getMonth() + 1).toString() + "/" + timestamp.toDate().getFullYear().toString() + " | " + timestamp.toDate().getHours().toString() + ":" + timestamp.toDate().getMinutes().toString()}</div>
                        </PostHeaderTitle>
                    </PostHeader>

                    <PostDisplayContainer>
                        {/*<div>{tabType}</div>*/}
                        <NewLine>
                            {
                                likesList.map((doc) => {
                                    {/*profile pictures and names(linked to profile)*/}
                                    return (
                                        <NewLine>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                {/*author email and profile*/}
                                                <Avatar
                                                    sx={{width: 50, height: 50}}
                                                    alt={doc.nickName}
                                                    src={doc.profilePic}
                                                />

                                                <Stack direction="column" spacing={1}>
                                                    <Link
                                                        to={{
                                                            pathname: `/profile/${doc.id}`,
                                                            state: doc.nickName
                                                            // your data array of objects
                                                        }}
                                                    >
                                                        {doc.nickName}
                                                    </Link>
                                                </Stack>
                                            </Stack>
                                        </NewLine>
                                    )
                                })
                            }
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



