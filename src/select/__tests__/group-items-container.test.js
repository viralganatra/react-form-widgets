import React from 'react';
import GroupItemsContainerHOC from '../group-items-container';

const mockItems = [
    { label: 'test', value: 1 },
    { label: 'foo', value: 2 },
    { label: 'apple', value: 3 },
];

jest.mock('../filter-array-objects', () =>
    jest.fn(() => mockItems)
    .mockImplementationOnce(() => [
        { label: 'apple', value: 3 },
    ])
    .mockImplementationOnce(() => [
        { label: 'test', value: 1 },
        { label: 'apple', value: 3 },
    ]),
);

const Item = (props) => <div {...props}>Test</div>;

const props = {
    test: '1',
    shouldDisplay: true,
    items: mockItems,
    enableSearch: false,
};

describe('GroupItemsContainer', () => {
    let Component;

    beforeAll(() => {
        Component = GroupItemsContainerHOC(Item);
    });

    it('should render correctly', () => {
        const wrapperNotDisplay = shallow(
            <Component {...props} shouldDisplay={false} />,
        );

        const wrapperDisplay = shallow(<Component {...props} />);

        const wrapperNoItems = shallow(<Component {...props} items={[]} />);

        expect(wrapperNotDisplay).toMatchSnapshot();
        expect(wrapperDisplay).toMatchSnapshot();
        expect(wrapperNoItems).toMatchSnapshot();
    });

    it('should validate the prop types', () => {
        const wrapperInvalidShouldDisplay = () => shallow(
            <Component {...props} shouldDisplay={null} />,
        );

        const wrapperInvalidItems = () => shallow(
            <Component {...props} items={null} />,
        );

        const wrapperInvalidEnableSearch = () => shallow(
            <Component {...props} enableSearch={2} />,
        );

        expect(wrapperInvalidShouldDisplay).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidItems).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidEnableSearch).toThrowErrorMatchingSnapshot();
    });

    it('should display the search widget by default', () => {
        const { enableSearch, ...rest } = props;
        const wrapper = shallow(<Component {...rest} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should filter the array of items, returning a reduced number of items', () => {
        const wrapper = shallow(
            <Component {...props} enableSearch={true} />,
        );

        const node = wrapper.find('div').childAt(0);

        node.simulate('change', { value: 'app' });

        expect(wrapper).toMatchSnapshot();

        node.simulate('change', { value: '' });

        expect(wrapper).toMatchSnapshot();

        node.simulate('change', { value: 'e' });

        expect(wrapper).toMatchSnapshot();
    });
});
