import React, { PropTypes } from 'react';

const Input = ({ inputRef, ...rest }) => {
    return <input {...rest} ref={inputRef} />;
};

Input.defaultProps = {
    type: 'text',
};

Input.propTypes = {
    inputRef: PropTypes.func,
};

export default Input;
