import React from 'react';
import Post from './Post';
import PostForm from './PostForm';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';

const mapStateToProps = state => {
    return {
        GroupName: state.wall.GroupName, 
        posts: state.wall.posts,
        UserNames: state.wall.postUserNames,
        isMember: state.wall.isMember
    };
}

const ConnectedWallView = (props) => {
    console.log(props.UserNames);
    const button = props.isMember ? null : <Button onClick={props.joinGroup}>Join</Button>
    return (
        <div> 
            <PostForm />
            <ul className="post-list">
                {props.posts.map(post =>
                    <li key={post.PostID}>
                        <Post 
                            key={post.PostID} 
                            PostId={post.PostID}
                            UserName={props.UserNames[post.PostUser]}
                            CreatedAt={post.CreatedAt}
                            PostContent={post.PostContent}
                        />
                    </li>
                )}
            </ul>
        </div>
    );
}

const WallPostsView = connect(mapStateToProps)(ConnectedWallView);
export default WallPostsView;