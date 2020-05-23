import React from 'react';
import Post from './Post';
import PostForm from './PostForm';

const WallView = (props) => {
    return (
        <div class="wall">
            <PostForm/>
            <ul class="post-list">
                {props.posts.map(post =>
                    <li key={post.PostID}>
                        <Post key={post.PostID} {...post} />
                    </li>
                )}
            </ul>
        </div>
    );
}


export default WallView;