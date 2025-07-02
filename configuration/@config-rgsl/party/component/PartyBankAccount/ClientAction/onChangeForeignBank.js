'use strict';

module.exports = function onChangeForeignBank(input) {

    input.context.bankId = undefined;
    input.context.bankName = undefined;
    input.context.bankBic = undefined;
    input.context.bankCorrespondentAccount = undefined;
    input.context.bankInn = undefined;
    input.context.SWIFT = undefined;
    input.context.IBAN = undefined;
    input.context.personalAccountNumber = undefined;
    input.context.ftdName = undefined;
    input.context.isSettlementThroughFTD = false;
};
