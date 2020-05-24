import React from 'react';
import WallView from './WallView';
import {clearSession} from '../helpers';
import WallFetcher from './WallFetcher';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {clearWall, setIsMember} from '../redux/actions';
import docCookies from 'doc-cookies';
import {sendRequest} from '../helpers';

const mapStateToProp = state => {
    return {loading: state.wall.loading};
}
const mapDispatchToProps = dispatch => {
    return {
        clearWall: () => dispatch(clearWall()),
        setIsMember: isMember => dispatch(setIsMember(isMember))
    }
}
class ConnectedWallPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            invalidSession: false,
        };

        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = this.joinResponseHandler;
    }

    componentDidMount() {
        var dataFetcher = new WallFetcher(this.props.match.params.GroupID);
        dataFetcher.fetch();
    }

    joinGroup = event => {
        event.preventDefault();
        const params = {
            group_id: Number(this.props.match.params.GroupID), 
            user_id: Number(docCookies.getItem('id'))
        };
        console.log(params);
        sendRequest(this.request, "POST", "/group/members", params);
    }

    joinResponseHandler = () => {
        if (this.request.readyState === XMLHttpRequest.DONE) {

            if(this.request.status === 200) {
                console.log("Joined");
                this.props.setIsMember(true);
                window.location.reload()
            }
            else {
                console.log("Failed to join group");
                alert(this.request.responseText);
            }
        }
    }

    componentWillUnmount() {
        if (this.state.invalidSession) {
            clearSession();
        }
        this.props.clearWall();
    }

    render() {
        if (this.state.invalidSession) {
            return <Redirect to="/login"/>
        } 

        if (this.props.loading) {
            return <h1>Loading data</h1>
        } 
        return (
            <WallView onJoin={this.joinGroup}/> 
        );
    }
}

const WallPage = connect(mapStateToProp, mapDispatchToProps)(ConnectedWallPage);
export default WallPage;