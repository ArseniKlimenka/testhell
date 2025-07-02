'use strict';

module.exports = function rule(input) {

    const body = input.body;
    const number = body.contract?.number;
    const fullName = body.holder?.fullName;
    const typeOfRequest = body.typeOfRequest;
    const amendmentReason = body.amendmentReason;
    const bankNumber = body.bankAccount?.number;
    const isCancellation = typeOfRequest == 'Cancellation';

    if (!number || !fullName || !typeOfRequest || !amendmentReason ||
        !bankNumber) { return; }

    const productGroup = body.contract?.productGroup;

    const coolof = productGroup == 'credit' && amendmentReason == 'byClientCoolOff';

    if (!coolof && isCancellation) {

        return true;
    }
};
