import React, {useEffect, useState} from 'react';


import {auth, database, useAuth} from "../../firebase";
import {getDocs, collection, deleteDoc, doc, onSnapshot, query, where} from "firebase/firestore";

import SettingsSection from "./Setting";
import {Container} from "@mui/material";

//todo: get users pull from doc work through the authen

function GetUserSettingProfileSection() {
    /*
    //based on  https://github.com/firebase/snippets-web/blob/1c4c6834f310bf53a98b3fa3c2e2191396cacd69/snippets/firestore-next/test-firestore/listen_document_local.js#L8-L13
    const currentUser = useAuth();
    const uEmail = currentUser?.email; //gets current user's email
    //console.log(uEmail);
    const q = query(collection(database, "users"), where("email", "==", uEmail));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data().email);
            console.log(doc.data().id);
            //console.log(doc.data().email);
            console.log(doc.data().author?.nickName);
            console.log(doc.data().author?.bio);
            console.log(doc.data().author?.age);
            console.log(doc.data().author?.year);
        });
        console.log("Current cities in CA: ----------------------------------------------------", users.join(", "));
    });

    */


    //based on post index
    const currentUser = useAuth();
    const uEmail = currentUser?.email;//gets current user's email
    //uEmail does work, just not on the first try
    //console.log(uEmail);


    const [userList, setUserList] = useState([]); //holds users profiles
    const userCollectionRef = collection(database, "users"); //collections in firebase keep the data tied to the user

    useEffect(() => {
        //switched uEmail to matcha@mm.com
        const unsubscribe = onSnapshot(query(userCollectionRef, where("email", "==", "matcha@mm.com")), snapshot =>{
            setUserList(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })

        return unsubscribe;

    });


    /**
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(database, "posts");
    useEffect(() => {
        const unsubscribe = onSnapshot(query(postsCollectionRef, orderBy('timestamp', 'desc')), snapshot =>{

            setPostList(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })

        return unsubscribe;

    });



     //when I put any parameters, even empty, directs to blank page
    return (

        <Container>

            {setUserList.map((user) => {
                return (
                    <SettingsSection
                        //pass current user's og inputs to Settings.js to display properly
                        userRef={userCollectionRef}
                        uEmail={user?.email}
                        uName={user?.author?.nickName}
                        uYear={user?.author?.year}
                        uAge={user?.author?.age}
                        uBio={user?.author?.bio}
                        uMajor={user?.author?.major}
                    />
                )
            })}

        </Container>

    );
    */
    return (

        <Container>

            <h1>Hello! Welcome {uEmail}</h1>
            <SettingsSection
            />

        </Container>

    );

}
export default GetUserSettingProfileSection;
