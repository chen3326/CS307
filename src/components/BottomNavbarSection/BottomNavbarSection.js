import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, database, logout} from "../../firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";

import {
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";

import {
    // Nav,
    // NavbarContainer,
    // NavItem,
    // NavLinks,
    NavLogo,
    // NavMenu,
    NavBtn,
    NavBtnLink, BotNav, BotNavDark,
    // NavBtnLinkR, NavDark
} from './BottomNavbarElements';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FolderIcon from "@mui/icons-material/Folder";
import BottomNavigation from "@mui/material/BottomNavigation";
import {Side, SidebarContainer, SideBtn, SideBtnLink, SideLogo} from "../SidebarSection/SidebarElements";
import HomeIcon from "@mui/icons-material/Home";
import SavedIcon from "@mui/icons-material/BookmarkAdded";
import ContactsIcon from "@mui/icons-material/Contacts";
import {Paper} from "@mui/material";

// const pages = ['Settings', 'Profile', 'Logout'];
// const settings = ['Profile'];

function BottomNavbarSection (){
    const [themeModeForCheckTheme, setThemeModeForCheckTheme] = useState(false);
    const [themeEmail, setThemeEmail] = useState("");
    const [queriedTheme, setQueriedTheme] = useState(false);

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // Navigation for menu items
    async function handleMenuClick(pageName) {
        if (pageName === "Home") {
            window.location.href = `/home`;
        } else if (pageName === "Settings") {
            window.location.href = `/settings`;
        } else if (pageName === "Profile") {
            window.location.href = `/profile/${user.uid}`;
        } else {
            try {
                await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                    loggedIn: false,
                });
                await logout();
            } catch {
                alert("Error!");
            }
        }
    }

    // Navigation for menu items
    async function handleProfileClick() {
        window.location.href = `/profile/${user.uid}`;
    }

    async function checkPage(pageName) {
        if (pageName === "Logout") {
            return (
                <NavBtn>
                    <NavBtnLink href="\"> Log out </NavBtnLink>
                </NavBtn>
            )
        } else {
            return (
                <NavBtn>
                    <Button
                        key={pageName}
                        onClick={() => handleMenuClick(pageName)}
                        sx={{my: 2, color: 'white', display: 'block'}}
                    >
                        {pageName}
                    </Button>
                </NavBtn>
            )
        }
    }

    async function getUserTheme(){
        const q = query(collection(database, "users"), where("email", "==", themeEmail));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setThemeModeForCheckTheme(doc.data().author.darkTheme);
            });
        });
    }

    // TODO: template code
    const [value, setValue] = React.useState('recents');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {

        onAuthStateChanged(auth, (user) => {
            if (user&&!queriedTheme) {
                setThemeEmail(user.email); //sets user's email to email
                getUserTheme()
                setQueriedTheme(true); //stops overwriting var from firebase backend
            }
        });

        if (!themeModeForCheckTheme) {
            return (
                <BotNav>
                    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#0D67B5'}} elevation={3}>
                        <BottomNavigation
                            sx={{ backgroundColor: '#0D67B5', marginTop: '5px'}}
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        >
                            <BottomNavigationAction sx={{color: 'white'}} label="Home" href="/home" icon={<HomeIcon />} />
                            <BottomNavigationAction sx={{color: 'white'}} label="Saved" href="/saved" icon={<SavedIcon />} />
                            <BottomNavigationAction sx={{color: 'white'}} label="Interactions" href="/interactions" icon={<ContactsIcon />} />
                        </BottomNavigation>
                    </Paper>
                </BotNav>
            );
        } else {
            // todo: dark mode
            return (
                <BotNavDark>
                    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <BottomNavigation
                            sx={{ backgroundColor: 'slategrey', marginTop: '5px'}}
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        >
                            <BottomNavigationAction sx={{color: 'white'}} label="Home" href="/home" icon={<HomeIcon />} />
                            <BottomNavigationAction sx={{color: 'white'}} label="Saved" href="/saved" icon={<SavedIcon />} />
                            <BottomNavigationAction sx={{color: 'white'}} label="Interactions" href="/interactions" icon={<ContactsIcon />} />
                        </BottomNavigation>
                    </Paper>
                </BotNavDark>
            );
        }
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }
}

export default BottomNavbarSection;