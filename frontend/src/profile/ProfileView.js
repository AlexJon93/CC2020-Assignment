import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import GroupsListView from '../group-list/GroupListView';

const mapStateToProps = state => {
    console.log(state);
    return {...state.user};
}

const ConnectedProfileView = ({Username, groups}) => {
    return (
        <div>
            <h1>{Username}'s Groups</h1>
            <GroupsListView groups={groups}/>
        </div>
    );
};

const ProfileView = connect(mapStateToProps)(ConnectedProfileView);
export default ProfileView;