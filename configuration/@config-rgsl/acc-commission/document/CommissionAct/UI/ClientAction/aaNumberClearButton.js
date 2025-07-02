module.exports = function aaNumberClearButton(input) {
    delete input.context.Body.aaNumber;
    delete input.context.Body.aaName;
};
