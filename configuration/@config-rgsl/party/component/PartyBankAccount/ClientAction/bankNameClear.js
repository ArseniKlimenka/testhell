'use strict';

module.exports = function bankNameClear(input) {

    input.context.bankId = undefined;
    input.context.bankName = undefined;
    input.context.bankBic = undefined;
    input.context.bankCorrespondentAccount = undefined;

};
