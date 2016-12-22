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

        const wrapperInvalidResetSelection = () => shallow(
            <LabelWidget {...props} onResetSelection={2} />,
        );

        expect(wrapperInvalidLabel).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidPlaceholder).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidOnClick).toThrowErrorMatchingSnapshot();
        expect(wrapperInvalidResetSelection).toThrowErrorMatchingSnapshot();
    });

    it('should display the close action if the prop onResetSeletion is present', () => {
        const wrapper = shallow(
            <LabelWidget {...props} onResetSelection={noop} />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should call the onResetSeletion method from props when the close action is called', () => {
        const methodSpy = jest.fn();

        const wrapper = shallow(
            <LabelWidget {...props} onResetSelection={methodSpy} />,
        );

        wrapper.find('div').first().childAt(1).simulate('click');

        expect(methodSpy).toHaveBeenCalled();
    });
});
