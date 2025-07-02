'use static';

module.exports = function mapping(sinkInput) {

    return {
        businessNumber: sinkInput.endowmentNumber,
        transition: {
            configurationName: 'Endowment',
            transitionName: "AwaitingEndowmentDate_to_OperationsApproval",
            skipIfNotAvailable: true
        }
    };
};
