import React from 'react';
import LabelWidget from '../label-widget';

function noop() {}

const props = {
    label: 'test',
    placeholder: 'test',
    className: 'bar',
    onClick: noop,
};

describe('LabelWidget', () => {
    it('should render correctly', () => {
        const wrapperNoLabel = shallow(
            <LabelWidget {...props} label={null} />,
        );

        const wrapperLabel = shallow(
            <LabelWidget {...props} />,
        );

        expect(wrapperNoLabel).toMatchSnapshot();
        expect(wrapperLabel).toMatchSnapshot();
    });

    it('should validate the prop types', () => {
        const wrapperInvalidLabel = () => shallow(
            <LabelWidget {...props} label={2} />,
        );

        const wrapperInvalidPlaceholder = () => shallow(
            <LabelWidget {...props} placeholder={2} />,
        );

        const wrapperInvalidOnClick = () => shallow(
            <LabelWidget {...props} onClick={[]} />,
        );

        expect(wrapperInvalidLabel).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidPlaceholder).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidOnClick).toThrowErrorMatchingSnapshot();
    });
});
