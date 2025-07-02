module.exports = function payerClearButton(input) {
    delete input.data.request.data.criteria.payerName;
};
