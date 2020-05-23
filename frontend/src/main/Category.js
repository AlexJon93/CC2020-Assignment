import React        from 'react';
import PropTypes    from 'prop-types';
import Card         from 'react-bootstrap/Card';

const Category = ({name}) => {
    return (
        <Card className="category-card">
            <p className="category-text">
                {name}
            </p>
        </Card>
    );
}

Category.propTypes = {
    name: PropTypes.string.isRequired
};

export default Category;