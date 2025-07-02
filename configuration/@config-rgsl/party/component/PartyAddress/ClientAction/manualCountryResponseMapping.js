module.exports = function manualCountryResponseMapping(input, ambientProperties) {
    let output = [];

    const manualCountry = input.componentContext.manualCountry;

    if (input.searchText || manualCountry === undefined) {
        if (input && input.response && input.response.data && input.response.data.length > 0) {
            output = _.map(input.response.data, (elem) => {
                return elem.resultData;
            });
        }
    }
    else {
        output.push(manualCountry);
    }

    return output;
};
