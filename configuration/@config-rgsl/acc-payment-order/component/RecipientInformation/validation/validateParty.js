'use strict';

const { paymentOrderType } = require('@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst');

/**
 * @errorCode {errorCode} noPartyCode
 * @errorCode {errorCode} incorrectBankAccountNoNaturalPerson
 * @errorCode {errorCode} incorrectBankAccountNoLegalEntity
 * @errorCode {errorCode} incorrectBankAccountNoSoleProprietor
 */

module.exports = function validateParty(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;
    const bodyPaymentOrderType = this.businessContext.rootData.paymentOrderInformation?.paymentOrderType;

    const partyCode = input.partyCodeName;
    if (!partyCode) {
        validationErrors.push({
            errorCode: 'noPartyCode',
            errorDataPath: dataPath + '/partyFullName'
        });
    }

    const partyType = input.partyType;
    const bankAccountNumber = input.bankAccount?.bankAccountNumber;
    if (partyType && bankAccountNumber && bankAccountNumber.length >= 5 && bodyPaymentOrderType != paymentOrderType.Commission) {
        const bankAccountNumber3 = bankAccountNumber.slice(0, 3);
        const bankAccountNumber5 = bankAccountNumber.slice(0, 5);

        const np = bankAccountNumber3 === '408' || bankAccountNumber3 === '423' || bankAccountNumber5 === '40914';
        const le = bankAccountNumber3 === '407' || bankAccountNumber5 === '40807' || bankAccountNumber5 === '40915' || bankAccountNumber5 === '47422' || bankAccountNumber5 === '47423';
        const sp = bankAccountNumber5 === '40915' || bankAccountNumber3 === '48002';

        let bankAccountPartyType;
        if (np) { bankAccountPartyType = 'NaturalPerson'; } // ФЛ
        if (le) { bankAccountPartyType = 'LegalEntity'; } // ЮЛ
        if (sp) { bankAccountPartyType = 'SoleProprietor'; } // ИП

        if (partyType !== bankAccountPartyType) {
            if (partyType === 'NaturalPerson') {
                validationErrors.push({
                    errorCode: 'incorrectBankAccountNoNaturalPerson',
                    errorDataPath: dataPath + '/bankAccount'
                });
            } else if (partyType === 'LegalEntity') {
                validationErrors.push({
                    errorCode: 'incorrectBankAccountNoLegalEntity',
                    errorDataPath: dataPath + '/bankAccount'
                });
            } else if (partyType === 'SoleProprietor') {
                validationErrors.push({
                    errorCode: 'incorrectBankAccountNoSoleProprietor',
                    errorDataPath: dataPath + '/bankAccount'
                });
            }
        }
    }

    return validationErrors;

};
