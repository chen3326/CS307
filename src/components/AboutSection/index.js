import React from 'react';


import {
    AboutContainer,
    AboutContent, AboutText, AboutTitle, PostBtnLink,


} from './AboutElements';


function AboutSection() {


    return (

        <AboutContainer id='aboutMe'>
            <AboutContent>
                <AboutTitle>Posts</AboutTitle>




                <PostBtnLink href="makePost">Make a post</PostBtnLink>


            </AboutContent>





        </AboutContainer>
    );
}

export default AboutSection;
