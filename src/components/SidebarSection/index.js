import React from 'react';


import {
    Side,
    SidebarContainer,
    SideItem,
    SideLinks,
    SideLogo,
    SideMenu,
    SideBtn,
    SideBtnLink
} from './SidebarElements';

import HomeIcon from '@mui/icons-material/Home';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import GavelIcon from '@mui/icons-material/Gavel';
function Sidebar(){

    return (
        <>
            <Side >
                <SidebarContainer>
                    <SideLogo>
                        <GavelIcon/>
                    </SideLogo>
                    <SideMenu>
                        <SideItem>
                            <SideLinks
                                to='aboutMe'
                                smooth={true}
                                duration={500}
                                spy={false}
                                exact='true'
                                offset={-80}
                            >
                                <HomeIcon/> Home
                            </SideLinks>
                        </SideItem>

                    </SideMenu>
                    <SideBtn>
                        <SideBtnLink href=""> <BookmarkAddedIcon/> Saves </SideBtnLink>
                    </SideBtn>
                    <SideBtn>
                        <SideBtnLink href=""> <ThumbUpIcon/> Likes</SideBtnLink>
                    </SideBtn>
                    <SideBtn>
                        <SideBtnLink href=""> <CommentIcon/> Comments </SideBtnLink>
                    </SideBtn>
                </SidebarContainer>
            </Side>

        </>
    );
}

export default Sidebar;
