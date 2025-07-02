module.exports = function enableDocumentNumbers(input) {
    const criteria = input.context.request.data.criteria;
    return !criteria.documentNumber;
};
