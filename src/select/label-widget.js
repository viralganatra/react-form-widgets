import React, { PropTypes } from 'react';

const SelectLabel = ({ label, placeholder, onResetSelection, ...rest }) => {
    if (label) {
        return (
            <div>
                <div {...rest}>{label}</div>
                {onResetSelection ? <div onClick={onResetSelection}>X</div> : null}
            </div>
        );
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
    onResetSelection: PropTypes.func,
};

export default SelectLabel;
