module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.productCode = null;
    output.parameters.issueDate = null;

    if (!input.data) { return output; }
    const criteria = input.data.criteria;

    if (criteria && criteria.productCode && criteria.productCode.length > 0) {
        output.parameters.productCode = criteria.productCode;
    }

    if (criteria.issueDate) {
        output.parameters.issueDate = criteria.issueDate;
    }
    if (criteria.isPolicyHolder) {
        output.parameters.isPolicyHolder = criteria.isPolicyHolder;
    }

    return output;
};
