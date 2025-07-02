'use strict';

const partyBankAccountLib = require('@config-rgsl/party/component/PartyBankAccount/lib/partyBankAccountLib');

/**
 * @errorCode {errorCode} openingDateMoreClosingDate
 * @errorCode {errorCode} closingDateLessOpeningDate
 * @errorCode {errorCode} bankBicFormat
 * @errorCode {errorCode} bankByBicIsNotFound
 * @errorCode {errorCode} accountNumberFormat
 * @errorCode {errorCode} accountNumberKeySumm
 * @errorCode {errorCode} accountNumberCurrencyNumericCode
 * @errorCode {errorCode} accountNumberCurrency
 * @errorCode {errorCode} currencyIsRequired
 * @errorCode {errorCode} SWIFTIsRequired
 * @errorCode {errorCode} IBANIsRequired
 * @errorCode {errorCode} INNWarning
 * @errorCode {errorCode} ftdBankAccountNumberFormat
 * @errorCode {errorCode} ftdAccountNumberFormat
 */

module.exports = function validatePartyBankAccount(input) {

    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return []; }

    return partyBankAccountLib.bankAccountValidation(input, this);

};
