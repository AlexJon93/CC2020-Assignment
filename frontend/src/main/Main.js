import React        from 'react';
import Container    from 'react-bootstrap/Container';
import Row          from 'react-bootstrap/Row';
import Col          from 'react-bootstrap/Col';
import Category     from './Category';

const Main = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                   <Category name="Gaming" /> 
                </Col>
                <Col>
                   <Category name="Art" /> 
                </Col>
                <Col>
                   <Category name="Music" /> 
                </Col>
            </Row>
            <Row>
                <Col>
                   <Category name="Food" /> 
                </Col>
                <Col>
                   <Category name="Knitting" /> 
                </Col>
                <Col>
                   <Category name="Cheese" /> 
                </Col>
            </Row>
        </Container>
    )
}
export default  Main;