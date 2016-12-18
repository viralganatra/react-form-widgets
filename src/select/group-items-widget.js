import React, { Component, PropTypes } from 'react';

export default class SelectMultichoiceGroup extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.node.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
        })).isRequired,
        onItemSelection: PropTypes.func.isRequired,
    }

    onItemSelection = (item) => () => {
        this.props.onItemSelection(item);
    }

    render() {
        return (
            <div>
                {this.props.items.map((item) => {
                    const { label, value } = item;

                    return (
                        <li
                            key={value}
                            onClick={this.onItemSelection(item)}
                        >
                            {label}
                        </li>
                    );
                })}
            </div>
        );
    }
}
