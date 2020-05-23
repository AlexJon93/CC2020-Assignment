import React from 'react';
import WallView from './WallView';
import { formatParams, sendRequest, clearSession} from '../helpers';

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
        sendRequest(this.fetchPostsRequest, "GET", "/group/posts", params);
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

    componentWillUnmount() {
        if (this.state.invalidSession) {
            clearSession();
        }
    }

    render() {
        if (this.state.invalidSession) {
            return <Redirect to="/login"/>
        } 

        return (
            <WallView posts={this.state.posts} GroupID={this.props.match.params.GroupID}/> 
        );
    }
}

export default WallPage;