import React from 'react';
import WallPostsView from './WallPostsView';
import WallEventsView from './events/WallEventsView';
import { Button, Tab, Tabs, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MembersList from './members/MembersList';

const mapStateToProps = state => {
    return {
        GroupName: state.wall.GroupName,
        isMember: state.wall.isMember
    };
}

const ConnectedWallView = props => {
    return (
        <div className="wall">
            <Container>
                <Row>
                    <Col style={{ textAlign: "left" }}>
                        <h1> {props.GroupName} </h1>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                        {props.isMember ? null : <Button onClick={props.onJoin}>Join</Button>}
                    </Col>
                </Row>    
            </Container>
            <Tabs defaultActiveKey="posts" id="uncontrolled-tab-example">
                <Tab eventKey="posts" title="Posts">
                    <WallPostsView/>            
                </Tab>
                <Tab eventKey="events" title="Events">
                    <WallEventsView/> 
                </Tab>
                <Tab eventKey="members" title="Members">
                    <MembersList/>
                </Tab>
            </Tabs>
        </div>
    )
}

ConnectedWallView.propTypes = {
    GroupName: PropTypes.string.isRequired,
    onJoin: PropTypes.func.isRequired
}

const WallView = connect(mapStateToProps)(ConnectedWallView);
export default WallView;