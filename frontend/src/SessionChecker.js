import React from 'react';
import { formatParams } from './helpers';
import { URL } from './constants/API';
import docCookies from 'doc-cookies';
import { clearUser, setUser } from './redux/actions';
import { EMAIL, TOKEN } from './constants/cookies';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
    return {
        clearUser: () => dispatch(clearUser()),
        setUser: user => dispatch(setUser(user)) 
    };
}

const mapStateToProps = state => {
    return {
        validSession: state.validSession
    };
}

class ConnectedSessionChecker extends React.Component {
    constructor(props) {
        super(props);

        if (!this.props.validSession) {
            this.clearSession();
        }
    }

    componentDidMount() {
        // Check that the session is still valid by sending a get request for the user
        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = this.responseHandler;

        const params = {
            user_email: docCookies.getItem(EMAIL) 
        };
        console.log()
        this.request.open("GET", URL + formatParams(params))
        this.request.send();
    }

    clearSession = () => {
            this.props.clearUser();
            docCookies.removeItem(TOKEN);
            docCookies.removeItem(EMAIL);
    }

    responseHandler = () => {
        if (this.request.readyState === XMLHttpRequest.DONE) {
            if (this.request.status != 200) {
                this.clearSession();            
                return;
            }
            // If the session is still valid, user details will be returned
            // In which case set user details in the redux store
            const userJSON = JSON.parse(this.responseText); 
            this.props.setUser(userJSON);
        }
    }
    
    render() {
        if (!this.props.validSession) {
            return <Redirect to="/login"/>
        }
        return null;
    }
}

const SessionChecker = connect(mapStateToProps, mapDispatchToProps)(ConnectedSessionChecker);
export default SessionChecker;
