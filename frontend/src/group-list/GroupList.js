import React from 'react';
import { URL } from '../constants/API';
import GroupListView from './GroupListView';
import { connect } from 'react-redux';
import docCookies from 'doc-cookies';
import {clearSession} from '../helpers';
import {Redirect} from 'react-router-dom';

class ConnectedGroupList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            invalidSession: false
        };
        console.log(this.props.match);
        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = this.responseHandler;
    }

    componentDidMount() {
        this.request.open("GET", URL + "/group");
        const token = docCookies.getItem('token');
        console.log(token);
        this.request.setRequestHeader("Authorization", token);
        this.request.send();
    }

    responseHandler = () => {
        if (this.request.readyState === XMLHttpRequest.DONE) {

            if (this.request.status === 200) {
                const groupsJSON = JSON.parse(this.request.responseText);
                this.setState({groups: groupsJSON.groups});
            }
            else {
                this.setState({invalidSession: true});
            }
        }
    }

    componentWillUnmount() {
        if (this.state.invalidSession) {
            clearSession();
        }
    }

    render() {
        if (this.state.invalidSession) {
            return <Redirect to="Login" />
        }
        console.log(this.state);
        return <GroupListView groups={this.state.groups}/>
        
    }
}

export default ConnectedGroupList;