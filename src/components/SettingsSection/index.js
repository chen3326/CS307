import * as React from 'react';
import {
    Button, Container, Switch,
    InputLabel, Select,
    FormControl, TextField, MenuItem, FormControlLabel, FormGroup
} from "@mui/material";
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//react and firebase
import {
    collection,
    doc,
    where,
    query,
    onSnapshot,
    updateDoc,
    deleteDoc, orderBy, limit, getDocs, arrayRemove, getDoc,
} from "firebase/firestore";
import {useAuth, database, storage, auth, deleteU, login} from "../../firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {getAuth, onAuthStateChanged, updateEmail} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";


//local
import {
    SaveButton,
    SettingsContainer,
    ProfilePic, UserName, UserSettings, SettingsContainerBlack,UserNameBlack,
} from './SettingsElements';
import imageCompression from "browser-image-compression";
import {useLocation} from "react-router-dom";
//import PulseLoader from "react-spinners/PulseLoader";



//years class
const years = [
    {
        value: 'Freshman',
        label: 'Freshman',
    },
    {
        value: 'Sophomore',
        label: 'Sophomore',
    },
    {
        value: 'Junior',
        label: 'Junior',
    },
    {
        value: 'Senior',
        label: 'Senior',
    },
    {
        value: 'Super Senior',
        label: 'Super Senior',
    },
];


