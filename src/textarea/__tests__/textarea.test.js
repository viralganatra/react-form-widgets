import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TextareaWidget from '../textarea-widget';

describe('TextareaWidget', () => {
    it('should render a single textarea widget', () => {
        const wrapper = shallow(<TextareaWidget />);

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});
