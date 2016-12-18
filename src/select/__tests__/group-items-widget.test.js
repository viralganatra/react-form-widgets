import React from 'react';
import GroupItems from '../group-items-widget';

jest.mock('../group-item-widget', () => jest.fn((props) => <li {...props} />));

function noop() {}

const props = {
    items: [
        {
            label: 'test 1',
            value: 1,
        },
        {
            label: 'test 2',
            value: 2,
        },
    ],
    onItemSelection: noop,
};

describe('GroupItemsWidget', () => {
    it('should render an array of items', () => {
        const wrapper = shallow(<GroupItems {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should validate the prop types', () => {
        const wrapperInvalidItems = () => shallow(
            <GroupItems {...props} items={[{ value: 'foo' }]} />,
        );

        const wrapperInvalidOnItemSelection = () => shallow(
            <GroupItems {...props} onItemSelection={2} />,
        );

        expect(wrapperInvalidItems).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidOnItemSelection).toThrowErrorMatchingSnapshot();
    });

    it('should call the props method onItemSelection with the item as an argument', () => {
        const methodSpy = jest.fn();
        const wrapper = mount(<GroupItems {...props} onItemSelection={methodSpy} />);

        wrapper.find('li').first().simulate('click');

        expect(methodSpy).toHaveBeenCalledWith(props.items[0]);
    });
});
