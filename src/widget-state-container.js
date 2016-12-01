import React, { Component } from 'react';
import { EventTypes, DefaultEventProps } from './events';

export default function WidgetStateContainerHOC(WrappedComponent) {
    return class WidgetStateContainer extends Component {
        static defaultProps = DefaultEventProps;

        constructor(props) {
            super(props);

            this.state = {
                value: this.getDefaultValue(props),
            };
        }

        getDefaultValue({ value }) {
            return value || '';
        }

        onEvent = (eventName) => (event, value) => {
            const { [eventName]: onEventType } = this.props;

            const newValue = value || this.state.value;

            onEventType(newValue, event);
        }

        onChange = (event) => {
            const { target: { value } } = event;

            this.setState({
                ...this.state,
                value,
            });

            this.onEvent('onChange')(event, value);
        }

        getEventProps() {
            return EventTypes.reduce((memo, eventName) => {
                return {
                    ...memo,
                    [eventName]: this.onEvent(eventName),
                };
            }, {});
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    {...this.getEventProps()}
                    value={this.state.value}
                    onChange={this.onChange}
                />
            );
        }
    };
}
