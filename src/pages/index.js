import HeroSection from '../components/HeroSection';

import NavSection from "../components/NavbarSection";
import SidebarSection from "../components/SidebarSection";

import MakePost from "../components/MakePostSection";
import BottomNavbarSection from "../components/BottomNavbarSection/BottomNavbarSection";

import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {PostDisplayContainer, PostDisplayContainerDark} from "../components/PostDisplaySection/PostDisplayElements";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useState} from "react";
import {addDoc, arrayUnion, doc, updateDoc} from "firebase/firestore";
import {auth, database} from "../firebase";
import {getAuth} from "firebase/auth";
import PostDisplaySection from "../components/PostDisplaySection";
import TimelineSection from "../components/PostDisplaySection/timeline";

function Home() {
    const [allposts, setAllposts] = useState(false);

    const setdisplaymode = async () => {
        setAllposts(!allposts)
    };


    //todo: bug with allowing comments when they should not be allowed
    return (
        <>
            <SidebarSection/>
            <NavSection/>

            <HeroSection/>

            <PostDisplayContainer>
                {allposts ? (
                    <Button
                        variant="outlined"
                        onClick={setdisplaymode} href="">
                        <div> displaying all the posts</div>
                    </Button>
                ) : (
                    <Button
                        variant="outlined"
                        onClick={setdisplaymode} href="">
                        <div> displaying posts in the timeline</div>
                    </Button>
                )}

            </PostDisplayContainer>

            {allposts ? (
                <PostDisplaySection/>
            ) : (
                <TimelineSection/>
            )}


            <MakePost/>

            <BottomNavbarSection/>
        </>
    );
}

export default Home;
