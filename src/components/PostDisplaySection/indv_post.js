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
    getDoc,
    updateDoc, arrayRemove, setDoc, arrayUnion, getDocs
} from "firebase/firestore";
import {
    NewLine,
    newLine,
    Post,
    PostDark,
    PostDisplayContainer,
    PostDisplayContainerDark,
    PostHeader,
    PostHeaderTitle,
    PostTextContainer,
} from "./PostDisplayElements";

import OnePost from "./Post";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useDocument} from "react-firebase-hooks/firestore";
import {Link, useParams} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Avatar from '@mui/material/Avatar';
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
    const [postExists, setPostExists] = useState(true);
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [topicAuthor, setTopicAuthor] = useState("");
    const [postText, setPostText] = useState("");
    const [authorEmail, setAuthorEmail] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorid, setAuthorid] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageUrl2, setImageUrl2] = useState("");
    const [imageUrl3, setImageUrl3] = useState("");
    const [FileURl, setFileURl] = useState("");
    const [timestamp, setTimestamp] = useState("");
    const [authorProfilePic, setAuthorProfilePic] = useState("");

    const [queried, setQueried] = useState(false);

    async function getUser(){
        const docRef = doc(database, "posts", postid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setPostExists(true);

            setTitle(docSnap.data().title);
            setTopic(docSnap.data().topic);
            setPostText(docSnap.data().postText);
            setAuthorid(docSnap.data().author.id)
            setAuthorEmail(docSnap.data().realAuthor.realEmail);
            setTopicAuthor(docSnap.data().topicAuthor.email);
            setImageUrl(docSnap.data().imageUrl);
            setImageUrl2(docSnap.data().imageUrl2);
            setImageUrl3(docSnap.data().imageUrl3);
            setFileURl(docSnap.data().FileURl);
            setTimestamp(docSnap.data().timestamp);
            await getAuthorData(docSnap.data().author.id);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            setPostExists(false);
        }
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
    const [commentProfilePic, setCommentProfilePic] = useState("");
    const [commentName, setCommentName] = useState("");

    //const [uid, setUid] = useState("");
    const [commentList, setCommentList] = useState([]);
    const commentsCollectionRef = collection(database, 'posts', postid, 'comments',)
    const [likes, setLikes] = useState([]);
    const [saved, setSaved] = useState([]);
    const [commented, setCommented] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);
    const [hasCommented, setHasCommented] = useState(false);

    //get a user's profile pic based on their user id
    async function getAuthorData(uid){
        console.log(uid);

        const ref = doc(database, "users", uid);
        const udocSnap = await getDoc(ref);

        if (udocSnap.exists()) {
            console.log("user data:", udocSnap.data());
            setAuthorProfilePic(udocSnap.data().author.profilePic);
            setAuthorName(udocSnap.data().author.nickName);
        } else {
            console.log("profile pull error");
        }
    }

    // adds comment to user's comments section

    const createComment = async () => {

        await addDoc(commentsCollectionRef, {
            commentText: commentText,
            commentAuthorId: auth.currentUser.uid,
            commentAuthorEmail: auth.currentUser.email
        });
        await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                commentedPosts: arrayUnion(postid)
        });
        window.location.pathname = "/home";
        //window.location.pathname = "/home";
    };

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

    const handleTopic = () => {
        console.info('You clicked the Chip.');
    };

    async function handleProfClick() {
        window.location = `/profile/${authorid}`;
    }

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

