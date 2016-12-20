import React from 'react';
import RadioContainer from '../radio-container';
import GroupComponent from '../__mocks__/component-group';

jest.mock('../../../events');

const props = {
    items: [
        { label: 'test 1', value: '1' },
        { label: 'test 2', value: '2' },
    ],
    value: '2',
};

describe('RadioContainer', () => {
    let Composed;

    beforeAll(() => {
        Composed = RadioContainer(GroupComponent);
    });

    it('should render correctly', () => {
        const wrapper = shallow(<Composed {...props} />);

        expect(() => RadioContainer({})).toThrowErrorMatchingSnapshot();
        expect(wrapper).toMatchSnapshot();
    });

    it('should validate prop types', () => {
        const wrapperInvalidItems = () => shallow(
            <Composed {...props} items={2} />,
        );

        const wrapperInvalidType = () => shallow(
            <Composed {...props} type="checkbox" />,
        );

        const wrapperInvalidValue = () => shallow(
            <Composed {...props} value={2} />,
        );

        expect(wrapperInvalidItems).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidType).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidValue).toThrowErrorMatchingSnapshot();
    });

    it('should listen to the onChange event and return the checked value', () => {
        const methodSpy = jest.fn();
        const wrapper = mount(<Composed {...props} onChange={methodSpy} />);

        wrapper.find('input').at(0).simulate('change', { target: { value: '1' } });

        expect(wrapper).toMatchSnapshot();

        wrapper.find('input').at(1).simulate('change', { target: { value: '2' } });

        expect(methodSpy.mock.calls[0][0].value).toBe('1');
        expect(methodSpy.mock.calls[1][0].value).toBe('2');

        expect(wrapper).toMatchSnapshot();
    });
});
