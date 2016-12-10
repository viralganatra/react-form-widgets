import React from 'react';
import CheckboxContainer from '../checkbox-container';
import GroupComponent from '../__mocks__/component-group';

jest.mock('../../../events');

const data = {
    items: [
        { label: 'test 1', value: '1' },
        { label: 'test 2', value: '2' },
    ],
    value: ['2'],
};

describe('CheckboxContainer', () => {
    let Composed;

    beforeEach(() => {
        Composed = CheckboxContainer(GroupComponent);
    });

    it('should render correctly', () => {
        const wrapper = shallow(<Composed {...data} />);

        expect(() => CheckboxContainer({})).toThrowErrorMatchingSnapshot();
        expect(wrapper).toMatchSnapshot();
    });

    it('should validate prop types', () => {
        const error = console.error;
        console.error = jest.fn();

        shallow(<Composed />);
        shallow(<Composed type="text" />);
        shallow(<Composed value={2} />);

        expect(console.error.mock.calls[0][0]).toBeDefined();
        expect(console.error.mock.calls[1][0]).toBeDefined();
        expect(console.error.mock.calls[2][0]).toBeDefined();

        console.error = error;
    });

    it('should listen to the onChange event and return an array of checked item values', () => {
        const methodSpy = jest.fn();
        const wrapper = mount(<Composed {...data} onChange={methodSpy} />);

        wrapper.find('input').at(0).simulate('change', { target: { value: '1' } });

        expect(wrapper).toMatchSnapshot();

        wrapper.find('input').at(0).simulate('change', { target: { value: '1' } });
        wrapper.find('input').at(1).simulate('change', { target: { value: '2' } });

        expect(methodSpy.mock.calls[0][0].value).toEqual(['2', '1']);
        expect(methodSpy.mock.calls[1][0].value).toEqual(['2']);
        expect(methodSpy.mock.calls[2][0].value).toEqual([]);

        expect(wrapper).toMatchSnapshot();
    });
});
