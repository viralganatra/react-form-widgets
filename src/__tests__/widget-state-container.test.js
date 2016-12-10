import React from 'react';
import WidgetStateContainer from '../widget-state-container';

jest.mock('../events');

const InputWidget = (props) => <input {...props} />;

describe('InputWidget', () => {
    let ComposedComponent;

    beforeEach(() => {
        ComposedComponent = WidgetStateContainer(InputWidget);
    });

    it('should render correctly, passing all props to the decorated component', () => {
        const wrapperFirst = shallow(<ComposedComponent type="text" />);
        const wrapperSecond = shallow(<ComposedComponent type="checkbox" value="test" />);

        expect(wrapperFirst).toMatchSnapshot();
        expect(wrapperSecond).toMatchSnapshot();
    });

    it('should listen to and call event methods, such as onBlur', () => {
        const methodSpy = jest.fn();
        const wrapper = mount(
            <ComposedComponent
                onKeyPress={methodSpy}
                onKeyUp={methodSpy}
                onKeyDown={methodSpy}
                onBlur={methodSpy}
                onFocus={methodSpy}
                value="foo"
            />,
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.simulate('change');
        wrapper.simulate('keyPress');
        wrapper.simulate('keyUp');
        wrapper.simulate('keyDown');
        wrapper.simulate('blur');
        wrapper.simulate('focus');

        expect(methodSpy.mock.calls[0][0].value).toBe('foo');
        expect(methodSpy.mock.calls[1][0].value).toBe('foo');
        expect(methodSpy.mock.calls[2][0].value).toBe('foo');
        expect(methodSpy.mock.calls[3][0].value).toBe('foo');
    });

    it('should set the value in state when the onChange event occurs and should call the onChange prop with the new value', () => {
        const methodSpy = jest.fn();
        const wrapper = mount(<ComposedComponent onChange={methodSpy} />);

        wrapper.simulate('change', { target: { value: 'testEvent' } });

        expect(wrapper).toMatchSnapshot();
        expect(methodSpy.mock.calls[0][0].value).toBe('testEvent');
    });

    it('should send the checked property when the item is a checkbox or radio', () => {
        const methodSpy = jest.fn();
        const wrapper = mount(<ComposedComponent onChange={methodSpy} />);
        const wrapperCheckbox = mount(<ComposedComponent type="checkbox" onChange={methodSpy} />);
        const wrapperRadio = mount(<ComposedComponent type="radio" onChange={methodSpy} />);

        wrapper.simulate('change');
        wrapperCheckbox.simulate('change');
        wrapperRadio.simulate('change');

        expect('checked' in methodSpy.mock.calls[0][0]).toBe(false);
        expect('checked' in methodSpy.mock.calls[1][0]).toBe(true);
        expect('checked' in methodSpy.mock.calls[2][0]).toBe(true);
    });
});
