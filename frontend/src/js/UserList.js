import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { users: state.registerReducer.users }
}
const ConnectedList = ({ users }) => ( 
            <ul>
                {users.map(user => (
                    <li key={user.email}>{user.email} {user.password}</li>
                ))}
            </ul>
);

const List = connect(mapStateToProps)(ConnectedList);
export default List;