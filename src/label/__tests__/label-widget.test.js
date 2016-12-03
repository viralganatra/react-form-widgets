import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import LabelWidget from '../label-widget';

describe('LabelWidget', () => {
    it('should render a single label widget correctly', () => {
        const wrapper= shallow(<LabelWidget>Test</LabelWidget>);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should throw an error if there are no children', () => {
        const error = console.error;
        console.error = jest.fn();

        shallow(<LabelWidget />);

        expect(console.error).toBeCalled();

        console.error = error;
    });

    it('should apply any label props to the label element', () => {
        const wrapper = shallow(
            <LabelWidget className="test" htmlFor="test">Test</LabelWidget>,
        );

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});
