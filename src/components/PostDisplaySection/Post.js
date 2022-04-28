import React, {useEffect, useState} from 'react';
import {
    LikeButton,
    NewLine,
    Post,
    PostDark,
    PostDisplayContainer,
    PostHeader,
    PostHeaderTitle,
    PostHeaderTop, PostHeaderTopButtons, SaveButton
} from "./PostDisplayElements";


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
    arrayRemove, query, where,

} from "firebase/firestore";
import {auth, database, storage} from "../../firebase";
import SavedIcon from '@mui/icons-material/BookmarkAdded';


import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {HeroContainer, HeroContainer2, HeroContent, HeroH1_2, HeroSLogo} from "../HeroSection/HeroElements";
import logo from "../../images/Boiler Breakouts-logos.jpeg";
import Avatar from "@mui/material/Avatar";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import imageCompression from "browser-image-compression";

function OnePost({
                     postid,
                     title,
                     location,
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

    const [commentText, setCommentText] = useState("");
    const [uid, setUid] = useState("");
    const [commentList, setCommentList] = useState([]);
    const commentsCollectionRef = collection(database, 'posts', postid, 'comments',)
    const [likes, setLikes] = useState([]);
    const [saved, setSaved] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);
    const [commentImage, setCommentImage] = useState("");


    const createComment = async () => {

        await addDoc(commentsCollectionRef, {
            commentText: commentText,
            commentImage: commentImage,
            commentAuthorId: auth.currentUser.uid,
            commentAuthorEmail: auth.currentUser.email,
            display: {
                nickName: auth.currentUser.displayName,
                profilePic: auth.currentUser.photoURL,
            }
        });
        await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
            commentedPosts: arrayUnion(postid)
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

    const [progress, setProgress] = useState(0);
    const uploadFiles = (file) => {
        //
        if (!file) return;
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
                //const imageaftersize = ( snapshot.totalBytes);
                //setaftersize(imageaftersize);

            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setCommentImage(downloadURL);
                });
            }
        );
    };

    const [beforesize, setbeforesize] = useState(0);
    const [aftersize, setaftersize] = useState(0);

    async function doUpload(event) {

        const inputFile = event.target.files[0];
        setbeforesize(`${(inputFile.size / 1024 / 1024).toFixed(2)} MB`);

        const maxSet = {
            useWebWorker: true,
        }
        try {

            const afterCompressedFile = await imageCompression(inputFile, maxSet);

            setaftersize(`${(afterCompressedFile.size / 1024 / 1024).toFixed(2)} MB`);

            await uploadFiles(afterCompressedFile);
        } catch (error) {
            console.log(error);
        }

    }


    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(database, 'posts', postid, 'likes', getAuth().currentUser.uid));
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                likedPosts: arrayRemove(postid)
            });
        } else {
            await setDoc(doc(database, "posts", postid, "likes", getAuth().currentUser.uid), {
                uid: getAuth().currentUser.uid,
                username: getAuth().currentUser.email,
                nickName: getAuth().currentUser.displayName,
                profilePic: getAuth().currentUser.photoURL,
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
                uid: getAuth().currentUser.uid,
                username: getAuth().currentUser.email,
                nickName: getAuth().currentUser.displayName,
                profilePic: getAuth().currentUser.photoURL,
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

    // async function getUserStatus(){
    //     //compare email to other users in collection
    //     const q = query(collection(database, "users"), where("email", "==", authorEmail));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             setUserOnlineStatus(doc.data().loggedIn)
    //         });
    //     });
    // }
/*
    // useEffect(() => {
    //     if (user) {
    //         onSnapshot(doc(database, "users", authorid), (snapshot) => {
    //             setUserOnlineStatus(snapshot.data().loggedIn);
    //         })
    //         // getUserStatus();
    //     }
    // }, [authorid]);
*/

    // useEffect(() => {
    //     setUserOnlineStatus(true)
    // }, [userOnlineStatus]);


    //directs user to post's page with more information ie. comments
    async function handleIndvClick() {
        window.location = `/home/${postid}`;
    }

    async function handleProfClick() {
        window.location = `/profile/${authorid}`;
    }

    const [themeModeForCheckTheme, setThemeModeForCheckTheme] = useState(false);
    const [themeEmail, setThemeEmail] = useState("");
    const [queriedTheme, setQueriedTheme] = useState(false);
    const [userOnlineStatus, setUserOnlineStatus] = useState(false);

    async function getUserTheme() {
        const q = query(collection(database, "users"), where("email", "==", themeEmail));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setThemeModeForCheckTheme(doc.data().author.darkTheme);
            });
        });
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
            backgroundColor: "#44b700",
            color: "#44b700",
            width: 12,
            height: 12,
            borderRadius: "50%",
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
        }
    }));

    function StatusBadgeOnline() {
        return (
            // <StyledBadge
            //     overlap="circular"
            //     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            //     variant="dot"
            //     sx={{
            //         "& .MuiBadge-badge": {
            //             backgroundColor: "#44b700",
            //             color: "#44b700",
            //         }
            //     }}
            // >
                <Avatar
                    sx={{width: 30, height: 30}}
                    // alt={authorEmail}
                    // src={authorProfilePic}
                    src="/static/images/avatar/1.jpg"
                />
            // </StyledBadge>
        );
    }

    const StatusBadgeOffline = () => {
        return (
            // <StyledBadge
            //     overlap="circular"
            //     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            //     variant="dot"
            //     sx={{
            //         "& .MuiBadge-badge": {
            //         backgroundColor: '#8f8f8f',
            //         color: '#8f8f8f',
            //         }
            //     }}
            // >
                <Avatar
                    sx={{width: 30, height: 30}}
                    // alt={authorEmail}
                    // src={authorProfilePic}
                    src="/static/images/avatar/1.jpg"
                />
            ///*</StyledBadge>*/
        );
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

        // getUserStatus()

        if (!themeModeForCheckTheme) {
            return (

                <Post>
                    <PostHeader>
                        <PostHeaderTitle>
                            <PostHeaderTop>
                                <div>
                                    <h1> {title}</h1>
                                    {/*TODO: should this go underneath the title?*/}
                                    <h5> {location!== "" && location}</h5>
                                    {/*<h7> {location!== "" && location}</h7>*/}
                                </div>

                                {/*like button*/}
                                <PostHeaderTopButtons>
                                    <div>
                                        {hasLiked ? (
                                            <LikeButton
                                            // <Button
                                                // className={"heartCounter"}
                                                // onClick={likePost}
                                                // href=""
                                                // sx={{
                                                //     px: 0,
                                                //     // paddingLeft: 0,
                                                //     // paddingRight: 0,
                                                //     // height: 30
                                                // }}
                                            > <FavoriteIcon style={{color: 'red'}}/>
                                                <div className={"likeCounter"}>{likes.length}</div>
                                            {/*</Button>*/}
                                            </LikeButton>
                                        ) : (
                                            <LikeButton onClick={likePost} href=""> <FavoriteBorderIcon/>
                                                <div className={"likeCounter"}>{likes.length}</div>
                                            </LikeButton>
                                        )}
                                    </div>
                                    {/*save button*/}
                                    <div>
                                        {hasSaved ? (
                                            <SaveButton onClick={savePost}>
                                                <SavedIcon style={{color: 'blue'}}/>
                                            </SaveButton>
                                        ) : (
                                            <SaveButton onClick={savePost}>
                                                <SavedIcon/>
                                            </SaveButton>
                                        )}
                                    </div>
                                </PostHeaderTopButtons>
                            </PostHeaderTop>

                            <Stack direction="row" alignItems="center" spacing={1}>

                                {/*<StyledBadge*/}
                                {/*    overlap="circular"*/}
                                {/*    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}*/}
                                {/*    variant="dot"*/}
                                {/*    sx={{*/}
                                {/*        "& .MuiBadge-badge": {*/}
                                {/*            backgroundColor: "#44b700",*/}
                                {/*            color: "#44b700",*/}
                                {/*        }*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    <Avatar*/}
                                {/*        sx={{width: 30, height: 30}}*/}
                                {/*        alt={authorEmail}*/}
                                {/*        src={authorProfilePic}*/}
                                {/*    />*/}
                                {/*</StyledBadge>*/}

                                <StatusBadgeOnline />

                                {/*{userOnlineStatus ? (*/}
                                {/*    <StatusBadgeOnline />*/}
                                {/*) : (*/}
                                {/*    <StatusBadgeOffline />*/}
                                {/*    )*/}
                                {/*}*/}

                                <Button onClick={handleProfClick}>
                                    {authorNickName}
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


                        {/*</PostHeaderTitle>*/}
                        {/*like button*/}
                        {/*<div>*/}
                        {/*    {hasLiked ? (*/}
                        {/*        <Button onClick={likePost} href=""> <FavoriteIcon style={{color: 'red'}}/>*/}
                        {/*            <div className={"likeCounter"}>{likes.length}</div>*/}
                        {/*        </Button>*/}
                        {/*    ) : (*/}
                        {/*        <Button onClick={likePost} href=""> <FavoriteBorderIcon/>*/}
                        {/*            <div className={"likeCounter"}>{likes.length}</div>*/}
                        {/*        </Button>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                        {/*/!*save button*!/*/}
                        {/*<div>*/}
                        {/*    {hasSaved ? (*/}
                        {/*        <Button onClick={savePost}> <SavedIcon style={{color: 'blue'}}/> </Button>*/}

                        {/*    ) : (*/}
                        {/*        <Button onClick={savePost}> <SavedIcon/></Button>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                        </PostHeaderTitle>
                    </PostHeader>

                    <PostDisplayContainer>
                        {/*click to go to seperate post page*/}
                        <div onClick={handleIndvClick}>

                            {/*post content and images*/}
                            <NewLine>{postText}</NewLine>
                            {imageUrl !== "" &&
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
                        </div>

                        {/*adding a comment button*/}

                            <CardActions>
                                {allowComments ? (
                                    <Button variant='outlined' color='primary' onClick={handleClick('bottom')}
                                    > Add a Comment </Button>
                                ) : (
                                    <Button variant='outlined' color='secondary'
                                    > Comments not allowed </Button>
                                )}

                                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                                    {({TransitionProps}) => (
                                        <Fade {...TransitionProps} timeout={350}>
                                            <Paper>

                                                <Typography variant="h6" component="h2" marginLeft='10px' marginTop='5px'
                                                            width='70%'>
                                                    Add a Comment here
                                                </Typography>
                                                <Typography sx={{p: 2}}>
                                                    click the 'Add a Comment' button again to close
                                                    <div className="inputGp">

                                                            <textarea
                                                                style={{
                                                                    width: '85%',
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
                                                        <form onChange={event => doUpload(event)}>
                                                            <input type="file" className="input" />
                                                        </form>
                                                    </Stack>
                                                    <Stack spacing={1} direction="row">
                                                        <h5>Uploading done {progress}%</h5>
                                                    </Stack>
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


                        <div
                            align="left">{timestamp.toDate().getDate().toString() + "/" + (timestamp.toDate().getMonth() + 1).toString() + "/" + timestamp.toDate().getFullYear().toString() + " | " + timestamp.toDate().getHours().toString() + ":" + timestamp.toDate().getMinutes().toString()}</div>
                    </PostDisplayContainer>


                </Post>
            );
        } else {
            return (
                <PostDark>
                    <PostHeader>
                        <PostHeaderTitle>
                            <h1> {title}</h1>

                            <Stack direction="row" alignItems="center" spacing={1}>

                                <Button onClick={handleProfClick} style={{color: '#FFDAB9'}}>
                                    {authorEmail}
                                </Button>

                                <div>|</div>
                                {/*topic section*/}
                                {topic !== "" &&
                                    <Link to={{
                                        pathname: "/inner_topic",
                                        state: topic,
                                        //topicAuthor: topicAuthor,
                                        // your data array of objects
                                    }}
                                          style={{color: '#F0E68C'}}
                                    >
                                        {topic}
                                    </Link>
                                }
                            </Stack>


                        </PostHeaderTitle>
                        {/*like button*/}
                        <div>
                            {hasLiked ? (
                                <Button onClick={likePost} style={{color: 'rgba(255, 255, 255, 0.85)'}} href="">
                                    <FavoriteIcon style={{color: 'red'}}/>
                                    <div className={"likeCounter"}>{likes.length}</div>
                                </Button>
                            ) : (
                                <Button onClick={likePost} style={{color: 'rgba(255, 255, 255, 0.85)'}} href="">
                                    <FavoriteBorderIcon/>
                                    <div className={"likeCounter"}>{likes.length}</div>
                                </Button>
                            )}
                        </div>
                        {/*save button*/}
                        <div>
                            {hasSaved ? (
                                <Button onClick={savePost} style={{color: 'rgba(255, 255, 255, 0.85)'}}> <SavedIcon
                                    style={{color: 'blue'}}/> </Button>

                            ) : (
                                <Button onClick={savePost} style={{color: 'rgba(255, 255, 255, 0.85)'}}>
                                    <SavedIcon/></Button>
                            )}
                        </div>
                    </PostHeader>

                    <PostDisplayContainer>
                        {/*click to go to seperate post page*/}
                        <div onClick={handleIndvClick}>

                            {/*post content and images*/}
                            <NewLine>{postText}</NewLine>
                            {imageUrl !== "" &&
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
                        </div>

                        {/*adding a comment button*/}

                            <CardActions>


                                {allowComments ? (
                                    <Button variant='outlined' color='primary' onClick={handleClick('bottom')}
                                    > Add a Comment </Button>
                                ) : (
                                    <Button variant='outlined' color='secondary'
                                    > Comments not allowed </Button>
                                )}
                                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                                    {({TransitionProps}) => (
                                        <Fade {...TransitionProps} timeout={350}>
                                            <Paper>
                                                <Typography variant="h6" component="h2" marginLeft='10px'
                                                            marginTop='5px'
                                                            width='450px'>
                                                    Add a Comment here
                                                </Typography>
                                                <Typography sx={{p: 2}}>
                                                    click the 'Add a Comment' button again to close
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
                        }


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

export default OnePost;



