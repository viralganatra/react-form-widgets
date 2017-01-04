import React, { Component, PropTypes } from 'react';
import SearchWidget from './search-widget';
import FilterArrayObjectsByKey from './filter-array-objects';

export default function SelectGroupItemsContainerHOC(WrappedComponent) {
    return class SelectGroupItemsContainer extends Component {
        static propTypes = {
            shouldDisplay: PropTypes.bool.isRequired,
            items: PropTypes.arrayOf(PropTypes.shape({
                label: PropTypes.node.isRequired,
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                ]).isRequired,
            })).isRequired,
            enableSearch: PropTypes.bool,
        }

        static defaultProps = {
            enableSearch: true,
        }

        constructor(props) {
            super(props);

            this.state = {
                items: props.items,
            };
        }

        onFilterItems = ({ value }) => {
            const { items } = this.props;

            let filteredItems = items;

            if (value !== '') {
                filteredItems = FilterArrayObjectsByKey({
                    items,
                    searchStr: value,
                    key: 'label',
                });
            }

            this.setState({
                ...this.state,
                items: filteredItems,
            });
        }

        render() {
            const { shouldDisplay, enableSearch, ...rest } = this.props;
            const { items } = this.state;

            if (!shouldDisplay) {
                return null;
            }

            const styles = {
                width: '220px',
                height: '300px',
                overflow: 'auto',
            };

            return (
                <div style={styles}>
                    {enableSearch && <SearchWidget onChange={this.onFilterItems} />}
                    <WrappedComponent {...rest} items={items} />
                    {!items.length && <p>Sorry, no results found.</p>}
                </div>
            );
        }
    };
}
