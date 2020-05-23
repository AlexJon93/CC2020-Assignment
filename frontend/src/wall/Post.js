import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import {Col, Row, Container} from 'react-bootstrap';
import {sendRequest} from '../helpers';

//{PostID, PostContent, PostUser, CreatedAt}

class Post extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: null
        };

        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = this.responseHandler;
    }

    componentDidMount() {
        this.fetchName();
    }

    fetchName = () => {
        const params = {user_id: this.props.PostUser};
        sendRequest(this.request, "GET", "/user", params);
    }

    responseHandler = () => {
        if (this.request.readyState === XMLHttpRequest.DONE) {
            
            if (this.request.status !== 200) {
                this.setState({invalidSession: true});
                return;
            }
            const userJSON = JSON.parse(this.request.responseText);
            this.setState({name: userJSON.Username});
        }
    }

    render() {
        return(
            <Card className="post">
                <Card.Body >
                    <Card.Title >
                        <Container>
                            <Row>
                                <Col style={{ textAlign: "left" }}>
                                    {this.state.name ? this.state.name : <>User ID {this.props.PostUser}</>}
                                </Col>
                                <Col style={{ textAlign: "right" }}>
                                    {this.props.CreatedAt}
                                </Col>
                            </Row>    
                        </Container>
                    </Card.Title>
                        {this.props.PostContent}
                </Card.Body>
            </Card>
        )
    }
}

Post.propTypes = {
    PostID: PropTypes.number.isRequired,
    PostContent: PropTypes.string.isRequired,
    PostUser: PropTypes.number.isRequired,
    CreatedAt: PropTypes.string.isRequired
};
export default Post;