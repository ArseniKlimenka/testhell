module.exports = function productResponseMapping(input, ambientProperties) {

    let output = [];

    if (input.response && input.response.data && input.response.data.length > 0) {
        output = input.response.data
            .map(elem => elem.resultData)
            .map(elem => {
                elem.productDescription = elem.productDescription + ' (' + elem.productCode + ')';
                return elem;
            })
            .filter(elem => {
                return elem.productDescription.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '');
            });
    }

    return output
        .sort((a, b) => (a.productDescription > b.productDescription) ? 1 : ((b.productDescription > a.productDescription) ? -1 : 0));

};
