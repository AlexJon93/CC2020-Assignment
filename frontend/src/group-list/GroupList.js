import React from 'react';
import { URL } from '../constants/API';
import GroupListView from './GroupListView';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.user.token
    };
};

class ConnectedGroupList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: []
        };

        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = this.responseHandler;

        this.request.open("GET", URL + "/group");
        this.request.setRequestHeader("Authorization", this.props.token);
        this.request.send();
    }

    responseHandler = () => {
        if (this.request.readyState === XMLHttpRequest.DONE) {
            console.log(this.request.response);
            const groupsJSON = JSON.parse(this.request.responseText);
            this.setState({...groupsJSON});
        }
    }

    render() {
        return <GroupListView groups={this.state.groups}/>
    }
}

const GroupList = connect(mapStateToProps)(ConnectedGroupList);
export default GroupList;