import React from 'react';
import GroupItem from '../group-item-widget';

function noop() {}

const props = {
    label: 'test',
    onClick: noop,
};

describe('GroupItemWidget', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<GroupItem {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should validate the prop types', () => {
        const wrapperInvalidLabel = () => shallow(
            <GroupItem {...props} label={null} />,
        );

        const wrapperInvalidOnClick = () => shallow(
            <GroupItem {...props} onClick="test" />,
        );

        expect(wrapperInvalidLabel).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidOnClick).toThrowErrorMatchingSnapshot();
    });

    it('should listen to the onClick event and call the prop onClick method', () => {
        const methodSpy = jest.fn();
        const wrapper = shallow(<GroupItem {...props} onClick={methodSpy} />);

        wrapper.find('li').simulate('click');

        expect(methodSpy).toHaveBeenCalled();
    });
});
