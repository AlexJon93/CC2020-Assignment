import React from 'react';
import Post from './Post';
import PostForm from './PostForm';
function Wall(props) {
    var postComponents = [];

    for (const post of props.posts) {
        postComponents.push(<Post text={post.text} user={post.user}/>);
    }

    return (
        <div class="wall">
            <PostForm/>
            <ul class="post-list">
                {postComponents.map(post =>
                    <li>{post}</li>
                )}
            </ul>
        </div>
    )
}

export default Wall;