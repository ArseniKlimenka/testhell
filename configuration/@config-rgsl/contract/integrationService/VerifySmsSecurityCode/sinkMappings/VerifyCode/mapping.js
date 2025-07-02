'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const policyHolderCode = sinkExchange.resolveContext('policyHolderCode');
    const securityCode = sinkExchange.resolveContext('securityCode');
    const contractNumber = sinkExchange.resolveContext('contractNumber');

    return {
        request: {
            ReferenceNumber: contractNumber,
            PartyCode: policyHolderCode,
            TypeCode: 0,
            SecurityCode: securityCode
        }
    };
};
