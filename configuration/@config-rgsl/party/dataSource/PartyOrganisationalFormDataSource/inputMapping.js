module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.organisationalFormSearchText = null;

    if (input.data && input.data.criteria
        && input.data.criteria.organisationalFormSearchText
        && input.data.criteria.organisationalFormSearchText.length > 0) {
        output.parameters.organisationalFormSearchText = '%' + input.data.criteria.organisationalFormSearchText.toUpperCase() + '%';
    }

    return output;

};
