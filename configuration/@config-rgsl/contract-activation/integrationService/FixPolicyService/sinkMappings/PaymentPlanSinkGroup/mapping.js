module.exports = function mapping(input, sinkExchange) {

    if (input.fixPaymentPlan === true) {

        return input.contractNumbers.map(_ => ({
            contractNumber: _,
        }));
    }
};
