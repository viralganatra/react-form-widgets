function noop() {}

export const EventTypes = ['onChange', 'onKeyPress', 'onKeyUp', 'onKeyDown', 'onBlur', 'onFocus'];

export const DefaultEventProps = EventTypes.reduce((memo, event) => {
    return {
        ...memo,
        [event]: noop,
    };
}, {});
