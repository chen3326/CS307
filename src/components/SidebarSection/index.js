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
import SavedIcon from '@mui/icons-material/BookmarkAdded';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

function Sidebar(){

    return (
        <>
            <Side >
                <SidebarContainer>
                    <SideLogo>
                    </SideLogo>
                    <SideBtn>
                        <SideBtnLink href="/home"> <HomeIcon/></SideBtnLink>
                    </SideBtn>
                    <SideBtn>
                        <SideBtnLink href=""> <SavedIcon/></SideBtnLink>
                    </SideBtn>
                    <SideBtn>
                        <SideBtnLink href=""> <ThumbUpIcon/></SideBtnLink>
                    </SideBtn>
                    <SideBtn>
                        <SideBtnLink href=""> <CommentIcon/></SideBtnLink>
                    </SideBtn>
                </SidebarContainer>
            </Side>

        </>
    );
}

export default Sidebar;
