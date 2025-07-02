module.exports = function aaNumberClearButton(input) {
    delete input.data.request.data.criteria.aaNumber;
};
