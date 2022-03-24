import React, {useEffect, useState} from 'react';
import {Post, PostDisplayContainer, PostHeader, PostHeaderTitle} from "./PostDisplayElements";
import indv_post from "./indv_post";
import settings_page from "../../pages/settings_page";
import settingsSection from "../SettingsSection";


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
    arrayRemove,
    getDoc, getFirestore
} from "firebase/firestore";
import {auth, database} from "../../firebase";
import SavedIcon from '@mui/icons-material/BookmarkAdded';


import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useDocument} from "react-firebase-hooks/firestore";

function OnePost({
                     postid,
                     title,
                     topic,
                     topicAuthor,
                     postText,
                     authorEmail,
                     imageUrl,
                     imageUrl2,
                     imageUrl3,
                     FileURl,
                     timestamp,


                 }) {
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
        return <settingsSection/>;
        //window.location = "/settings";

    }





        return (

            <Post>
                <PostHeader>


                    <PostHeaderTitle>
                        <h1> {title}</h1>

                        <Link
                            to={{
                                pathname: "/profile",
                                state: authorEmail

                                // your data array of objects
                            }}
                        >
                            {authorEmail}

                        </Link>


                    </PostHeaderTitle>
                    <div>
                        {hasLiked ? (
                            <Button onClick={likePost} href=""> <FavoriteIcon style={{color: 'red'}}/> {likes.length}
                            </Button>
                        ) : (
                            <Button onClick={likePost} href=""> <FavoriteBorderIcon/> {likes.length} </Button>
                        )}
                    </div>

                    <div>
                        {hasSaved ? (
                            <Button onClick={savePost}> <SavedIcon style={{color: 'blue'}}/> </Button>

                        ) : (
                            <Button onClick={savePost}> <SavedIcon/></Button>
                        )}

                    </div>


                </PostHeader>
                {/* <a href={topic}>{topic}</a> */}
                <PostDisplayContainer>
                    <h4> {timestamp.toDate().toString()}</h4>
                    {topic !== "" &&
                        <Link
                            to={{
                                pathname: "/inner_topic",
                                state: topic,
                                topicAuthor: topicAuthor,

                                // your data array of objects
                            }}
                        >
                            {topic}

                        </Link>
                    }
                    {/*
                    <Link
                        to={{
                            pathname: "/inner_topic",
                            state: authorEmail,

                            // your data array of objects
                        }}
                    >
                        {topic}

                    </Link>*/}

                    {postText}
                    <div onClick={handleIndvClick}>

                        <ImageList sx={{width: 500, height: 450}} cols={3} rowHeight={164}>

                            <ImageListItem>
                                {imageUrl !== "" &&
                                    <img
                                        src={`${imageUrl}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}

                                        loading="lazy"
                                    />
                                }


                            </ImageListItem>
                            <ImageListItem>

                                {imageUrl2 !== "" &&
                                    <img
                                        src={`${imageUrl2}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${imageUrl2}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}

                                        loading="lazy"
                                    />
                                }


                            </ImageListItem>
                            <ImageListItem>

                                {imageUrl3 !== "" &&
                                    <img
                                        src={`${imageUrl3}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${imageUrl3}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}

                                        loading="lazy"
                                    />
                                }

                            </ImageListItem>
                            {FileURl !== "" &&
                                <a href={FileURl} style={{marginTop: '-30px'}}> download attached file</a>
                            }

                        </ImageList>
                        <CardActions>
                            <Button variant='outlined' color='primary' onClick={handleClick('bottom')}
                                    style={{marginTop: '-200px'}}> Reply </Button>
                            <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                                {({TransitionProps}) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <Paper>
                                            <Typography variant="h6" component="h2" marginLeft='10px' marginTop='5px'
                                                        width='450px'>
                                                Create A Comment here
                                            </Typography>
                                            <Typography sx={{p: 2}}>
                                                click the 'Reply' button again to close
                                                <div className="inputGp">

                                                            <textarea
                                                                style={{
                                                                    width: '400px',
                                                                    height: '80px',
                                                                    marginTop: '0px',
                                                                    marginBottom: '15px',
                                                                    border: '2px solid #0D67B5',
                                                                    borderRadius: '5px'
                                                                }}
                                                                placeholder=" Comment..."
                                                                maxLength="140"
                                                                onInput={checkUnderLimit}
                                                                onChange={(event) => {
                                                                    setCommentText(event.target.value);
                                                                }}
                                                            />
                                                </div>
                                                <Stack spacing={1} direction="row">
                                                    <label>
                                                        <Button onClick={createComment}
                                                                style={{color: '#0D67B5'}}>SUBMIT</Button>
                                                    </label>


                                                </Stack>
                                            </Typography>
                                        </Paper>
                                    </Fade>
                                )}
                            </Popper>
                        </CardActions>
                    </div>

                    <div>
                        {commentList.map((comment) => {
                            return (


                                <div> {comment.commentText} -- By <Link
                                    to={{
                                        pathname: "/profile",
                                        state: comment.commentAuthorEmail

                                        // your data array of objects
                                    }}
                                >
                                    {comment.commentAuthorEmail}

                                </Link>
                                </div>
                            )


                        })}


                    </div>


                </PostDisplayContainer>


            </Post>


        );


}

export default OnePost;



