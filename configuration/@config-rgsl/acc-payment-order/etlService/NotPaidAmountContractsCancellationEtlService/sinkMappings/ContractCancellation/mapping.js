'use strict';

module.exports = function mapping(sinkInput) {

    return {
        businessNumber: sinkInput.contractNumber,
        transition: {
            configurationName: sinkInput.configurationName,
            transitionName: getTransactionNameByStatId(sinkInput.stateId),
            skipIfNotAvailable: true
        }
    };
};

function getTransactionNameByStatId(stateId) {

    const draftStateId = 1;

    const draftTransitionName = "Draft_to_Cancelled";

    const activeStateId = 20;

    const activeTransitionName = "Active_to_Cancelled";

    switch (stateId) {

        case draftStateId:
            return draftTransitionName;
        case activeStateId:
            return activeTransitionName;
        default:
            return null;
    }
}
