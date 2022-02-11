import React from 'react';
import CreatePostIcon from '@mui/icons-material/Create';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Container, Button, Link } from 'react-floating-action-button'

function Post(){

    return (
        <Container styles={{color: 'darkblue'}}>
            <CreatePostIcon/> Make a Post Here <ArrowDownwardIcon/>
            <Button
                tooltip="Click to make a new post"
                icon="fa-plus"
                rotate={true}
                styles={{backgroundColor: 'darkblue' }}
                onClick={() => alert('Add post here') }
            />
        </Container>
    );
}

export default Post;
