import * as React from 'react';
import {AppBar, Box, Button, Card, CardActions, CardContent, Container, useTheme} from "@mui/material";
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import PropTypes from 'prop-types';

import {
    FollowButton,
    ProfileContainer,
    ProfilePic, TabCard, UserName, UserStats,
} from './ProfileElements';

import pic from "../../images/cat_pic.jpg";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (

        <Box sx={{ bgcolor: 'orange', borderRadius: '10px'}}>
            <AppBar position="static"sx={{borderRadius: '10px'}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Posts" {...a11yProps(0)} />
                    <Tab label="Liked" {...a11yProps(1)} />
                    <Tab label="Saved" {...a11yProps(2)} />
                    <Tab label="Comments" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <TabCard>
                        <OutlinedCard/>
                    </TabCard>
                    <TabCard>
                        <OutlinedCard/>
                    </TabCard>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                <TabCard>
                    <OutlinedCard/>
                </TabCard>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                <TabCard>
                    <OutlinedCard/>
                </TabCard>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                <TabCard>
                    <OutlinedCard/>
                </TabCard>
                </TabPanel>
        </Box>
    );
}

const card = (
    <React.Fragment>
        <CardContent>
            {/*<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>*/}
            {/*    Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.*/}
            {/*</Typography>*/}
            <Typography variant="h6" component="div">
                Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
        </CardContent>
        <CardActions>
            <Container>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center">
                    <ThumbUpAltRoundedIcon/>
                    <TextsmsRoundedIcon/>
                </Grid>
            </Container>
            <Container>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center">
                    <BookmarkRoundedIcon/>
                </Grid>
            </Container>
        </CardActions>
    </React.Fragment>
);

function OutlinedCard() {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}


function ProfileSection() {


    return (
        <ProfileContainer>
            <Container fixed>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={2}
                >

                    <Grid
                        // LHS Column
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                        item xs={4}
                    >
                        <ProfilePic src={pic}/>

                    </Grid>

                    <Grid
                        // RHS Column
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="stretch"
                        item xs={8}
                    >

                        <Grid
                            // Name and Follow Button
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <UserName>Cat Dude</UserName>

                            <Grid
                                // Follow Button container
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                            >
                                <FollowButton>
                                    <Button
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        // fullWidth={true}

                                        variant="outlined">Follow</Button>
                                </FollowButton>

                            </Grid>

                        </Grid>


                        <UserStats>
                        <Grid
                            // User Stats
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={2}
                        >
                            <Grid
                                container
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                item xs={4}
                            >
                                <p>Posts:</p>
                                <Button variant="text">####</Button>
                            </Grid>
                            <Grid container
                                  direction="column"
                                  alignItems="center"
                                  justifyContent="center"
                                  item xs={4}
                            >
                                <p>Followers:</p>
                                <Button variant="text">####</Button>
                            </Grid>
                            <Grid container
                                  direction="column"
                                  alignItems="center"
                                  justifyContent="center"
                                  item xs={4}
                            >
                                <p>Following:</p>
                                <Button variant="text">####</Button>
                            </Grid>
                        </Grid>
                        </UserStats>


                        <FullWidthTabs/>

                    </Grid>
                </Grid>
            </Container>
        </ProfileContainer>


        // <ProfileContainer> {/*Page*/}
        //     <ProfileContentContainer>
        //         {/*Content Wrapper*/}
        //
        //         {/*<ProfilePic src={pic}/>*/}
        //         <ProfilePicContainer>
        //
        //             <ProfilePic src={pic}/>
        //         </ProfilePicContainer>
        //
        //         <ProfileContent>
        //
        //             <UserName>Cat Dude</UserName>
        //
        //             <FollowButton>Follow</FollowButton>
        //
        //             <ProfileStats>
        //                 <PostsStat>Posts: 87</PostsStat>
        //                 <FollowersStat>90</FollowersStat>
        //                 <FollowingStat>10</FollowingStat>
        //             </ProfileStats>
        //
        //             <PostContainer>
        //                 <Tabs>
        //                     <Posts></Posts>
        //                     <Liked></Liked>
        //                     <Comments></Comments>
        //                     <Saved></Saved>
        //                 </Tabs>
        //
        //             </PostContainer>
        //
        //             <ProfileText>
        //                 stuff
        //
        //             </ProfileText>
        //
        //         </ProfileContent>
        //
        //    </ProfileContentContainer>
        //
        //
        //
        //
        //
        // </ProfileContainer>
    );
}

export default ProfileSection;
