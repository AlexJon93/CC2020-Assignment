import React from 'react';
import ProfileView from './ProfileView';
import {addGroup, setUser} from '../redux/actions';
import docCookies from 'doc-cookies';
import {TOKEN, EMAIL} from '../constants/cookies';
import { URL} from '../constants/API';
import {clearSession, formatParams} from '../helpers';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => dispatch(setUser(user)),
        addGroup: group => dispatch(addGroup(group))
    };
}

const mapStateToProps = state => {
    return {user: state.user};
}

class ConnectedProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {invalidSession: false};

        this.userRequest = new XMLHttpRequest();
        this.userRequest.onreadystatechange = this.userResponseHandler;

        this.groupsRequest = new XMLHttpRequest();
        this.groupsRequest.onreadystatechange = this.groupsResponseHandler;
    }

    componentDidMount() {
        // If there's no user data, fetch it
        if (!this.props.user.MemberId) {
            this.fetchUserData();
        }
        else {
            // Get groups if user details are still in store, otherwise wait for didUpdate
            this.fetchGroupsData();
        }
    }

    fetchUserData = () => { 
        const userParams = {user_email: docCookies.getItem(EMAIL)} 
        const token = docCookies.getItem(TOKEN);
        this.userRequest.open("GET", URL + "/user" + formatParams(userParams));
        this.userRequest.setRequestHeader("Authorization", token);
        this.userRequest.send();
    }

    userResponseHandler = () => {
        if (this.userRequest.readyState === XMLHttpRequest.DONE) {

            if (this.userRequest.status !== 200) {
                this.setState({invalidSession: true})
                return;
            }
            const userJSON = JSON.parse(this.userRequest.responseText);
            this.props.setUser(userJSON);
            console.log(userJSON);
            docCookies.setItem('id', userJSON.MemberID);
        }
    }

    fetchGroupsData = () => {
        const groupParams = {user_id: this.props.user.MemberId}
        const token = docCookies.getItem(TOKEN);

        this.groupsRequest.open("GET", URL + "/user/groups" + formatParams(groupParams)); 
        this.groupsRequest.setRequestHeader("Authorization", token);
        this.groupsRequest.send();
    }

    groupsResponseHandler = () => {
        if (this.groupsRequest.readyState === XMLHttpRequest.DONE) {

            if (this.groupsRequest.status !== 200) {
                this.setState({invalidSession: true})
                return;
            }
            const groupsJSON = JSON.parse(this.groupsRequest.responseText);
            for (const group of groupsJSON) {
                this.props.addGroup(group);
            }

        }
    }

    componentDidUpdate(prevProps) {
        // Fetch groups if user details were just loaded
        if (!prevProps.user.MemberId && this.props.user.MemberId) {
            this.fetchGroupsData();
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
        return <ProfileView user={this.props.user}/>
    }
} 
const Profile = connect(mapStateToProps, mapDispatchToProps)(ConnectedProfile);
export default Profile;