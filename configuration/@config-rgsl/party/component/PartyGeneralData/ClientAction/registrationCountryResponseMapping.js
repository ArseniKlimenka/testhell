module.exports = function registrationCountryResponseMapping(input, ambientProperties) {
    let output = [];

    const registrationCountry = input.componentContext.registrationCountry;

    if (input.searchText || registrationCountry == undefined) {
        if (input && input.response && input.response.data && input.response.data.length > 0) {
            output = _.map(input.response.data, (elem) => {
                return elem.resultData;
            });
        }
    }
    else {
        output.push(registrationCountry);
    }

    return output;
};
