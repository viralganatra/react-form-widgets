import React from 'react';
import SelectContainer from '../container';

jest.mock('react-clickoutside');
jest.mock('../label-widget', () => jest.fn());
jest.mock('../group-items-container', () => jest.fn());
jest.mock('../group-items-widget', () => jest.fn());

const props = {
    items: [
        {
            label: 'Test 1',
            value: 1,
        },
        {
            label: 'Test 2',
            value: 2,
        },
    ],
};

describe('Container', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<SelectContainer {...props} />);
        const wrapperSelected = shallow(
            <SelectContainer {...props} {...props.items[0]} />,
        );
        const wrapperEnableSelectionReset = shallow(
            <SelectContainer {...props} enableSelectionReset={true} />,
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapperSelected).toMatchSnapshot();
        expect(wrapperEnableSelectionReset).toMatchSnapshot();

        wrapper.find('div').childAt(0).simulate('click');

        expect(wrapper).toMatchSnapshot();

        wrapper.find('div').childAt(1).simulate('clickOutside');

        expect(wrapper).toMatchSnapshot();
    });

    it('should validate the prop types', () => {
        const wrapperInvalidLabel = () => shallow(
            <SelectContainer {...props} label={2} />,
        );

        const wrapperInvalidValue = () => shallow(
            <SelectContainer {...props} value={[]} />,
        );

        const wrapperInvalidItems = () => shallow(
            <SelectContainer items={[{ label: 2, value: [] }]} />,
        );

        expect(wrapperInvalidLabel).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidValue).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidItems).toThrowErrorMatchingSnapshot();
    });

    it('should set the selected item in state when onItemSelection is called', () => {
        const wrapper = shallow(<SelectContainer {...props} />);

        wrapper.find('div').childAt(1).simulate('itemSelection', props.items[1]);

        expect(wrapper).toMatchSnapshot();
    });

    it('should call the onChange event from props when onItemSelection is called', () => {
        const methodSpy = jest.fn();
        const wrapper = shallow(<SelectContainer {...props} onChange={methodSpy} />);

        wrapper.find('div').childAt(1).simulate('itemSelection', props.items[1]);

        expect(methodSpy).toHaveBeenCalledWith(props.items[1]);
    });
});
