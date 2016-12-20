import React from 'react';
import LabelWidget from '../label-widget';

describe('LabelWidget', () => {
    it('should render a single label widget correctly', () => {
        const wrapper = shallow(<LabelWidget>Test</LabelWidget>);

        expect(wrapper).toMatchSnapshot();
    });

    it('should throw an error if there are no children', () => {
        const wrapperInvalidChildren = () => shallow(<LabelWidget />);

        expect(wrapperInvalidChildren).toThrowErrorMatchingSnapshot();
    });

    it('should apply any label props to the label element', () => {
        const wrapper = shallow(
            <LabelWidget className="test" htmlFor="test">Test</LabelWidget>,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
