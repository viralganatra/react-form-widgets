import React, { Component, PropTypes } from 'react';
import ClickOutside from 'react-clickoutside';
import LabelWidget from './label-widget';
import GroupItemsContainer from './group-items-container';
import GroupItemsWidget from './group-items-widget';

const SHOW_ITEMS = true;
const HIDE_ITEMS = false;

function noop() {}

export default class SelectWidget extends Component {
    static propTypes = {
        label: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        items: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.node.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
        })).isRequired,
        onChange: PropTypes.func.isRequired,
        enableSelectionReset: PropTypes.bool,
    };

    static defaultProps = {
        onChange: noop,
        enableSelectionReset: false,
    }

    constructor(props) {
        super(props);

        const { label, value } = props;

        this.state = {
            ...this.getSelectedItem({ label, value }),
            displayItems: HIDE_ITEMS,
        };
    }

    onItemSelection = (item) => {
        this.setState({
            ...this.state,
            ...this.getSelectedItem(item),
            displayItems: HIDE_ITEMS,
        });

        this.props.onChange(item);
    }

    onToggleItems(displayItems) {
        this.setState({
            ...this.state,
            displayItems,
        });
    }

    onShowItems = () => {
        this.onToggleItems(SHOW_ITEMS);
    }

    onHideItems = () => {
        this.onToggleItems(HIDE_ITEMS);
    }

    getSelectedItem({ label, value }) {
        return {
            selectedItem: {
                label,
                value,
            },
        };
    }

    render() {
        const { displayItems, selectedItem: { label } } = this.state;
        const { items, enableSelectionReset } = this.props;

        let labelWidgetProps = {
            label,
            onClick: this.onShowItems,
        };

        if (enableSelectionReset) {
            labelWidgetProps = {
                ...labelWidgetProps,
                onResetSelection: this.onItemSelection,
            };
        }

        const ComposedContainer = ClickOutside(GroupItemsContainer(GroupItemsWidget));

        return (
            <div>
                <LabelWidget {...labelWidgetProps} />
                <ComposedContainer
                    items={items}
                    onItemSelection={this.onItemSelection}
                    shouldDisplay={displayItems}
                    onClickOutside={this.onHideItems}
                />
            </div>
        );
    }
}