//pre-loading and display single post
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
        onAuthStateChanged(auth, (user) => {
            if (user&&!queried) {
                getUser(); //set other user var
                setThemeEmail(user.email);
                getUserTheme();
                setQueriedTheme(true);
                setQueried(true); //stops overwriting var from firebase backend

            }
        });
        //show page error if postid address doesn't exist
        if (postExists){
            if (!themeModeForCheckTheme) {
                return (
                    <PostDisplayContainer>
                        <Post>
                            <PostHeader>
                                <PostHeaderTitle>
                                    <h1> {title}</h1>

                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        {/*author email and profile*/}
                                        <Avatar
                                            sx={{width: 30, height: 30}}
                                            alt={authorEmail}
                                            src={authorProfilePic}
                                        />
                                        <h3>{authorName}</h3>

                                        <Button onClick={handleProfClick}>


                                            {authorEmail}
                                        </Button>

                                        <div>|</div>
                                        {/*topic section*/}
                                        {topic !== "" &&
                                            <Link to={{
                                                pathname: "/inner_topic",
                                                state: topic,
                                                topicAuthor: topicAuthor,
                                                // your data array of objects
                                            }}
                                            >
                                                {topic}
                                            </Link>
                                        }
                                    </Stack>
                                    {/*todo: time section makes white screen out for second loading*/}


                                </PostHeaderTitle>
                                {/*like button*/}
                                <div>
                                    {hasLiked ? (
                                        <Button onClick={likePost} href=""> <FavoriteIcon
                                            style={{color: 'red'}}/> {likes.length}
                                        </Button>
                                    ) : (
                                        <Button onClick={likePost} href=""> <FavoriteBorderIcon/> {likes.length}
                                        </Button>
                                    )}
                                </div>
                                {/*save button*/}
                                <div>
                                    {hasSaved ? (
                                        <Button onClick={savePost}> <SavedIcon style={{color: 'blue'}}/> </Button>

                                    ) : (
                                        <Button onClick={savePost}> <SavedIcon/></Button>
                                    )}
                                </div>
                            </PostHeader>


                            <PostDisplayContainer>
                                {/*post content and images*/}
                                <NewLine>{postText}</NewLine>
                                {imageUrl != "" &&
                                    <ImageList sx={{width: 500, height: 200}} cols={3} rowHeight={164}>

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
                                            <a href={FileURl}> download attached file</a>
                                        }

                                    </ImageList>
                                }

                                {/*adding a comment button*/}
                                <CardActions>
                                    <Button variant='outlined' color='primary' onClick={handleClick('bottom')}
                                    > Add a Comment </Button>
                                    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                                        {({TransitionProps}) => (
                                            <Fade {...TransitionProps} timeout={350}>
                                                <Paper>
                                                    <Typography variant="h6" component="h2" marginLeft='10px'
                                                                marginTop='5px'
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
                                {/*comments display*/}
                                <NewLine>
                                    {commentList.map((comment) => {
                                        //console.log(comment.commentAuthorId);
                                        //getCommentData(comment.commentAuthorId);
                                        return (
                                            <NewLine>
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    {/*author email and profile*/}
                                                    <Avatar
                                                        sx={{width: 30, height: 30}}
                                                        alt={comment.commentAuthorEmail}
                                                        src={commentProfilePic}
                                                    />

                                                    <Stack direction="column" spacing={1}>
                                                        <h3>{commentName}</h3>
                                                        <Link
                                                            to={{
                                                                pathname: "/profile",
                                                                state: comment.commentAuthorEmail
                                                                // your data array of objects
                                                            }}
                                                        >
                                                            {comment.commentAuthorEmail}
                                                        </Link>

                                                        {comment.commentText}
                                                    </Stack>

                                                </Stack>
                                            </NewLine>
                                        )
                                    })}
                                </NewLine>
                            </PostDisplayContainer>
                        </Post>
                    </PostDisplayContainer>

                );
            } else {
                return (
                    <PostDisplayContainerDark style={{paddingBottom:'800px'}}>
                        <PostDark>
                            <PostHeader>
                                <PostHeaderTitle>
                                    <h1> {title}</h1>

                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        {/*author email and profile*/}
                                        <Avatar
                                            sx={{width: 30, height: 30}}
                                            alt={authorEmail}
                                            src={authorProfilePic}
                                        />
                                        <h3>{authorName}</h3>

                                        <Button onClick={handleProfClick} style={{color:'rgba(250,250,250,0.85)'}}>


                                            {authorEmail}
                                        </Button>

                                        <div>|</div>
                                        {/*topic section*/}
                                        {topic !== "" &&
                                            <Link to={{
                                                pathname: "/inner_topic",
                                                state: topic,
                                                topicAuthor: topicAuthor,

                                                // your data array of objects
                                            }}
                                                  style={{color:'#F0E68C'}}
                                            >
                                                {topic}
                                            </Link>
                                        }
                                    </Stack>
                                    {/*todo: time section makes white screen out for second loading*/}


                                </PostHeaderTitle>
                                {/*like button*/}
                                <div>
                                    {hasLiked ? (
                                        <Button onClick={likePost} href="" style={{color:'rgba(250,250,250,0.85)'}}> <FavoriteIcon
                                            style={{color: 'red'}}/> {likes.length}
                                        </Button>
                                    ) : (
                                        <Button onClick={likePost} href="" style={{color:'rgba(250,250,250,0.85)'}}> <FavoriteBorderIcon/> {likes.length}
                                        </Button>
                                    )}
                                </div>
                                {/*save button*/}
                                <div>
                                    {hasSaved ? (
                                        <Button onClick={savePost} style={{color:'rgba(250,250,250,0.85)'}}> <SavedIcon style={{color: 'blue'}}/> </Button>

                                    ) : (
                                        <Button onClick={savePost} style={{color:'rgba(250,250,250,0.85)'}}> <SavedIcon/></Button>
                                    )}
                                </div>
                            </PostHeader>


                            <PostDisplayContainerDark style={{background: 'rgb(75, 75, 75)'}}>
                                {/*post content and images*/}
                                <NewLine>{postText}</NewLine>
                                {imageUrl != "" &&
                                    <ImageList sx={{width: 500, height: 200}} cols={3} rowHeight={164}>

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
                                            <a href={FileURl}> download attached file</a>
                                        }

                                    </ImageList>
                                }

                                {/*adding a comment button*/}
                                <CardActions>
                                    <Button variant='outlined' style={{color:'lightblue'}}  onClick={handleClick('bottom')}
                                    > Add a Comment </Button>
                                    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                                        {({TransitionProps}) => (
                                            <Fade {...TransitionProps} timeout={350}>
                                                <Paper>
                                                    <Typography variant="h6" component="h2" marginLeft='10px'
                                                                marginTop='5px'
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
                                {/*comments display*/}
                                <NewLine>
                                    {commentList.map((comment) => {
                                        //console.log(comment.commentAuthorId);
                                        //getCommentData(comment.commentAuthorId);
                                        return (
                                            <NewLine>
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    {/*author email and profile*/}
                                                    <Avatar
                                                        sx={{width: 30, height: 30}}
                                                        alt={comment.commentAuthorEmail}
                                                        src={commentProfilePic}
                                                    />

                                                    <Stack direction="column" spacing={1}>
                                                        <h3>{commentName}</h3>
                                                        <Link
                                                            to={{
                                                                pathname: "/profile",
                                                                state: comment.commentAuthorEmail
                                                                // your data array of objects
                                                            }}
                                                            style={{color:'#F0E68C'}}
                                                        >
                                                            {comment.commentAuthorEmail}
                                                        </Link>

                                                        {comment.commentText}
                                                    </Stack>

                                                </Stack>
                                            </NewLine>
                                        )
                                    })}
                                </NewLine>
                            </PostDisplayContainerDark>
                        </PostDark>
                    </PostDisplayContainerDark>

                );
            }
        }
        else {
            if (!themeModeForCheckTheme) {
                return (
                    <PostDisplayContainer>
                        <div>{postid}</div>
                        <h1>POST DOES NOT EXIST</h1>
                    </PostDisplayContainer>
                );
            } else {
                return (
                    <PostDisplayContainerDark>
                        <div style={{color:'rgba(250,250,250,0.85)'}}>{postid}</div>
                        <h1 style={{color:'rgba(250,250,250,0.85)', paddingBottom:'1000px'}}>POST DOES NOT EXIST</h1>
                    </PostDisplayContainerDark>
                );
            }
        }
    } else if (error) {
        if (!themeModeForCheckTheme) {
            return <div>There was an authentication error.</div>;
        } else {
            return <div style={{color:'rgba(250,250,250,0.85)', background:'rgba(255, 255, 255, 0.08)', paddingBottom:'1000px'}}>There was an authentication error.</div>;
        }
    } else {
        if (!themeModeForCheckTheme) {
            return <div>There was an authentication error.</div>;
        } else {
            return <div style={{color:'rgba(250,250,250,0.85)', background:'rgba(255, 255, 255, 0.08)', paddingBottom:'1000px'}}>There was an authentication error.</div>;
        }
    }

}


export default IndvPost_display;

