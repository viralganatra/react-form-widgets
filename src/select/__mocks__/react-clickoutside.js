import React, { Component } from 'react';

export default function mockReactClickOutside(WrappedComponent) {
    return class Mock extends Component {
        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}
