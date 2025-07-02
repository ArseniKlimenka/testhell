'use static';

module.exports = function mapping(sinkInput) {

    return {
        businessNumber: sinkInput.cnacellationNumber,
        transition: {
            configurationName: sinkInput.configurationName,
            transitionName: "AwaitingCancellationDate_to_OperationsApproval",
            skipIfNotAvailable: true
        }
    };
};
