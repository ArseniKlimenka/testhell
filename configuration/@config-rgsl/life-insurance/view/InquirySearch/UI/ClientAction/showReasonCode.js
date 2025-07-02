'use strict';

module.exports = function showReasonCode(input, ambientProperties) {

    const documentCodeName = input.context.request.data.criteria.documentCodeName;

    if (documentCodeName?.includes('Endowment') || documentCodeName?.includes('LifeInsuranceCancellation')) {
        return true;
    }

};
