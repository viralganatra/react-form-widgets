import React, { PropTypes } from 'react';

const SelectMultichoiceGroupItem = ({ label, onClick }) => {
    return (
        <li onClick={() => onClick()}>{label}</li>
    );
};

SelectMultichoiceGroupItem.propTypes = {
    label: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default SelectMultichoiceGroupItem;
