import React, { PropTypes } from 'react';
import Label from '../../label/label-widget';
import Input from '../single/input';

const InputMultichoiceGroupItem = ({ label, ...inputProps }) => {
    const { content, ...labelProps } = label;

    return (
        <Label {...labelProps}>
            <Input {...inputProps} /> {content}
        </Label>
    );
};

InputMultichoiceGroupItem.propTypes = {
    label: PropTypes.shape({
        content: PropTypes.node.isRequired,
    }).isRequired,
    value: PropTypes.string.isRequired,
};

export default InputMultichoiceGroupItem;
