import React from 'react';
import Post from './Post';
import PostForm from './PostForm';

class WallView extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            GroupName: null
        };

        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = this.responseHandler;

    }

    fetchGroupName = () => {
        params = {
            group_id: 
        }        
    }

    nameResponseHandler = () => {

    }

    responseHandler = () => {

    }

    render() {
        return (
            <div class="wall">
                Group ID {this.props.GroupID}
                <PostForm GroupID={this.props.GroupID}/>
                <ul class="post-list">
                    {this.props.posts.map(post =>
                        <li key={post.PostID}>
                            <Post key={post.PostID} {...post} />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}


export default WallView;