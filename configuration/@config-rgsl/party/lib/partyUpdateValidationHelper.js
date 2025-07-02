const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');

module.exports = {

    bankAccountValidation: function (input, self) {

        const validationErrors = [];
        const dataPath = getValue(self, 'businessContext.dataPath');

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
                bankName.indexOf('ГУ БАНКА РОССИИ ПО ЦФО//УФК ПО Г. МОСКВЕ г. Москва') >= 0;

            if (!noValidation) {

                const coeff = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
                const str = bankBic.substring(bankBic.length - 3) + number;
                const keyNumber = str.split('').reduce((acc, cur, index) => { return acc += cur * coeff[index]; }, 0);
                if (keyNumber % 10 != 0) {
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
                (currencyNumericCode = "643" && currencyNumericCodeFromNumber == "810"))) {
                validationErrors.push({
                    errorCode: "accountNumberCurrencyNumericCode",
                    errorDataPath: dataPath + '/number'
                });
            }

        }

        if (!currencyNumericCode && number && number.length == 20) {
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

        return validationErrors;

    },

    partyBodyValidation: function (body, validationErrors, self) {

        this.addressesTypeCountValidation("partyAddresses", validationErrors, body.partyAddresses, self);
        this.phonesTypeCountValidation("partyPhones", validationErrors, body.partyPhones, self);
        this.emailsCountValidation("partyEmails", validationErrors, body.partyEmails, self);
        this.bankAccountsCountValidation("partyBankAccounts", validationErrors, body.partyBankAccounts, self);

        return validationErrors;
    },

    addressesTypeCountValidation: function (item, validationErrors, partyAddresses, self) {

        if (!partyAddresses) {

            return;
        }

        const addressTypes = partyAddresses?.map(x => x.addressType.addressTypeCode);

        const hasDuplicates = this.checkDuplicationInArray(addressTypes);

        if (hasDuplicates) {

            this.pushError(validationErrors, 'Может быть указано только по одному адресу каждого типа', item, self);
        }
    },

    phonesTypeCountValidation: function (item, validationErrors, partyPhones, self) {

        if (!partyPhones) {

            return;
        }

        const phoneTypes = partyPhones?.map(x => x.phoneType.phoneTypeCode);

        const hasDuplicates = this.checkDuplicationInArray(phoneTypes);

        if (hasDuplicates) {

            this.pushError(validationErrors, 'Может быть указано только по одному телефону каждого типа', item, self);
        }
    },

    emailsCountValidation: function (item, validationErrors, partyEmails, self) {

        if (partyEmails?.length > 1) {

            this.pushError(validationErrors, 'Может быть указан только один E-mail', item, self);
        }
    },

    bankAccountsCountValidation: function (item, validationErrors, partyBankAccounts, self) {

        if (partyBankAccounts?.length > 1) {

            this.pushError(validationErrors, 'Может быть указан только один банковский счет', item, self);
        }
    },

    checkDuplicationInArray: function (array) {

        return (new Set(array)).size !== array.length;
    },

    /**
     * @desc push error to validationErrors array
     */
    pushError: function (validationErrors, errorCode, item, self) {

        const errorMessage = "errorCode: " + errorCode + ", errorDataPath: " + (self.businessContext.dataPath + item ? ('/' + item) : '');
        validationErrors.push(errorMessage);
    }
};

