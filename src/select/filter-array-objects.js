export default function FilterArrayObjectsByKey({ items, key, searchStr, lowercase = true }) {
    return items.filter((item) => {
        let itemToSearch = item[key];
        let searchString = searchStr;

        if (!itemToSearch) {
            return false;
        }

        if (lowercase) {
            itemToSearch = itemToSearch.toLowerCase();
            searchString = searchStr.toLowerCase();
        }

        return itemToSearch.includes(searchString);
    });
}
