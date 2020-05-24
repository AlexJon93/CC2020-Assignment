import React from 'react';
import {sendRequest} from '../helpers';
import PostFormView from './PostFormView';
import docCookies from 'doc-cookies';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        GroupID: state.wall.group_id
    };
}

class ConnectPostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post_content: null,
            refresh: false,
            partOfGroup: false
        };

        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = this.responseHandler;
    }

    changeHandler = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.sendPost();
    }

    sendPost = () => {
        const params = {
            post_content: this.state.post_content,
            post_user: docCookies.getItem('id'),
            post_group: this.props.GroupID
        };
        console.log(params);
        sendRequest(this.request, "POST", "/group/posts", params);
    }

    responseHandler = () => {
        if (this.request.readyState === XMLHttpRequest.DONE) {

            if (this.request.status !== 200) {
                this.setState({invalidSession: true});
                return true;
            }
            window.location.reload();
        }
    }

    render() {
        return <PostFormView onSubmit={this.onSubmit} onChange={this.changeHandler}/>
    }
}

const PostForm = connect(mapStateToProps)(ConnectPostForm);
export default PostForm;