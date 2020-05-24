import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Listing = ({GroupID, GroupName}) => {
    return (
        <tr key={GroupID + "_tr"}>
            <td key={GroupID + "_td"}>
                <Link to={"/group/" + GroupID} key={GroupID + "_link"}>{GroupName}</Link>
            </td>
        </tr>
    );
}

Listing.propTypes = {
    GroupName: PropTypes.string.isRequired,
    GroupID: PropTypes.number.isRequired
};
export default Listing;