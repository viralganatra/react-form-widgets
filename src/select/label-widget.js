import React, { PropTypes } from 'react';

const SelectLabel = ({ label, placeholder, ...rest }) => {
    if (label) {
        return <div {...rest}>{label}</div>;
    }

    return <div style={{ color: 'grey' }} {...rest}>{placeholder}</div>;
};

SelectLabel.defaultProps = {
    placeholder: 'Please select an option',
};

SelectLabel.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

export default SelectLabel;
