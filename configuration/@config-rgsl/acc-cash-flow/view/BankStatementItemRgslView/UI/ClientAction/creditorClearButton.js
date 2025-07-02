module.exports = function creditorClearButton(input) {
    delete input.data.request.data.criteria.creditorName;
};
