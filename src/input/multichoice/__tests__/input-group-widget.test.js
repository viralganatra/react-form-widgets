import React from 'react';
import InputGroupWidget from '../input-group-widget';

const data = {
    items: [
        { label: 'test 1', value: '1' },
        { label: 'test 2', value: '2' },
    ],
    value: ['2'],
};

const Item = (props) => <input {...props} />;

function noop() {}

describe('InputGroupWidget', () => {
    let Component;

    beforeEach(() => {
        Component = InputGroupWidget(Item);
    });

    it('should render a list of labels with inputs, based on the `items` prop', () => {
        const wrapper = shallow(
            <Component {...data} onChange={noop} isChecked={() => true} />,
        );

        expect(wrapper).toMatchSnapshot();
        expect(() => InputGroupWidget({})).toThrowErrorMatchingSnapshot();
    });

    it('should validate the prop types', () => {
        const error = console.error;
        console.error = jest.fn();

        shallow(<Component
            {...data}
            onChange={noop}
            isChecked={noop}
            items={[]}
        />);

        shallow(
            <Component {...data} onChange={2} isChecked={noop} />,
        );

        expect(() => shallow(
            <Component {...data} onChange={noop} />),
        ).toThrowErrorMatchingSnapshot();

        expect(console.error.mock.calls[0][0]).toBeDefined();
        expect(console.error.mock.calls[1][0]).toBeDefined();

        console.error = error;
    });
});
