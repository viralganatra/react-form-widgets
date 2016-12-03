import React, { PropTypes } from 'react';

const Label = ({ children, ...labelProps }) => {
    return <label {...labelProps}>{children}</label>;
};

Label.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Label;
