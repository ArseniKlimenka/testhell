module.exports = function taxResidenceResponseMapping(input, ambientProperties) {
    let output = [];

    const taxResidence = input.componentContext.taxResidence;

    if (input.searchText || taxResidence === undefined) {
        if (input && input.response && input.response.data && input.response.data.length > 0) {
            output = _.map(input.response.data, (elem) => {
                return elem.resultData;
            });
        }
    }
    else {
        output.push(taxResidence);
    }

    return output;
};
