module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.countrySearchText = null;
    output.parameters.withoutObsolete = true;

    if (input.data && input.data.criteria
        && input.data.criteria.countrySearchText
        && input.data.criteria.countrySearchText.length > 0) {
        output.parameters.countrySearchText = '%' + input.data.criteria.countrySearchText.toUpperCase() + '%';
    }

    if (input.data && input.data.criteria
        && input.data.criteria.withoutObsolete === false) {
        output.parameters.withoutObsolete = false;
    }

    output.sort = {};
    output.sort['COUNTRY_SHORT_NAME'] = 'asc';

    return output;

};
