//import InnerTopicSection from "../components/InnerTopicSection/index";
import * as React from 'react';
import NavSection from "../components/NavbarSection";
import SidebarSection from "../components/SidebarSection";
//document.querySelector('meta[name="theme-color"]').setAttribute('content', '#232323');
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useLocation} from "react-router-dom";
function Inner_topic() {
    const { state , topicName} = useLocation();
    return (
        <>
            <SidebarSection/>
            <NavSection/>

            <Typography style={{marginTop:"5%", marginLeft:"10%"}}>
                <h1>Topic Name: {topicName}</h1>
                <h2>Topic Author: {state}</h2>
                <Button>Follow</Button>
                <Button>Unfollow</Button>
            </Typography>
        </>



    );
}

export default Inner_topic;
