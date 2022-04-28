// import React, {useState} from 'react';
// import LogoPhoto from '../../images/Boiler Breakouts-logos.jpeg';
//
// import {
//     Nav,
//     NavbarContainer,
//     NavItem,
//     NavLinks,
//     NavLogo,
//     NavMenu,
//     NavBtn,
//     NavBtnLink, NavBtnLinkR, NavDark
// } from './NavbarElements';
// import {useAuthState} from "react-firebase-hooks/auth";
// import {auth, database} from "../../firebase";
// import Button from "@material-ui/core/Button";
// import {collection, onSnapshot, query, where} from "firebase/firestore";
// import {onAuthStateChanged} from "firebase/auth";
//
//
// function Navbar(){
//     const [user, loading, error] = useAuthState(auth);
//     async function handelsettingsclick() {
//         window.location = `/settings`;
//     }
//
//     async function handleProfClick() {
//         window.location = `/profile/${user.uid}`;
//     }
//
//     const [themeModeForCheckTheme, setThemeModeForCheckTheme] = useState(false);
//     const [themeEmail, setThemeEmail] = useState("");
//     const [queriedTheme, setQueriedTheme] = useState(false);
//
//     async function getUserTheme(){
//         const q = query(collection(database, "users"), where("email", "==", themeEmail));
//         const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 setThemeModeForCheckTheme(doc.data().author.darkTheme);
//             });
//         });
//     }
//
//     if (loading) {
//         return <div> Loading... </div>;
//     } else if (user) {
//         onAuthStateChanged(auth, (user) => {
//             if (user&&!queriedTheme) {
//                 setThemeEmail(user.email); //sets user's email to email
//                 getUserTheme();
//                 setQueriedTheme(true); //stops overwriting var from firebase backend
//             }
//         });
//         if (!themeModeForCheckTheme) {
//             return (
//                 <>
//                     <Nav>
//                         <NavbarContainer>
//                             <img src={LogoPhoto} alt=''/>
//                             <NavLogo>
//                                 Boiler Breakouts
//                             </NavLogo>
//
//                             <NavBtn>
//                                 <Button onClick={handelsettingsclick} style={{color: 'white'}}> Settings </Button>
//                             </NavBtn>
//
//                             <NavBtn>
//                                 <Button onClick={handleProfClick} style={{color: 'white'}}
//                                 > profile
//                                 </Button>
//                             </NavBtn>
//
//                             <NavBtn style={{marginRight: '-200px'}}>
//                                 <NavBtnLink href="\"> Log out </NavBtnLink>
//                             </NavBtn>
//                         </NavbarContainer>
//                     </Nav>
//                 </>
//             );
//         } else {
//             return (
//                 <>
//                     <NavDark>
//                         <NavbarContainer>
//
//                             <img src={LogoPhoto} alt=''/>
//                             <NavLogo>
//                                 Boiler Breakouts
//                             </NavLogo>
//
//                             <NavBtn>
//                                 <Button onClick={handelsettingsclick} style={{color: 'white'}}> Settings </Button>
//                             </NavBtn>
//
//                             <NavBtn>
//                                 <Button onClick={handleProfClick} style={{color: 'white'}}
//                                 > profile
//                                 </Button>
//
//                             </NavBtn>
//
//                             <NavBtn style={{marginRight: '-200px'}}>
//                                 <NavBtnLink href="\"> Log out </NavBtnLink>
//                             </NavBtn>
//                         </NavbarContainer>
//                     </NavDark>
//
//                 </>
//             );
//         }
//
//     } else if (error) {
//         return <div>There was an authentication error.</div>;
//     } else {
//         return <div>There was an authentication error.</div>;
//     }
//
//
//
//
// }
//
// export default Navbar;

// import * as React, {useState} from 'react';
//Stylesheets
// import "./nav.css";

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
import {getAuth, onAuthStateChanged} from "firebase/auth";
import logo from '../../images/cat_pic.jpg';

import {
    // Nav,
    // NavbarContainer,
    // NavItem,
    // NavLinks,
    NavLogo,
    // NavMenu,
    NavBtn,
    NavBtnLink,
    // NavBtnLinkR, NavDark
} from './NavbarElements';

const pages = ['Settings', 'Profile', 'Logout'];
const settings = ['Profile'];

