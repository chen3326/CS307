import React from 'react';


import {
    ProfileContainer,
    ProfileContent, ProfileText, UserName, ProfilePic, FollowButton, ProfileStats, PostsStat, FollowersStat, FollowingStat ,PostContainer, Tabs, Posts, Liked, Comments, Saved


} from './ProfileElements';
import pic from "../../images/cat_pic.jpg";


function ProfileSection() {


    return (

        <ProfileContainer id='aboutMe'>
            <ProfileContent>
                <ProfilePic src={pic}/>
                <UserName>Cat Dude</UserName>

                <FollowButton>Follow</FollowButton>

                <ProfileStats>
                    <PostsStat>Posts: 87</PostsStat>
                    <FollowersStat>90</FollowersStat>
                    <FollowingStat>10</FollowingStat>
                </ProfileStats>

                <PostContainer>
                    <Tabs>
                        <Posts></Posts>
                        <Liked></Liked>
                        <Comments></Comments>
                        <Saved></Saved>
                    </Tabs>

                </PostContainer>

                <ProfileText> stuff

                </ProfileText>

            </ProfileContent>





        </ProfileContainer>
    );
}

export default ProfileSection;
