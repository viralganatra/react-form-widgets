import React, { PropTypes } from 'react';
import invariant from 'invariant';

export default function InputMultichoiceGroupHOC(WrappedComponent) {
    invariant(
        typeof WrappedComponent === 'function',
        `Expected "WrappedComponent" provided as the first argument to
        CheckboxContainerHOC to be a function. Instead, received
        ${typeof WrappedComponent}.`,
    );

    const InputMultichoiceGroup = ({ items, isChecked, ...rest }) => {
        const groupItems = items.map(item => {
            const { label, ...inputProps } = item;

            return {
                label: {
                    content: label,
                },
                ...rest,
                ...inputProps,
                checked: isChecked(item.value),
            };
        });

        return (
            <div>
                {groupItems.map((item) => {
                    return <WrappedComponent key={item.value} {...item} />;
                })}
            </div>
        );
    };

    InputMultichoiceGroup.propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.node,
            value: PropTypes.string,
        })).isRequired,
        isChecked: PropTypes.func.isRequired,
        onChange: PropTypes.func,
    };

    return InputMultichoiceGroup;
}
