import FilterArrayObjects from '../filter-array-objects';

const props = {
    items: [
        { label: 'Apple' },
        { label: 'Orange' },
        { label: 'Pear' },
        { label: 'Bear' },
    ],
    key: 'label',
}

describe('FilterArrayObjectsByKey', () => {
    it('should filter a list of items based on a key', () => {
        const filteredSingle = FilterArrayObjects({
            ...props,
            searchStr: 'apple',
        });

        const filteredMulti = FilterArrayObjects({
            ...props,
            searchStr: 'ear',
        });

        const filteredInvalidKey = FilterArrayObjects({
            ...props,
            key: 'foo',
            searchStr: 'ear',
        });

        expect(filteredSingle).toMatchSnapshot();
        expect(filteredMulti).toMatchSnapshot();
        expect(filteredInvalidKey).toMatchSnapshot();
    });

    it('should accept case sensitive values', () => {
        const filteredMatches = FilterArrayObjects({
            ...props,
            lowercase: false,
            searchStr: 'Apple',
        });

        const filteredNoMatches = FilterArrayObjects({
            ...props,
            lowercase: false,
            searchStr: 'apple',
        });

        expect(filteredMatches).toMatchSnapshot();
        expect(filteredNoMatches).toMatchSnapshot();
    });
});
