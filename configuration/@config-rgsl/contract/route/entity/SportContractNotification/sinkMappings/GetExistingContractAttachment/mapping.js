'use strict';

module.exports = function mapping(sinkInput) {

    const body = sinkInput.body;
    const policyPrintout = body?.productConfiguration?.policyPrintout;
    if (policyPrintout != "sportPolicy") {
        return;
    }

    return {
        entityId: sinkInput.id,
        attachmentType: 'contractSigned'
    };
};
