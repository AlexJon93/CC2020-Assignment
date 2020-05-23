import React from 'react';
import {Redirect} from 'react-router-dom';
import {clearSession} from './helpers';

class Logout extends React.Component {
    componentWillUnmount() {
        clearSession();
    }

    render() {
        return <Redirect to="/login"/>
    }
}
export default Logout;