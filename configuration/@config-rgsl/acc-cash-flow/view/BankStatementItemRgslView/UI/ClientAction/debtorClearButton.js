module.exports = function debtorClearButton(input) {
    delete input.data.request.data.criteria.debtorName;
};
