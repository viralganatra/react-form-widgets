import React, { Component, PropTypes } from 'react';

export default function SelectGroupItemsContainerHOC(WrappedComponent) {
    return class SelectGroupItemsContainer extends Component {
        static propTypes = {
            shouldDisplay: PropTypes.bool.isRequired,
        };

        render() {
            const { shouldDisplay, ...rest } = this.props;

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
                    <WrappedComponent {...rest} />
                </div>
            );
        }
    };
}
