'use strict';

module.exports = function rule(input) {

    const body = input.body;
    const number = body.contract?.number;
    const fullName = body.holder?.fullName;
    const typeOfRequest = body.typeOfRequest;
    const amendmentReason = body.amendmentReason;
    const bankNumber = body.bankAccount?.number;

    if (!number || !fullName || !typeOfRequest || !amendmentReason || !bankNumber) {

        return;
    }

    const productGroup = body.contract?.productGroup;
    const partnerBusinessCode = body.contract?.partnerBusinessCode;

    if (productGroup == 'credit' && amendmentReason == 'byClientCoolOff') {

        return true;
    }
};
