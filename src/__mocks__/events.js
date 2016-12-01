function noop() {}

export const EventTypes = ['onChange', 'onKeyPress', 'onKeyUp', 'onKeyDown', 'onBlur', 'onFocus'];

export const DefaultEventProps = {
    onChange: noop,
    onKeyPress: noop,
    onKeyUp: noop,
    onKeyDown: noop,
    onBlur: noop,
    onFocus: noop,
};
