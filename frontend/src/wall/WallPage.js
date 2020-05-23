import React from 'react';
import Wall from './Wall';

function WallPage(props) {
    const posts = [
        {
            text: "Post 1",
            user: "greg"
        },
        {
            text: "Post 2",
            user: "dreg"
        },
        {
            text: "Post 3",
            user: "meg"
        }
    ];
    
    return (
        <Wall posts={posts}/> 
    );
}

export default WallPage;