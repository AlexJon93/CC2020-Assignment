import React from 'react';
import Wall from './WallView';
import docCookies from 'doc-cookies';
import { TOKEN } from '../constants/cookies';
import { URL } from '../constants/API';
import { formatParams } from '../helpers';

class WallPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            invalidSession: false,
            posts: [] 
        };

        this.fetchPostsRequest = new XMLHttpRequest();
        this.fetchPostsRequest.onreadystatechange = this.fetchPostsResponseHandler;
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts = () => {
        const params = {group_id: this.props.match.params.GroupID}
        const token = docCookies.getItem(TOKEN);

        this.fetchPostsRequest.open("GET", URL + "/group/posts" + formatParams(params));
        this.fetchPostsRequest.setRequestHeader("Authorization", token);
        this.fetchPostsRequest.send();
    }

    fetchPostsResponseHandler = () => {
        if (this.fetchPostsRequest.readyState === XMLHttpRequest.DONE) {
            console.log(this.fetchPostsRequest.response);
            if (this.fetchPostsRequest.status !== 200) {
                this.setState({invalidSession: true});
                return;
            }
            const postsJSON = JSON.parse(this.fetchPostsRequest.responseText);
            this.setState({posts: postsJSON.posts}) 
        }
    }

    render() {
        
        return (
            <Wall posts={this.state.posts}/> 
        );
    }
}

export default WallPage;