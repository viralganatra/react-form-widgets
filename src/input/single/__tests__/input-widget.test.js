import React from 'react';
import InputWidget from '../input-widget';

describe('InputWidget', () => {
    it('should render correctly with a default type of text if none supplied', () => {
        const InputDefault = shallow(<InputWidget />);
        const InputCustom = shallow(<InputWidget type="number" min="1" max="10" />);

        expect(InputDefault).toMatchSnapshot();
        expect(InputCustom).toMatchSnapshot();
    });
});
