import React, { PropTypes } from 'react';

const GroupComponent = ({ items, isChecked, onChange, ...rest }) => {
    const groupItems = items.map(item => {
        const { label, ...inputProps } = item;

        return {
            ...rest,
            ...inputProps,
            checked: isChecked(item.value),
            onChange: ({ target: { value } }) => onChange({ value }),
        };
    });

    return (
        <div>
            {groupItems.map((item) => {
                return <input key={item.value} {...item} />;
            })}
        </div>
    );
};

GroupComponent.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.string,
    })).isRequired,
    isChecked: PropTypes.func.isRequired,
    onChange: PropTypes.func,
};

export default GroupComponent;
