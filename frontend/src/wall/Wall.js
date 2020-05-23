import React from 'react';
import WallView from './WallView';
import {clearSession} from '../helpers';
import WallFetcher from './WallFetcher';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {clearWall} from '../redux/actions';

const mapStateToProp = state => {
    return {loading: state.wall.loading};
}
const mapDispatchToProps = dispatch => {
    return {clearWall: () => dispatch(clearWall())}
}
class ConnectedWallPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            invalidSession: false,
        };
    }

    componentDidMount() {
        var dataFetcher = new WallFetcher(this.props.match.params.GroupID);
        dataFetcher.fetch();
    }

    componentWillUnmount() {
        if (this.state.invalidSession) {
            clearSession();
        }
        this.props.clearWall()
    }

    render() {
        if (this.state.invalidSession) {
            return <Redirect to="/login"/>
        } 

        if (this.props.loading) {
            return <h1>Loading data</h1>
        } 
        return (
            <WallView /> 
        );
    }
}

const WallPage = connect(mapStateToProp)(ConnectedWallPage);
export default WallPage;