import React from 'react';
import {Redirect} from 'react-router-dom';
import { clearUser } from './redux/actions';
import {clearSession} from './helpers';

const mapDispatchToProps = dispatch => {
    return { clearUser: () => dispatch(clearUser())}
}

class Logout extends React.Component {
    componentWillUnmount() {
        clearSession();
    }

    render() {
        return <Redirect to="/login"/>
    }
}
export default Logout;