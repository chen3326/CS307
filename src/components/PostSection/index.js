import React from 'react';
import CreatePostIcon from '@mui/icons-material/Create';
import Fab from '@material-ui/core/Fab'


function Post(){

    return (
        <div className= "Post">
            <Fab style={{marginTop: 600,marginLeft: 1450, position : "absolute"}} color = 'primary' aria-label = 'add' size = 'large' >
                <CreatePostIcon/>
            </Fab>
        </div>

    );
}

export default Post;
