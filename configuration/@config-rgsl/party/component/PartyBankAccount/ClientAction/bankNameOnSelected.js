'use strict';

module.exports = function bankNameOnSelected(input) {

    input.context.bankId = input.getLookupSelection()[0].resultData.id;
    input.context.bankName = input.getLookupSelection()[0].resultData.name;
    input.context.bankBic = input.getLookupSelection()[0].resultData.bic;
    input.context.bankCorrespondentAccount = input.getLookupSelection()[0].resultData.correspondentAccount;

};
