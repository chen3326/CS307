import React from 'react';
import CreatePostIcon from '@mui/icons-material/Create';
import { Container, Button, Link } from 'react-floating-action-button'

function Post(){

    return (
        <Container styles={{color: 'darkblue'}}>
             Make a Post Here
            <Button
                tooltip="Click to make a new post"
                styles={{backgroundColor: 'darkblue' , color : 'yellow'}}
                onClick={() => alert('Add post here') }
            >
                <CreatePostIcon/>
            </Button>
        </Container>
    );
}

export default Post;
