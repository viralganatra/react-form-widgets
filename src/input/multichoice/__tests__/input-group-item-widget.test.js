import React from 'react';
import InputGroupItemWidget from '../input-group-item-widget';

jest.mock('../../single/input');
jest.mock('../../../label/label-widget');

const data = {
    label: {
        content: 'Label',
        className: 'label-class',
    },
    type: 'checkbox',
    value: '2',
    checked: true,
};

describe('InputGroupItemWidget', () => {
    it('should render correctly', () => {
        const methodSpy = jest.fn();
        const wrapper = shallow(
            <InputGroupItemWidget {...data} onChange={methodSpy} />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should validate prop types', () => {
        const error = console.error;
        console.error = jest.fn();

        shallow(<InputGroupItemWidget label="test" value="2" />);
        shallow(<InputGroupItemWidget {...data} value={2} />);

        expect(console.error.mock.calls[0][0]).toBeDefined();
        expect(console.error.mock.calls[1][0]).toBeDefined();

        console.error = error;
    });
});
