import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup} from 'react-bootstrap';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        members: state.wall.members
    }
}

const ConnectedMembersList = props => {
    return (
        <ListGroup>
            {props.members.map(member => {
                return (
                    <ListGroup.Item key={member.MemberId}>
                        {member.Username}
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    )
}

const MembersList = connect(mapStateToProps)(ConnectedMembersList);
export default MembersList;
