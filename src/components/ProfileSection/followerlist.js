import React, {useEffect, useState} from 'react';
import {collection, getDocs, query, where} from "firebase/firestore";
import {auth, database, useAuth} from "../../firebase";

function Followinglist() {

    const [FollowingList, setFollowingList] = useState(["123", "312", "abc"]);

    const [FollowingCollectionRef, setFollowingCollectionRef] = useState("");

    useEffect(() => {

        const getFollowingList = async () => {
            const q = query(collection(database, "users"), where("email", "==",auth.currentUser.email ));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {

                setFollowingCollectionRef(collection(database,"users",doc.id,"following"))
            });
            const data = await getDocs(FollowingCollectionRef);
            setFollowingList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };

        getFollowingList();
    });

    return (


        <div>
            {FollowingList.map((person) => {
                return (
                    <div>{person?.followedemail}</div>

                )


            })}
        </div>


    );
}

export default Followinglist;



