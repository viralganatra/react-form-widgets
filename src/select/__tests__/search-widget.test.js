import React from 'react';
import SearchWidget from '../search-widget';

jest.mock('../../input/single/input', () => jest.fn(
    ({ inputRef, ...rest }) => <input {...rest} ref={inputRef} />,
));

describe('SelectSearchWidget', () => {
    it('should render correctly, setting the focus on mount', () => {
        const wrapper = mount(<SearchWidget />);

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('input').node).toBe(document.activeElement);
    });
});
