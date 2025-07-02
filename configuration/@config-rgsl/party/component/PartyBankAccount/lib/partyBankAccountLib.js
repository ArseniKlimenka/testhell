const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');
const { accountStartsWith } = require('@config-rgsl/party/lib/partyBankAccountConstants');

module.exports = {

    /**
     * @desc Validation of party bank account
     * @param {object} input party bank account from component
     * @param {object} self this context from component
     * @return {array} validationErrors
     */
    bankAccountValidation: function (input, self) {

        const validationErrors = [];
        const dataPath = getValue(self, 'businessContext.dataPath');
        const body = getValue(self, 'businessContext.rootData') || self.view.getContext().Body;

        const bankBic = input.bankBic;
        const bankName = input.bankName;
        const bankCorrespondentAccount = input.bankCorrespondentAccount;
        const number = input.number;
        let currencyNumericCode = input.currency && input.currency.currencyNumericCode;
        const openingDate = input.openingDate;
        const closingDate = input.closingDate;
        const foreignBank = input.foreignBank;
        const SWIFT = input.SWIFT;
        const IBAN = input.IBAN;
        const inn = input.bankInn;
        const skipForMigratedByAPI = partyValidationHelper.isSkipForMigratedByAPI(body, self);
        const isSettlementThroughFTD = input.isSettlementThroughFTD;

        if (openingDate && closingDate && openingDate >= closingDate) {
            validationErrors.push({
                errorCode: "openingDateMoreClosingDate",
                errorDataPath: dataPath + '/openingDate'
            });
            validationErrors.push({
                errorCode: "closingDateLessOpeningDate",
                errorDataPath: dataPath + '/closingDate'
            });
        }

        if (!foreignBank) {
            if (!bankBic || bankBic.length != 9) {
                validationErrors.push({
                    errorCode: "bankBicFormat",
                    errorDataPath: dataPath + '/bankBic'
                });
            }
            else if (!bankName || !bankCorrespondentAccount) {
                validationErrors.push({
                    errorCode: "bankByBicIsNotFound",
                    errorDataPath: dataPath + '/bankBic'
                });
            }
        }
        else {
            if (!SWIFT) {
                validationErrors.push({
                    errorCode: "SWIFTIsRequired",
                    errorDataPath: dataPath + '/SWIFT'
                });
            }
            if (!IBAN) {
                validationErrors.push({
                    errorCode: "IBANIsRequired",
                    errorDataPath: dataPath + '/IBAN'
                });
            }
        }

        if (!number || !number.match(/^\d{20}$/)) {
            validationErrors.push({
                errorCode: "accountNumberFormat",
                errorDataPath: dataPath + '/number'
            });
        }

        if (bankBic && bankName && number && number.length == 20) {

            const noValidation = bankName.indexOf('РКЦ') >= 0 ||
                bankName.indexOf('ГРКЦ') >= 0 ||
                isSettlementThroughFTD;

            if (!noValidation) {

                const coeff = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
                const str = bankBic.substring(bankBic.length - 3) + number;
                const keyNumber = str.split('').reduce((acc, cur, index) => { return acc += cur * coeff[index]; }, 0);
                if (keyNumber % 10 != 0 && !skipForMigratedByAPI) {
                    validationErrors.push({
                        errorCode: "accountNumberKeySumm",
                        errorDataPath: dataPath + '/number'
                    });
                }

            }

        }

        if (currencyNumericCode && number && number.length == 20) {
            const currencyNumericCodeFromNumber = number.substring(5, 8);
            if (!(currencyNumericCodeFromNumber == currencyNumericCode ||
                (currencyNumericCode = "643" && currencyNumericCodeFromNumber == "810")) && !skipForMigratedByAPI) {
                validationErrors.push({
                    errorCode: "accountNumberCurrencyNumericCode",
                    errorDataPath: dataPath + '/number'
                });
            }

        }

        if (!currencyNumericCode && number && number.length == 20 && !skipForMigratedByAPI) {
            validationErrors.push({
                errorCode: "accountNumberCurrency",
                errorDataPath: dataPath + '/number'
            });
        }

        if (inn && !partyValidationHelper.innValidationLegalEntity(inn)) {
            validationErrors.push({
                errorCode: "INNWarning",
                errorDataPath: dataPath + '/bankInn',
            });
        }

        if (isSettlementThroughFTD) {
            if (bankCorrespondentAccount && bankCorrespondentAccount.substring(0, accountStartsWith.ftdBankCorrespondentAccount.length) !== accountStartsWith.ftdBankCorrespondentAccount) {
                validationErrors.push({
                    errorCode: "ftdBankAccountNumberFormat",
                    errorDataPath: dataPath + '/bankAccountNumber',
                });
            }

            if (number && number.substring(0, accountStartsWith.ftdBankAccount.length) !== accountStartsWith.ftdBankAccount) {
                validationErrors.push({
                    errorCode: "ftdAccountNumberFormat",
                    errorDataPath: dataPath + '/number',
                });
            }
        }

        return validationErrors;

    }

};
