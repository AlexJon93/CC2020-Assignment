import React from 'react';
import Post from './Post';

function Wall(props) {
    var postComponents = [];

    for (const post of props.posts) {
        postComponents.push(<Post text={post.text} user={post.user}/>);
    }

    return (
        <ul class="post-list">
            {postComponents.map(post =>
                <li>{post}</li>
            )}
        </ul>
    )
}

export default Wall;