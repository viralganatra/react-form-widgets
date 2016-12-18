import React from 'react';
import TextareaWidget from '../textarea-widget';

describe('TextareaWidget', () => {
    it('should render a single textarea widget', () => {
        const wrapper = shallow(<TextareaWidget />);

        expect(wrapper).toMatchSnapshot();
    });
});
