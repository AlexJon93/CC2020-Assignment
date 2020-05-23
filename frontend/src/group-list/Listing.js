import React from 'react';
import PropTypes from 'prop-types';

const Listing = ({GroupID, GroupName}) => {
    return (
        <tr>
            <td>
                {GroupID}
            </td>
            <td>
                {GroupName}
            </td>
        </tr>
    );
}

Listing.propTypes = {
    GroupName: PropTypes.string.isRequired,
    GroupID: PropTypes.number.isRequired
};
export default Listing;