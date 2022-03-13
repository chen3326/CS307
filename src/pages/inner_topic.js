//import InnerTopicSection from "../components/InnerTopicSection/index";
import * as React from 'react';
import NavSection from "../components/NavbarSection";
import SidebarSection from "../components/SidebarSection";
//document.querySelector('meta[name="theme-color"]').setAttribute('content', '#232323');
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useLocation} from "react-router-dom";
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
function Inner_topic() {
    const { state , topicAuthor} = useLocation();


    return (
        <>
            <SidebarSection/>
            <NavSection/>

            <Typography style={{marginTop:"5%", marginLeft:"10%"}}>
                <h1>Topic Name: {state}</h1>
                <h2>Topic Author: {topicAuthor}</h2>
                <label>Unfollow</label>
                <Switch/>
                <label>Follow</label>
            </Typography>
        </>



    );
}

export default Inner_topic;
