import React from 'react';
import InputGroupWidget from '../input-group-widget';

const Item = (props) => <input {...props} />;

function noop() {}

const props = {
    items: [
        { label: 'test 1', value: '1' },
        { label: 'test 2', value: '2' },
    ],
    value: ['2'],
    isChecked: () => true,
    onChange: noop,
};

describe('InputGroupWidget', () => {
    let Component;

    beforeAll(() => {
        Component = InputGroupWidget(Item);
    });

    it('should render a list of labels with inputs, based on the `items` prop', () => {
        const wrapper = shallow(
            <Component {...props} />,
        );

        expect(wrapper).toMatchSnapshot();
        expect(() => InputGroupWidget({})).toThrowErrorMatchingSnapshot();
    });

    it('should validate the prop types', () => {
        const wrapperInvalidItems = () => shallow(
            <Component {...props} items={2} />,
        );

        const wrapperInvalidIsChecked = () => shallow(
            <Component {...props} isChecked={[]} />,
        );

        const wrapperInvalidOnChange = () => shallow(
            <Component {...props} onChange={[]} />,
        );

        expect(wrapperInvalidItems).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidIsChecked).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidOnChange).toThrowErrorMatchingSnapshot();
    });
});
