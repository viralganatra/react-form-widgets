import React, { Component, PropTypes } from 'react';
import invariant from 'invariant';
import { EventTypes, DefaultEventProps } from '../../events';

export default function CheckboxContainerHOC(WrappedComponent) {
    invariant(
        typeof WrappedComponent === 'function',
        `Expected "WrappedComponent" provided as the first argument to
        CheckboxContainerHOC to be a function. Instead, received
        ${typeof WrappedComponent}.`,
    );

    return class CheckboxContainer extends Component {
        static defaultProps = {
            ...DefaultEventProps,
            type: 'checkbox',
        }

        static propTypes = {
            items: PropTypes.arrayOf(PropTypes.shape({
                label: PropTypes.node,
                value: PropTypes.string,
            })).isRequired,
            type: PropTypes.oneOf(['checkbox']),
            // Expect a string here as HTMLElement.value returns a string
            // even if a number is supplied
            value: PropTypes.arrayOf(PropTypes.string),
        };

        constructor(props) {
            super(props);

            this.state = {
                value: props.value || [],
            };
        }

        isChecked = (currentValues) => (value) => {
            return currentValues.includes(value);
        }

        getNewValue(currentValues, value) {
            if (this.isChecked(currentValues)(value)) {
                const index = currentValues.indexOf(value);

                // Remove from array
                return [
                    ...currentValues.slice(0, index),
                    ...currentValues.slice(index + 1),
                ];
            }

            // Add to array
            return [
                ...currentValues,
                value,
            ];
        }

        onEvent = (eventName) => ({ value, checked, ...rest }) => {
            const { [eventName]: onEventType } = this.props;
            const newValue = Array.isArray(value) ? value : this.state.value;

            onEventType({ ...rest, value: newValue });
        }

        onChange = ({ value, ...rest }) => {
            const newValue = this.getNewValue(this.state.value, value);

            this.setState({
                ...this.state,
                value: newValue,
            });

            this.onEvent('onChange')({ ...rest, value: newValue });
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
