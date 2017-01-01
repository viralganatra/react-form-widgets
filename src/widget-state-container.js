import React, { Component, PropTypes } from 'react';
import { EventTypes, DefaultEventProps } from './events';

export default function WidgetStateContainerHOC(WrappedComponent) {
    return class WidgetStateContainer extends Component {
        static defaultProps = DefaultEventProps;

        static propTypes = {
            type: PropTypes.string,
        }

        constructor(props) {
            super(props);

            this.state = {
                value: this.getValue(props),
            };
        }

        onEvent = (eventName) => (event, value) => {
            const { [eventName]: onEventType } = this.props;

            onEventType(this.getEventParams(event, value));
        }

        onChange = (event) => {
            const { target: { value } } = event;

            this.setState({
                ...this.state,
                value,
            });

            this.onEvent('onChange')(event, value);
        }

        isCheckedType() {
            const { type } = this.props;

            return type === 'checkbox' || type === 'radio';
        }

        getValue({ value, defaultValue }) {
            if (value !== undefined && value !== null) {
                return value;
            } else if (defaultValue !== undefined && defaultValue !== null) {
                return defaultValue;
            }

            return '';
        }

        getEventParams(event, value) {
            const { target: { checked } } = event;

            const newValue = this.getValue({
                value,
                defaultValue: this.state.value,
            });

            let data = { event, value: newValue };

            if (this.isCheckedType()) {
                data = { ...data, checked };
            }

            return data;
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
            return (
                <WrappedComponent
                    {...this.props}
                    {...this.getEventProps()}
                    value={this.state.value}
                />
            );
        }
    };
}
