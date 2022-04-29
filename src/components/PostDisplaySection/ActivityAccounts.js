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
                          authorNickName,
                          authorProfilePic,
                          imageUrl,
                          imageUrl2,
                          imageUrl3,
                          timestamp,
                          likes_unused,
                          FileURl,
                          authorid,
                          allowComments
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

            const data2 = await getDocs(commentsCollectionRef);
            setCommentList(data2.docs.map((doc2) => ({...doc2.data(), id: doc2.id})));

        };
        getLikes();
    });

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
            if (tabType !== "comments") {

                return (
                    <Post>
                        <PostHeader>
                            <PostHeaderTitle>
                                <h1> {title}</h1>
                                <div
                                    align="left">{timestamp.toDate().getDate().toString() + "/" + (timestamp.toDate().getMonth() + 1).toString() + "/" + timestamp.toDate().getFullYear().toString() + " | " + timestamp.toDate().getHours().toString() + ":" + timestamp.toDate().getMinutes().toString()}</div>
                            </PostHeaderTitle>
                        </PostHeader>

                        <PostDisplayContainer>
                            {/*<div>{tabType}</div>*/}

                            <NewLine>
                                {
                                    likesList.map((doc) => {
                                        {/*profile pictures and names(linked to profile)*/
                                        }
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

                return (
                    <Post>
                        <PostHeader>
                            <PostHeaderTitle>
                                <h1> {title}</h1>
                                <div
                                    align="left">{timestamp.toDate().getDate().toString() + "/" + (timestamp.toDate().getMonth() + 1).toString() + "/" + timestamp.toDate().getFullYear().toString() + " | " + timestamp.toDate().getHours().toString() + ":" + timestamp.toDate().getMinutes().toString()}</div>
                            </PostHeaderTitle>
                        </PostHeader>

                        <PostDisplayContainer>
                            {/*<div>{tabType}</div>*/}

                            <NewLine>
                                {
                                    commentList.map((doc2) => {
                                        return (
                                            <NewLine>
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    {/*author email and profile*/}
                                                    <Avatar
                                                        sx={{width: 50, height: 50}}
                                                        alt={doc2.display.nickName}
                                                        src={doc2.display.profilePic}
                                                    />

                                                    <Stack direction="column" spacing={1}>
                                                        <Link
                                                            to={{
                                                                pathname: `/profile/${doc2.commentAuthorId}`,
                                                                state: doc2.display.nickName
                                                                // your data array of objects
                                                            }}
                                                        >
                                                            {doc2.display.nickName}
                                                        </Link>
                                                        <div>{doc2.commentText}</div>
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
            }
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



