module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.agencySearchText = null;

    if (input.data && input.data.criteria && input.data.criteria.agencyCode) {

        output.parameters.agencyCode = input.data.criteria.agencyCode;
    }

    if (input.data && input.data.criteria && input.data.criteria.agencySearchText && input.data.criteria.agencySearchText.length > 0) {
        output.parameters.agencySearchText = '%' + input.data.criteria.agencySearchText.toUpperCase() + '%';
    }

    return output;

};
