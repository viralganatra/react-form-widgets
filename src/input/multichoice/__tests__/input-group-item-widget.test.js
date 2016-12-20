import React from 'react';
import InputGroupItemWidget from '../input-group-item-widget';

jest.mock('../../single/input', () => jest.fn());
jest.mock('../../../label/label-widget', () => jest.fn());

const props = {
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
            <InputGroupItemWidget {...props} onChange={methodSpy} />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should validate prop types', () => {
        const wrapperInvalidLabel = () => shallow(
            <InputGroupItemWidget {...props} label={2} />,
        );

        const wrapperInvalidValue = () => shallow(
            <InputGroupItemWidget {...props} value={2} />,
        );

        expect(wrapperInvalidLabel).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidValue).toThrowErrorMatchingSnapshot();
    });
});
