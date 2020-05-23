import React from 'react';
import Post from './Post';
import PostForm from './PostForm';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        GroupName: state.wall.GroupName, 
        posts: state.wall.posts,
        UserNames: state.wall.postUserNames
    };
}
class ConnectedWallView extends React.Component{
    render() {
        console.log(this.props.posts);
        return (
            <div class="wall">
                {this.props.GroupName}
                <PostForm />
                <ul class="post-list">
                    {this.props.posts.map(post =>
                        <li key={post.PostID}>
                            <Post 
                                key={post.PostID} 
                                PostId={post.PostID}
                                UserName={this.props.UserNames[post.PostID]}
                                CreatedAt={post.CreatedAt}
                                PostContent={post.PostContent}
                            />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

const WallView = connect(mapStateToProps)(ConnectedWallView);
export default WallView;