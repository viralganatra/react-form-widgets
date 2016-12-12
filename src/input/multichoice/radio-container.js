import React, { Component, PropTypes } from 'react';
import invariant from 'invariant';
import { EventTypes, DefaultEventProps } from '../../events';

export default function RadioContainerHOC(WrappedComponent) {
    invariant(
        typeof WrappedComponent === 'function',
        `Expected "WrappedComponent" provided as the first argument to
        RadioContainerHOC to be a function. Instead, received
        ${typeof WrappedComponent}.`,
    );

    return class RadioContainer extends Component {
        static defaultProps = {
            ...DefaultEventProps,
            type: 'radio',
        }

        static propTypes = {
            items: PropTypes.arrayOf(PropTypes.shape({
                label: PropTypes.node,
                value: PropTypes.string,
            })).isRequired,
            type: PropTypes.oneOf(['radio']),
            value: PropTypes.string,
        };

        constructor(props) {
            super(props);

            this.state = {
                value: props.value,
            };
        }

        isChecked = (currentValue) => (value) => {
            return currentValue === value;
        }

        onEvent = (eventName) => (args) => {
            const { [eventName]: onEventType } = this.props;

            onEventType(args);
        }

        onChange = ({ value, ...rest }) => {
            this.setState({
                ...this.state,
                value,
            });

            this.onEvent('onChange')({ ...rest, value });
        }

        getEventProps() {
            return EventTypes.reduce((memo, eventName) => {
                return {
                    ...memo,
                    [eventName]: this[eventName] || this.onEvent(eventName),
                };
            }, {});
        }

        render() {
            const { value, ...rest } = this.props;
            const isChecked = this.isChecked(this.state.value);

            return (
                <WrappedComponent
                    {...rest}
                    {...this.getEventProps()}
                    isChecked={isChecked}
                />
            );
        }
    };
}
