import React from 'react';

const Input = (props) => {
    return <input {...props} />;
};

Input.defaultProps = {
    type: 'text',
};

export default Input;
