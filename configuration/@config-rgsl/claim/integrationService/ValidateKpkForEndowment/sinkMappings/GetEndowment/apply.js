'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data.length !== 1) {
        throw 'Endowment was not found! (' + sinkResult.data.length + ')';
    }

    sinkExchange.endowment = sinkResult.data[0].resultData;

    // TODO: code below must be removed after transition effect will be implemented for evaluationContext. This could be done in adinsure 46.
    const allowedEndowmentStates = [
        'DirectorAproval',
        'OperationsApproval',
        'OperationsDirectorApproval',
    ];

    if (!allowedEndowmentStates.includes(sinkExchange.endowment.universalDocumentState)) {
        this.stopExecution('Wrong endowment state');
    }
};
