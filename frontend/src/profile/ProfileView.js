import React from 'react';
import { connect} from 'react-redux';
import GroupListView from '../group-list/GroupListView';
import GroupForm from './GroupForm';

const mapStateToProps = state => {
    return {...state.user};
}

const ConnectedProfileView = (props) => {
    console.log(props);
    return (
        <div>
            <h1>{props.Username}'s Groups</h1>
            <GroupListView groups={props.groups}/>
            <GroupForm/>
        </div>
    );
};

const ProfileView = connect(mapStateToProps)(ConnectedProfileView);
export default ProfileView;