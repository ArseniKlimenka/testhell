module.exports = function mapping(input, sinkExchange) {

    if (!sinkExchange.canCreateCancellation) {

        return null;
    }

    if (sinkExchange.totalAmount == 0) {

        return null;
    }

    const result = {
        businessNumber: sinkExchange.createdAmendmentNumber,
        transition: {
            transitionName: "OperationsApproval_to_AwaitingPaymentDocuments",
            configurationName: sinkExchange.createdAmendmentConfigurationCodeName,
            configurationVersion: "1"
        }
    };

    return result;
};
