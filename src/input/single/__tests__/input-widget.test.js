import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import InputWidget from '../input-widget';

describe('InputWidget', () => {
    it('should render correctly with a default type of text if none supplied', () => {
        const InputDefault = shallow(<InputWidget />);
        const InputCustom = shallow(<InputWidget type="number" min="1" max="10" />);

        expect(shallowToJson(InputDefault)).toMatchSnapshot();
        expect(shallowToJson(InputCustom)).toMatchSnapshot();
    });
});
