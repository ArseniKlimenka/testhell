module.exports = function resultMapping(input) {

    const result = {
        accountNumber: input.ACCOUNT_NUMBER,
        paymentDescription: input.PAYMENT_DESCRIPTION,
    };

    return result;
};
