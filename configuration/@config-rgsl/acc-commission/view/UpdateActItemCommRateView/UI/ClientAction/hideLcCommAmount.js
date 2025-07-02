module.exports = function hideLcCommAmount(input) {
    return !input.context.Body.lcCommAmount;
};
