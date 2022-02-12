import React from 'react';
import CreatePostIcon from '@mui/icons-material/Create';
import { Container, Button, Link } from 'react-floating-action-button'

function Post(){

    return (
        <Container styles={{color: 'darkblue', marginRight: '-60px', marginBottom: '-15px'}}>
            {/*Make a Post Here*/}
            <Button
                tooltip="Click to make a new post"
                styles={{backgroundColor: 'darkblue' , color : 'white', width: '73px', height: '73px'}}
                onClick={() => alert('Add post here') }
            >
                <CreatePostIcon fontSize='large'/>
            </Button>
        </Container>
    );
}

export default Post;
