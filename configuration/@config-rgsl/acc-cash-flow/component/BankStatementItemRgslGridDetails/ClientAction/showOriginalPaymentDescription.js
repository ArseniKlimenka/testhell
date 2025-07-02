module.exports = function showOriginalPaymentDescription(input) {
    return input.data.originalDescription !== input.data.description;
};