const Navbar = () => {
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

    // const [userOnline, setUserOnline] = useState(false);

    // useEffect(() => {
    //     setUserOnline(true)
    // }, [userOnline]);
    //
    // const updateOnlineStatus = async () => {
    //     await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
    //         loggedIn: userOnline,
    //     });
    // }

    const [profilePic, setProfilePic] = useState("");

    async function getProfilePic(){
        const q = query(collection(database, "users"), where("id", "==", getAuth().currentUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setProfilePic(doc.data().author.profilePic);
            });
        });
    }

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

    // <NavBtn style={{marginRight: '-200px'}}>
    //     <NavBtnLink href="\"> Log out </NavBtnLink>
    // </NavBtn>

    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {

        getProfilePic()

        onAuthStateChanged(auth, (user) => {
            if (user&&!queriedTheme) {
                setThemeEmail(user.email); //sets user's email to email
                getUserTheme()
                setQueriedTheme(true); //stops overwriting var from firebase backend
            }
        });

        if (!themeModeForCheckTheme) {
            return (
                <AppBar position="sticky">
                    <Container maxWidth="xl">
                        <Toolbar>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                className={"firstType"}
                                sx={{
                                    mr: 2,
                                    display: {
                                        xs: 'none',
                                        md: 'flex'
                                    },
                                    ml: 15
                                }}
                            >
                                <NavLogo onClick={() => handleMenuClick("Home")}>
                                    Boiler Breakouts
                                </NavLogo>
                            </Typography>

                            <Box sx={{
                                flexGrow: 1,
                                display: {
                                    xs: 'flex',
                                    md: 'none'
                                }}}
                            >
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                    // padding: const EdgeInsets.all(0.0),
                                    // constraints: BoxConstraints(),
                                    sx={{
                                        minHeight: 0,
                                        minWidth: 0,
                                        padding: 0
                                    }}
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: {
                                            xs: 'flex',
                                            md: 'true'
                                        },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem
                                            key={page}
                                            onClick={() => handleMenuClick(page)}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                className={"secondType"}
                                sx={{
                                    flexGrow: 1,
                                    display: {
                                        xs: 'flex',
                                        md: 'none'
                                    }}}
                            >
                                <NavLogo onClick={() => handleMenuClick("Home")}>
                                    Boiler Breakouts
                                </NavLogo>
                            </Typography>
                            <Box
                                className={"secondBox"}
                                sx={{
                                    flexGrow: 1,
                                    display: {
                                        xs: 'none',
                                        md: 'flex'
                                    },
                                    justifyContent: 'space-evenly'
                                }}>
                                {pages.map((page) => (
                                    // <NavBtn>
                                        <Button
                                            key={page}
                                            onClick={() => handleMenuClick(page)}
                                            sx={{
                                                my: 2,
                                                color: 'white',
                                                display: 'block'}}
                                        >
                                            {page}
                                        </Button>
                                    // </NavBtn>
                                ))}
                            </Box>

                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleProfileClick}
                                        sx={{
                                            minHeight: 0,
                                            minWidth: 0,
                                            padding: 0
                                        }}
                                        // sx={{p: 0}}
                                    >
                                        <Avatar src={profilePic}/>
                                    </IconButton>
                                </Tooltip>
                                {/*<Menu*/}
                                {/*    sx={{mt: '45px'}}*/}
                                {/*    id="menu-appbar"*/}
                                {/*    anchorEl={anchorElUser}*/}
                                {/*    anchorOrigin={{*/}
                                {/*        vertical: 'top',*/}
                                {/*        horizontal: 'right',*/}
                                {/*    }}*/}
                                {/*    keepMounted*/}
                                {/*    transformOrigin={{*/}
                                {/*        vertical: 'top',*/}
                                {/*        horizontal: 'right',*/}
                                {/*    }}*/}
                                {/*    open={Boolean(anchorElUser)}*/}
                                {/*    onClose={handleCloseUserMenu}*/}
                                {/*>*/}
                                {/*    {settings.map((setting) => (*/}
                                {/*        <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
                                {/*            <Typography textAlign="center">{setting}</Typography>*/}
                                {/*        </MenuItem>*/}
                                {/*    ))}*/}
                                {/*</Menu>*/}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            );
        } else {
            return (
                <AppBar
                    position="sticky"
                    sx={{
                        background: 'slategrey'
                    }}
                >
                    <Container maxWidth="xl">
                        <Toolbar>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                className={"firstType"}
                                sx={{
                                    mr: 2,
                                    display: {
                                        xs: 'none',
                                        md: 'flex'
                                    },
                                    ml: 15
                                }}
                            >
                                <NavLogo onClick={() => handleMenuClick("Home")}>
                                    Boiler Breakouts
                                </NavLogo>
                            </Typography>

                            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                    sx={{
                                        minHeight: 0,
                                        minWidth: 0,
                                        padding: 0
                                    }}
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: {xs: 'flex', md: 'true'},
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem
                                            key={page}
                                            onClick={() => handleMenuClick(page)}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                className={"secondType"}
                                sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                            >
                                <NavLogo onClick={() => handleMenuClick("Home")}>
                                    Boiler Breakouts
                                </NavLogo>
                            </Typography>
                            <Box
                                className={"secondBox"}
                                sx={{
                                    flexGrow: 1,
                                    display: {
                                        xs: 'none', md: 'flex'
                                    },
                                    justifyContent: 'space-evenly'
                                }}>
                                {pages.map((page) => (
                                    // <NavBtn>
                                        <Button
                                            key={page}
                                            onClick={() => handleMenuClick(page)}
                                            sx={{my: 2, color: 'white', display: 'block'}}
                                        >
                                            {page}
                                        </Button>
                                    // </NavBtn>
                                ))}
                            </Box>

                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleProfileClick}
                                        sx={{
                                            minHeight: 0,
                                            minWidth: 0,
                                            padding: 0
                                        }}
                                        // sx={{p: 0}}
                                    >
                                        <Avatar src={profilePic}/>
                                    </IconButton>
                                </Tooltip>
                                {/*<Menu*/}
                                {/*    sx={{mt: '45px'}}*/}
                                {/*    id="menu-appbar"*/}
                                {/*    anchorEl={anchorElUser}*/}
                                {/*    anchorOrigin={{*/}
                                {/*        vertical: 'top',*/}
                                {/*        horizontal: 'right',*/}
                                {/*    }}*/}
                                {/*    keepMounted*/}
                                {/*    transformOrigin={{*/}
                                {/*        vertical: 'top',*/}
                                {/*        horizontal: 'right',*/}
                                {/*    }}*/}
                                {/*    open={Boolean(anchorElUser)}*/}
                                {/*    onClose={handleCloseUserMenu}*/}
                                {/*>*/}
                                {/*    {settings.map((setting) => (*/}
                                {/*        <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
                                {/*            <Typography textAlign="center">{setting}</Typography>*/}
                                {/*        </MenuItem>*/}
                                {/*    ))}*/}
                                {/*</Menu>*/}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            );
        }
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }
}

export default Navbar;