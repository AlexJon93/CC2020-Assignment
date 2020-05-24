import React from 'react';
import ProfileView from './ProfileView';
import {addGroup, setUser, clearUser} from '../redux/actions';
import docCookies from 'doc-cookies';
import {TOKEN, EMAIL} from '../constants/cookies';
import { URL} from '../constants/API';
import {clearSession, formatParams} from '../helpers';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ProfileFetcher from './ProfileFetcher';

const mapStateToProps = state => {
    return {...state.user};
}

const mapDispatchToProps = dispatch => {
    return {
        clear: () => dispatch(clearUser())
    }
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
        if (!this.props.MemberId) {
            const fetcher = new ProfileFetcher(docCookies.getItem(EMAIL));
            fetcher.fetch();
        }
    }

    componentWillUnmount() {
        if (this.state.invalidSession) {
            clearSession();
        }
        this.props.clear();
    }

    render() {
        if (this.state.invalidSession) {
            return <Redirect to="/login"/>
        }
        if (this.props.loading) {
            return <h1>Loading page</h1>
        }
        return <ProfileView />
    }
} 
const Profile = connect(mapStateToProps, mapDispatchToProps)(ConnectedProfile);
export default Profile;