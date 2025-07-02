module.exports = function enableDocumentNumber(input) {
    const criteria = input.context.request.data.criteria;
    return !criteria.documentNumbersStr;
};