//settings for the current user
function SettingsSection() {
    //https://firebase.google.com/docs/firestore/data-model
    //variables to keep user's input
    const [ogEmail, setOgEmail] = useState("");
    const [ogName, setOgName] = useState("");
    const [email, setEmail] = useState(""); //email for user auth
    const [nickName, setnickName] = useState("");
    const [major, setMajor] = useState("");
    const [age, setAge] = useState(0)
    const [year, setYear] = useState(0);
    const [bio, setBio] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [progress, setProgress] = useState(0);
    const [privateUser, setPrivateUser] = React.useState(false);
    const [darkTheme, setDarkTheme] = useState(false);
    const [password, setPassword] = useState("");

    const [queried, setQueried] = useState(false); //lock
    const min = 1; //minimum for age input
    const [loading, setLoading] = useState(false);
    let [loadColor, setLoadColor] = useState("#F5A623");
    const [open, setOpen] = React.useState(false);

    const [themeModeForCheckTheme, setThemeModeForCheckTheme] = useState(false);
    const [themeEmail, setThemeEmail] = useState("");
    const [queriedTheme, setQueriedTheme] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    useEffect(() => {
        if (user) {
            setEmailVerified(user.emailVerified);
        }
    });

    const [likedPosts, setLikedPosts] = useState([]);
    const [commentedPosts, setCommentedPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);

    async function getUserTheme(){
        const q = query(collection(database, "users"), where("email", "==", themeEmail));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setThemeModeForCheckTheme(doc.data().author.darkTheme);
            });
        });
    }

    //get user's profile doc and set text boxes with data
    async function getUser(){
        //compare email to other users in collection
        const q = query(collection(database, "users"), where("email", "==", email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //set all the user's settings
                setOgName(doc.data().author.nickName);
                setnickName(doc.data().author.nickName);
                setBio(doc.data().author.bio);
                setAge(doc.data().author.age);
                setMajor(doc.data().author.major)
                setYear(doc.data().author.year);
                setProfilePic(doc.data().author.profilePic);
                setPrivateUser(doc.data().author.privateUser);
                setDarkTheme(doc.data().author.darkTheme);
            });
        });
    }

    //add user to database in ./users
    const editUser = async () => {
        //set doc overwrites the original doc,thus updating it
        await updateDoc(doc(database,"users",getAuth().currentUser.uid),{
            id: auth.currentUser.uid,
            email: email,
            author: {
                nickName: nickName,
                age: age,
                major: major,
                year: year,
                bio: bio,
                profilePic:profilePic,
                privateUser: privateUser,
                darkTheme: darkTheme,
            },
        });
        await handleProfClick()//redirects now logged-in user to homepage
    };
    async function handleProfClick() {
        window.location = `/profile/${user.uid}`;
    }
    //firebase will error if unsuccessful inputs ie. email is already taken or isn't an email
    async function handleUserSettings() {
        setLoading(true);
        try {
            //valid email checks
            if (email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                if (ogEmail !== email){
                    console.log("Updating Email...");
                    await updateEmail(auth.currentUser, email); //change email authen if needed
                    console.log("Email updated!");
                }
                setLoading(false);
                editUser();
            } else {
                alert("Please enter a Valid Email!")
            }
        } catch {
            alert("Error.");
        }
        setLoading(false);
    }

    //upload new user's profile pic
    const uploadFiles = (file) => {
        if (!file) return;
        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProfilePic(downloadURL);
                });
            }
        );
    };
    //compress image file
    async function doUpload(event) {
        const inputFile = event.target.files[0];
        const maxSet = {
            useWebWorker: true
        }
        try {
            const afterCompressedFile = await imageCompression(inputFile, maxSet);
            await uploadFiles(afterCompressedFile);

        } catch (error) {
            console.log(error);
        }
    }
    //change privateUser var
    const handlePrivateUser = async () => {
        setPrivateUser(!privateUser);
    };
    //change display theme
    const handleDarkTheme = async () => {
        setDarkTheme(!darkTheme);
    };
    //forgot password, moves to forgot password page
    async function handleFPClick() {
        window.location = "/forgot_password";
    }
    //verify user's email
    async function handleEVClick() {
        window.location = "/email_verification"
    }

    //open delete account window
    const handleClickOpen = () => {
        setOpen(true);
    };
    //close delete account window
    const handleClose = () => {
        setOpen(false);
    };
    async function deleteDocuments (colName, varName, checkName) {
        const postDeleteRef = collection(database, colName);

        const q = query(postDeleteRef, where(varName, "==", checkName));
        const querySnapshot = await getDocs(q);

        //delete every post and trace of posts regarding this user
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log("DELETE POST", colName, doc.id, " => ", doc.data());
            if (colName == "posts") {
                //go into users' docs and delete current post's topic from followingTopics
                deleteFollowingTopics(doc.data().topic);

                //delete nested collections from this post (comments, likes, savedBy)
                deleteNestedDocuments(colName, doc.id, "comments");
                deleteNestedDocuments(colName, doc.id, "likes");
                deleteNestedDocuments(colName, doc.id, "savedBy");

                //delete post from other users' doc (savedPosts,likedPosts,commentedPosts)
                deleteArrayElement("users", "commentedPosts", doc.id);
                deleteArrayElement("users", "likedPosts", doc.id);
                deleteArrayElement("users", "savedPosts", doc.id);
            }
            deleteDoc(doc.ref);
        });
    }

    //go into nested and delete post from users side (followingTopics)
    async function deleteFollowingTopics(topic) {
        console.log("topic: ",topic);
        const postDeleteRef = collection(database, "users");
        const userSideq = query(postDeleteRef, where("followingTopics", "array-contains",
            {topicName: topic, topicAuthor: ogEmail, id: auth.currentUser.uid}));

        const querySnapshot = await getDocs(userSideq);
        querySnapshot.forEach((doc) => {
            console.log("DELETE FOLLOWING", "followingTopics", " => ", doc.data());
            updateDoc(doc.ref, {
                followingTopics: arrayRemove({topicName: topic, topicAuthor: ogEmail, id: auth.currentUser.uid})
            });
        });
    }

    //deletes docs from (posts) nested collections ie. comments, likes, saves from to-be- deleted post
    //colname ex. posts, docname ex. pid, colName2 ex. comments
    async function deleteNestedDocuments (colName, docName, colName2) {
        const nestedCollectionRef = collection(database, colName, docName, colName2);
        const q = query(nestedCollectionRef);
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log("DELETE NESTED", colName2, doc.id, " => ", doc.data());
            deleteDoc(doc.ref);
        });
    }

    //delete all trace of deleted post from the users collection
    async function deleteArrayElement (refString, arrayName, postid) {
        const postDeleteRef = collection(database, refString);
        const userSideq = query(postDeleteRef, where(arrayName, "array-contains", postid));

        const querySnapshot = await getDocs(userSideq);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log("DELETE ARRAY ELEMENT", arrayName, postid, " => ", doc.data());

            //remove to-be-deleted post from all users's commentedPosts, likedPosts, savedPosts
            if (arrayName == "commentedPosts") {
                updateDoc(doc.ref, {
                    commentedPosts: arrayRemove(postid)
                });
            } else if (arrayName == "likedPosts") {
                updateDoc(doc.ref, {
                    likedPosts: arrayRemove(postid)
                });
            } else if (arrayName == "savedPosts") {
                updateDoc(doc.ref, {
                    savedPosts: arrayRemove(postid)
                });
            }
        });
    }

    //go into nested and delete post from users side (following)
    async function deleteFollowing() {
        const postDeleteRef = collection(database, "users");
        const userSideq = query(postDeleteRef, where("following", "array-contains",
            {email: ogEmail, id: auth.currentUser.uid}));

        const querySnapshot = await getDocs(userSideq);
        querySnapshot.forEach((doc) => {
            console.log("DELETEFOLLOWING", "following", " => ", doc.data());
            updateDoc(doc.ref, {
                following: arrayRemove({email: ogEmail, id: auth.currentUser.uid})
            });
        });
    }

    //colname ex. posts, docname ex. pid, colName2 ex. comments, varName ex. commentAuthorEmail/username
    async function deleteUserInteraction (colName, docName, colName2, varName) {

        const nestedCollectionRef = collection(database, colName, docName, colName2);
        const q = query(nestedCollectionRef, where(varName, "==", ogEmail));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(colName2, "DELETE USER INTERACTION", docName, " => ", doc.data());
            deleteDoc(doc.ref);
        });
    }
    //colname ex. posts, docname ex. pid, colName2 ex. comments, varName ex. commentAuthorEmail/username
    async function getUserInteraction() {
        //go to current user's user doc
        const docRef = doc(database, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            //take all "commentedPosts", "likedPosts", "savedPosts"
            setLikedPosts(docSnap.data().likedPosts);
            setCommentedPosts(docSnap.data().commentedPosts);
            setSavedPosts(docSnap.data().savedPosts);

            //console.log("likes", likedPosts);
            //grab that post id from interaction and delete interaction doc from nested
            likedPosts.forEach(function (docid) {
                deleteUserInteraction("posts", docid, "likes", "username");
            });
            //console.log("commented", commentedPosts);
            commentedPosts.forEach(function (docid) {
                deleteUserInteraction("posts", docid, "comments", "commentAuthorEmail");
            });
            //console.log("saves", savedPosts);
            savedPosts.forEach(function (docid) {
                deleteUserInteraction("posts", docid, "savedby", "username");
            });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }


    }
    //delete user's account
    async function handelDelete() {
        setLoading(true);
        try {

            //verification checks against user's password
            //await login(ogEmail, password);

            /** Delete all docs associated with user*/
            //await getUserInteraction();


            //await deleteFollowing();
           // await deleteDocuments("postTopics", "author.email", ogEmail);            //postTopics
          //  await deleteDocuments("posts", "author.email",  ogEmail);            // posts

            //todo: delete current user's interactions (nested) from other posts (savedPosts,likedPosts,commentedPosts)

            // todo:Turn all topics created by this user to anonymous - may be longer because all postTopics are their own post authors

            setLoading(false);
            console.log("CORRECT PASSWORD");
            /**deletes existance of user - user id doc and their authen**/
            //deleteDocuments("users", "email", ogEmail);      // users
             //await deleteU();    //authen

             //window.location = "/home"; //go to loading page
        } catch {
            alert("Incorrect Password");
        }
        setLoading(false);
    }

    //creates loading page and controls display
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
        //anon cant user settings
        if (user.email === "anonymous@unkown.com"){
            window.location.pathname = "/";
        }
        //get current user's email and settings data
        onAuthStateChanged(auth, (user) => {
            if (user&&!queried) {
                setEmail(user.email); //sets user's email to email
                setOgEmail(user.email); //for comparison later
                getUser(); //set other user var
                setThemeEmail(user.email);
                getUserTheme();
                setQueriedTheme(true);
                setQueried(true); //stops overwriting var from firebase backend
            }
        });

        //DISPLAY
        if (ogName === ""){
            return (
                <h1 style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    Loading...
                </h1>
            );
        } else {
            if (!themeModeForCheckTheme) {
                return (
                    <SettingsContainer style={{padding:'80px'}}>
                        <Container fixed>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={2}
                            >
                                {/*LEFT COLUMN*/}
                                <Grid
                                    //profile picture here
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    item xs={4}
                                >
                                    <ProfilePic src={profilePic}/>
                                    <FormControl margin="normal">
                                        <form onChange={event => doUpload(event)}>
                                            <input type="file" className="input"/>
                                        </form>
                                        <hr/>
                                        <h4>Profile Picture Loading... {progress}%</h4>
                                    </FormControl>
                                </Grid>


                                {/*RIGHT COLUMN*/}
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="stretch"
                                    item xs={8}
                                >
                                    <Grid
                                        //Display name
                                        container
                                        direction="column"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                    >
                                        <UserName>Settings:</UserName>
                                        <UserName>{ogName}</UserName>
                                    </Grid>

                                    {/*SETTINGS*/}
                                    <UserSettings>
                                        <Grid
                                            //Settings section
                                            container
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="flex-start"
                                            spacing={2}
                                        >
                                            {/*privacy settings */}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={10}
                                            >
                                                <Grid item xs>
                                                    <FormGroup>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Typography>Public</Typography>
                                                            <FormControlLabel control={
                                                                <Switch checked={privateUser}
                                                                        value={privateUser}
                                                                        onChange={handlePrivateUser}
                                                                />
                                                            }
                                                                              label=""
                                                            />
                                                            <Typography>Private</Typography>
                                                        </Stack>
                                                    </FormGroup>
                                                </Grid>
                                            </Grid>

                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={10}
                                            >
                                                <Grid item xs>
                                                    <FormGroup>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Typography>Light</Typography>
                                                            <FormControlLabel control={
                                                                <Switch checked={darkTheme}
                                                                        value={darkTheme}
                                                                        onChange={handleDarkTheme}
                                                                />
                                                            }
                                                                              label=" "
                                                            />
                                                            <Typography>Dark</Typography>
                                                        </Stack>
                                                    </FormGroup>
                                                </Grid>
                                            </Grid>

                                            {/*name*/}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={10}
                                            >
                                                <Grid item>
                                                    <p>Name:</p>
                                                </Grid>
                                                <Grid item xs>
                                                    {/*TODO: clean up the id's on this page*/}
                                                    <TextField
                                                        id="filled-start-adornment"
                                                        sx={{m: 1, width: '25ch'}}
                                                        value={nickName}
                                                        variant="filled"
                                                        inputProps={{maxLength: 50}}
                                                        onChange={(event) => {
                                                            setnickName(event.target.value);
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>

                                            {/*email*/}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={10}
                                            >
                                                <Grid item>
                                                    <p>Email:</p>
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField
                                                        id="filled-start-adornment"
                                                        sx={{m: 1, width: '25ch'}}
                                                        variant="filled"
                                                        value={email}
                                                        inputProps={{maxLength: 50}}
                                                        onChange={(event) => {
                                                            setEmail(event.target.value);
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>


                                            {/*change password*/}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={10}
                                            >
                                                <Grid item>
                                                    <p>Password:</p>
                                                </Grid>
                                                <Grid item xs>
                                                    <SaveButton>
                                                        <Button
                                                            container
                                                            direction="column"
                                                            justifyContent="center"
                                                            alignItems="center"
                                                            variant="outlined"
                                                            onClick={handleFPClick}
                                                        >Change Password
                                                        </Button>
                                                    </SaveButton>
                                                </Grid>
                                                <Grid item xs>
                                                    <SaveButton>
                                                        {emailVerified ? (
                                                            <div/>
                                                        ) : (
                                                            <Button
                                                                container
                                                                direction="column"
                                                                justifyContent="center"
                                                                alignItems="center"
                                                                variant="outlined"
                                                                onClick={handleEVClick}
                                                            >Verify Email
                                                            </Button>
                                                        )
                                                        }

                                                    </SaveButton>
                                                </Grid>
                                            </Grid>

                                            {/*bio*/}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={10}
                                            >
                                                <Grid item>
                                                    <p>Bio:</p>
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField
                                                        id="filled-start-adornment"
                                                        sx={{m: 1, width: '50ch'}}
                                                        variant="filled"
                                                        value={bio}
                                                        multiline
                                                        rows={5}
                                                        inputProps={{maxLength: 200}}
                                                        onChange={(event) => {
                                                            setBio(event.target.value);
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>

                                            {/*Age*/}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={4}
                                            >
                                                <Grid item>
                                                    <p>Age:</p>
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField
                                                        id="filled-number"
                                                        sx={{m: 1, width: '15ch'}}
                                                        //make sure that only unsigned int can be used as inputs
                                                        type={"number"}
                                                        inputProps={{min}} //min age
                                                        value={age}
                                                        onChange={(event) => {
                                                            if (event.target.value === "") {
                                                                setAge(event.target.value);
                                                                return;
                                                            }
                                                            const value = +event.target.value;
                                                            if (value < min) {
                                                                setAge(min);
                                                            } else {
                                                                setAge(value);
                                                            }
                                                        }}
                                                        variant="filled"
                                                    />
                                                </Grid>
                                            </Grid>

                                            {/*Year*/}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={4}
                                            >
                                                <Grid item>
                                                    <p>Year:</p>
                                                </Grid>
                                                <Grid item xs>
                                                    <FormControl variant="filled" sx={{m: 1, minWidth: 120}}>
                                                        <InputLabel id="select-filled-label"></InputLabel>
                                                        <Select
                                                            labelId="select-filled-label"
                                                            id="select-filled"
                                                            value={year}
                                                            onChange={(event) => {
                                                                setYear(event.target.value);
                                                            }}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {years.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>

                                            {/*Major*/}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={10}
                                            >
                                                <Grid item>
                                                    <p>Major:</p>
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField
                                                        id="filled-number"
                                                        sx={{m: 1, width: '50ch'}}
                                                        variant="filled"
                                                        value={major}
                                                        inputProps={{maxLength: 100}}
                                                        onChange={(event) => {
                                                            setMajor(event.target.value);
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </UserSettings>

                                    {/*BUTTONS*/}
                                    <Stack direction="row" spacing={30} alignItems="center">
                                        {/*SAVE CHANGES*/}
                                        <SaveButton>
                                            <Button
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                                variant="contained"
                                                onClick={handleUserSettings}
                                            >
                                                Save Settings
                                            </Button>
                                        </SaveButton>

                                        {/*DELETE ACCOUNT*/}
                                        <div>
                                            <Button variant="text" onClick={handleClickOpen}>
                                                Delete Account
                                            </Button>
                                            <Dialog open={open} onClose={handleClose}>
                                                <DialogTitle>Delete Account</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Are you sure you want to delete your Boiler Breakouts Account?
                                                        To delete your account, please enter your password.
                                                        We'll take care of the rest.
                                                    </DialogContentText>
                                                    <TextField
                                                        autoFocus
                                                        value={password}
                                                        margin="dense"
                                                        id="deletion-password"
                                                        label="Password"
                                                        fullWidth
                                                        variant="standard"
                                                        onChange={(event) => {
                                                            setPassword(event.target.value);
                                                        }}
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>Cancel</Button>
                                                    <Button onClick={handelDelete}>Delete Account</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Container>
                    </SettingsContainer>
                );
            } else {
                return (
                    <SettingsContainerBlack style={{padding:'80px'}}>
                        <Container fixed>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={2}
                            >
                                {/*LEFT COLUMN*/}
                                <Grid
                                    //profile picture here
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    item xs={4}
                                >
                                    <ProfilePic src={profilePic}/>
                                    <FormControl margin="normal" style={{color:'rgba(255, 255, 255, 0.85)'}}>
                                        <form onChange={event => doUpload(event)}>
                                            <input type="file" className="input"/>
                                        </form>
                                        <hr/>
                                        <h4 style={{color:'rgba(255, 255, 255, 0.85)'}}>Profile Picture Loading... {progress}%</h4>
                                    </FormControl>
                                </Grid>


                                {/*RIGHT COLUMN*/}
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="stretch"
                                    item xs={8}
                                >
                                    <Grid
                                        //Display name
                                        container
                                        direction="column"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                    >
                                        <UserNameBlack>Settings:</UserNameBlack>
                                        <UserNameBlack>{ogName}</UserNameBlack>
                                    </Grid>

                                    {/*SETTINGS*/}
                                    <UserSettings>
                                        <Grid
                                            //Settings section
                                            container
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="flex-start"
                                            spacing={2}
                                        >
                                            {/*privacy settings */}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={10}
                                            >
                                                <Grid item xs>
                                                    <FormGroup>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Typography style={{color:'rgba(255, 255, 255, 0.85)'}}>Public</Typography>
                                                            <FormControlLabel control={
                                                                <Switch checked={privateUser}
                                                                        value={privateUser}
                                                                        onChange={handlePrivateUser}

                                                                />
                                                            }
                                                                              label=""
                                                                              style={{background:'grey', borderRadius:'5px'}}
                                                            />
                                                            <Typography style={{color:'rgba(255, 255, 255, 0.85)'}}>Private</Typography>
                                                        </Stack>
                                                    </FormGroup>
                                                </Grid>
                                            </Grid>

                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={10}
                                            >
                                                <Grid item xs>
                                                    <FormGroup>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Typography style={{color:'rgba(255, 255, 255, 0.85)'}}>Light</Typography>
                                                            <FormControlLabel control={
                                                                <Switch checked={darkTheme}
                                                                        value={darkTheme}
                                                                        onChange={handleDarkTheme}
                                                                />
                                                            }
                                                                              label=" "
                                                                              style={{background:'grey', borderRadius:'5px'}}
                                                            />
                                                            <Typography style={{color:'rgba(255, 255, 255, 0.85)'}}>Dark</Typography>
                                                        </Stack>
                                                    </FormGroup>
                                                </Grid>
                                            </Grid>

                                            {/*name*/}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={10}
                                            >
                                                <Grid item>
                                                    <p style={{color:'rgba(255, 255, 255, 0.85)'}}>Name:</p>
                                                </Grid>
                                                <Grid item xs>
                                                    {/*TODO: clean up the id's on this page*/}
                                                    <TextField
                                                        id="filled-start-adornment"
                                                        sx={{m: 1, width: '25ch', background:'grey', borderRadius:'8px'}}
                                                        value={nickName}
                                                        variant="filled"
                                                        inputProps={{maxLength: 50}}
                                                        onChange={(event) => {
                                                            setnickName(event.target.value);
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>

                                            {/*email*/}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={10}
                                            >
                                                <Grid item>
                                                    <p style={{color:'rgba(255, 255, 255, 0.85)'}}>Email:</p>
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField
                                                        id="filled-start-adornment"
                                                        sx={{m: 1, width: '25ch', background:'grey', borderRadius:'8px'}}
                                                        variant="filled"
                                                        value={email}
                                                        inputProps={{maxLength: 50}}
                                                        onChange={(event) => {
                                                            setEmail(event.target.value);
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>


                                            {/*change password*/}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={10}
                                            >
                                                <Grid item>
                                                    <p style={{color:'rgba(255, 255, 255, 0.85)'}}>Password:</p>
                                                </Grid>
                                                <Grid item xs>
                                                    <SaveButton>
                                                        <Button
                                                            container
                                                            direction="column"
                                                            justifyContent="center"
                                                            alignItems="center"
                                                            variant="outlined"
                                                            onClick={handleFPClick}
                                                        >Change Password
                                                        </Button>
                                                    </SaveButton>
                                                </Grid>
                                                <Grid item xs>
                                                    <SaveButton>
                                                        <Button
                                                            container
                                                            direction="column"
                                                            justifyContent="center"
                                                            alignItems="center"
                                                            variant="outlined"
                                                            onClick={handleEVClick}
                                                        >Verify Email
                                                        </Button>
                                                    </SaveButton>
                                                </Grid>
                                            </Grid>

                                            {/*bio*/}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={10}
                                            >
                                                <Grid item>
                                                    <p style={{color:'rgba(255, 255, 255, 0.85)'}}>Bio:</p>
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField
                                                        id="filled-start-adornment"
                                                        sx={{m: 1, width: '50ch', background:'grey', borderRadius:'8px'}}
                                                        variant="filled"
                                                        value={bio}
                                                        multiline
                                                        rows={5}
                                                        inputProps={{maxLength: 200}}
                                                        onChange={(event) => {
                                                            setBio(event.target.value);
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>

                                            {/*Age*/}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={4}
                                            >
                                                <Grid item>
                                                    <p style={{color:'rgba(255, 255, 255, 0.85)'}}>Age:</p>
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField
                                                        id="filled-number"
                                                        sx={{m: 1, width: '15ch', background:'grey', borderRadius:'8px'}}
                                                        //make sure that only unsigned int can be used as inputs
                                                        type={"number"}
                                                        inputProps={{min}} //min age
                                                        value={age}
                                                        onChange={(event) => {
                                                            if (event.target.value === "") {
                                                                setAge(event.target.value);
                                                                return;
                                                            }
                                                            const value = +event.target.value;
                                                            if (value < min) {
                                                                setAge(min);
                                                            } else {
                                                                setAge(value);
                                                            }
                                                        }}
                                                        variant="filled"
                                                    />
                                                </Grid>
                                            </Grid>

                                            {/*Year*/}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={4}
                                            >
                                                <Grid item>
                                                    <p style={{color:'rgba(255, 255, 255, 0.85)'}}>Year:</p>
                                                </Grid>
                                                <Grid item xs>
                                                    <FormControl variant="filled" sx={{m: 1, minWidth: 120, background:'grey', borderRadius:'8px'}}>
                                                        <InputLabel id="select-filled-label"></InputLabel>
                                                        <Select
                                                            labelId="select-filled-label"
                                                            id="select-filled"
                                                            value={year}
                                                            onChange={(event) => {
                                                                setYear(event.target.value);
                                                            }}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {years.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>

                                            {/*Major*/}
                                            <Grid container
                                                  wrap="nowrap"
                                                  spacing={2}
                                                  justifyContent="center"
                                                  item xs={10}
                                            >
                                                <Grid item>
                                                    <p style={{color:'rgba(255, 255, 255, 0.85)'}}>Major:</p>
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField
                                                        id="filled-number"
                                                        sx={{m: 1, width: '50ch', background:'grey', borderRadius:'8px'}}
                                                        variant="filled"
                                                        value={major}
                                                        inputProps={{maxLength: 100}}
                                                        onChange={(event) => {
                                                            setMajor(event.target.value);
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </UserSettings>

                                    {/*BUTTONS*/}
                                    <Stack direction="row" spacing={30} alignItems="center">
                                        {/*SAVE CHANGES*/}
                                        <SaveButton>
                                            <Button
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                                variant="contained"
                                                onClick={handleUserSettings}
                                            >
                                                Save Settings
                                            </Button>
                                        </SaveButton>

                                        {/*DELETE ACCOUNT*/}
                                        <div>
                                            <Button variant="text" onClick={handleClickOpen}>
                                                Delete Account
                                            </Button>
                                            <Dialog open={open} onClose={handleClose}>
                                                <DialogTitle>Delete Account</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Are you sure you want to delete your Boiler Breakouts Account?
                                                        To delete your account, please enter your password.
                                                        We'll take care of the rest.
                                                    </DialogContentText>
                                                    <TextField
                                                        autoFocus
                                                        value={password}
                                                        margin="dense"
                                                        id="deletion-password"
                                                        label="Password"
                                                        fullWidth
                                                        variant="standard"
                                                        onChange={(event) => {
                                                            setPassword(event.target.value);
                                                        }}
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>Cancel</Button>
                                                    <Button onClick={handelDelete}>Delete Account</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Container>
                    </SettingsContainerBlack>
                );
            }
        }
    } else if (error) {
        alert("There was an authentication error.")
        window.location.pathname = "/"
        //return <div>There was an authentication error.</div>;
    } else {
        window.location.pathname = "/"
    }

}

export default SettingsSection;
