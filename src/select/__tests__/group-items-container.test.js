import React from 'react';
import GroupItemsContainerHOC from '../group-items-container';

const Item = (props) => <div {...props}>Test</div>;

const props = {
    test: '1',
    shouldDisplay: true,
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

        expect(wrapperNotDisplay).toMatchSnapshot();
        expect(wrapperDisplay).toMatchSnapshot();
    });

    it('should validate the prop types', () => {
        const wrapperInvalid = () => shallow(
            <Component {...props} shouldDisplay={null} />,
        );

        expect(wrapperInvalid).toThrowErrorMatchingSnapshot();
    });
});
