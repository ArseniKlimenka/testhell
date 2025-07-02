const { partyType, countryUSA, countryRussia, foreignPerson, addressTypeLikeInUI } = require('@config-rgsl/party/lib/partyConstantsImpl');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = {

    /**
     * @desc Validation of SNILS by rules in part 6.4 in FD Party 2.0DP
     * @param {string} snils string with char like [0-9, '-', ' ']
     * @return {boolean} true if validation done without errors
     */
    snilsValidation: function (snils) {
        let result = true;
        // 1 step
        if (snils === undefined) {
            result = false;
        } else {
            const string = snils.replace(/ /gi, '').replace(/-/gi, '');
            const fixSNILS = Number(string);
            // 2 step
            if (string.length !== 11 || !Number.isInteger(fixSNILS)) {
                result = false;
            } else {
                // 3 step
                const firstNine = fixSNILS / 100;
                // 4 step
                if (firstNine < 1001998) {
                    result = false;
                } else {
                    // 5 step
                    let sumS = 0;

                    const array = string.split('').map(Number);
                    for (let index = 0; index < 9; index++) {
                        sumS += array[index] * (9 - index);
                    }
                    // 6 step
                    const moduloR = sumS % 101;
                    // 7 step
                    const numberE = fixSNILS % 100;
                    // 8 step
                    let numberD = moduloR;
                    if (moduloR === 100) {
                        numberD = 0;
                    }
                    // 9 step
                    if (numberD !== numberE) {
                        result = false;
                    }
                }
            }
        }
        return result;
    },

    /**
     * @desc Validation of INN by rules in part 6.1 in FD Party 2.0
     * @param {string} inn string with char like [0-9]
     * @param {string} typeOfParty string like NaturalPerson, LegalEntity and SoleProprietor
     * @return {boolean} true if validation done without errors
     */
    innValidation: function (inn, typeOfParty) {
        let result = true;

        switch (typeOfParty) {
            case partyType.NaturalPerson:
                result = this.innValidationNauralPersonaAndSoleProprietor(inn);
                break;
            case partyType.LegalEntity:
                result = this.innValidationLegalEntity(inn);
                break;
            case partyType.SoleProprietor:
                result = this.innValidationNauralPersonaAndSoleProprietor(inn);
                break;
            default:
                result = false;
        }

        return result;

    },

    /**
     * @desc Validation of INN by rules in part 6.1.2 in FD Party 2.0
     * @param {string} inn  string with char like [0-9]
     * @return {boolean} true if validation done without errors
     */
    innValidationNauralPersonaAndSoleProprietor: function (inn) {

        let result = true;

        // step 1
        if (inn === undefined) {

            result = false;

        } else {

            const arrayINN = inn.split('').map(Number);

            if (arrayINN.length !== 12 || !arrayINN.every(elem => !isNaN(elem))) {

                result = false;

            } else {
                // step 2
                // step 3
                const arrayControl1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
                let sumS1 = 0;

                for (let index = 0; index < 10; index++) {
                    sumS1 += arrayINN[index] * arrayControl1[index];
                }

                // step 4
                const moduleR1 = sumS1 % 11;

                // step 5
                const numberD1 = moduleR1 % 10;

                // step 6
                // step 7
                const arrayControl2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
                let sumS2 = 0;

                for (let index = 0; index < 11; index++) {
                    sumS2 += arrayINN[index] * arrayControl2[index];
                }

                // step 8
                const moduleR2 = sumS2 % 11;
                // step 9
                const numberD2 = moduleR2 % 10;

                if (numberD1 !== arrayINN[10] || numberD2 !== arrayINN[11]) {

                    result = false;

                }
            }
        }

        return result;

    },

    /**
     * @desc Validation of INN by rules in part 6.1.1 in FD Party 2.0
     * @param {string} inn string with char like [0-9]
     * @return {boolean} true if validation done without errors
     */
    innValidationLegalEntity: function (inn) {

        let result = true;

        // step 1
        if (inn === undefined) {

            result = false;

        } else {

            const arrayINN = inn.split('').map(Number);

            if (arrayINN.length !== 10 || !arrayINN.every(elem => !isNaN(elem))) {

                result = false;

            } else {
                // step 2
                const arrayControl = [2, 4, 10, 3, 5, 9, 4, 6, 8];
                let sumS = 0;

                for (let index = 0; index < 9; index++) {
                    sumS += arrayINN[index] * arrayControl[index];
                }

                // step 3
                const moduleR = sumS % 11;

                // step 4
                const numberD = moduleR % 10;

                if (numberD !== arrayINN[9]) {

                    result = false;

                }
            }
        }

        return result;

    },

    /**
     * @desc Validation of KPP
     * @param {string} kpp string with char like [0-9, '-', ' ']
     * @return {boolean} true if validation done without errors
     */
    kppValidation: function (kpp) {
        let result = true;

        if (kpp === undefined) {

            result = false;

        } else {

            const kppString = kpp.replace(/ /gi, '').replace(/-/gi, '');
            const kppArray = kppString.split('').map(Number);

            if (kppArray.length !== 9 || !kppArray.every(elem => !isNaN(elem))) {

                result = false;

            }
        }
        return result;
    },

    /**
     * @desc Validation of fatca client
     * @param {string} string countryShortName from countryPlace field
     * @param {array} array of object from citizenship field
     * @return {boolean} true if validation done without errors
     */
    usaSearch: function (birthCountry, citizenshipArray) {

        if (birthCountry && birthCountry.countryCode === countryUSA.countryCode) {
            return true;
        }

        if (citizenshipArray !== undefined && citizenshipArray.some(country => country.countryCode === countryUSA.countryCode)) {
            return true;
        }

        return false;

    },

    /**
     * @desc Validation of fatca client
     * @param {string} string countryShortName from countryPlace field
     * @param {array} array of object from citizenship field
     * @param {array} array of object from documents section
     * @return {boolean} true if validation done without errors
     */
    foreignSearch: function (birtCountry, citizenshipArray, documents) {

        if (birtCountry && birtCountry.countryCode === countryUSA.countryCode) {
            return true;
        }

        if (citizenshipArray !== undefined && citizenshipArray.some(country => country.countryCode !== countryRussia.countryCode)) {
            return true;
        }

        if (documents !== undefined && documents.length > 0 && documents.some(document => document.docType && document.docType.docTypeDesc === foreignPerson.foreignPassportDesc)) {
            return true;
        }

        return false;

    },

    /**
     * @desc Validation of OGRN-OGRNIP by rules in part 6.4 in FD Party 2.0
     * @param {string} inn string with char like [0-9]
     * @param {string} typeOfParty string like LegalEntity and SoleProprietor
     * @return {boolean} true if validation done without errors
     */
    ogrnOgrnipValidation: function (ogrnOgrnip, typeOfParty) {

        let result = true;

        switch (typeOfParty) {
            case partyType.LegalEntity:
                result = this.ogrnOgrnipValidationLegalEntity(ogrnOgrnip);
                break;
            case partyType.SoleProprietor:
                result = this.ogrnOgrnipValidationSoleProprietor(ogrnOgrnip);
                break;
            case partyType.NaturalPerson:
                result = this.ogrnOgrnipValidationSoleProprietor(ogrnOgrnip);
                break;
            default:
                result = false;
        }


        return result;

    },

    /**
    * @desc Validation of OGRN by rules in part 6.4.1 in FD Party 2.0
    * @param {string} inn string with char like [0-9]
    * @return {boolean} true if validation done without errors
    */
    ogrnOgrnipValidationLegalEntity: function (ogrnOgrnip) {

        let result = true;

        // step 1
        if (ogrnOgrnip === undefined) {

            result = false;

        } else {

            const arrayOGRN = ogrnOgrnip.split('').map(Number);

            if (arrayOGRN.length !== 13 || !arrayOGRN.every(elem => !isNaN(elem))) {

                result = false;

            } else {
                // step 2
                const ogrn13 = arrayOGRN.pop();

                const numberV = Number(arrayOGRN.join(''));

                // step 3
                const moduleR = numberV % 11;

                // step 4
                const numberD = moduleR % 10;

                // step5
                if (numberD !== ogrn13) {

                    result = false;

                }
            }
        }

        return result;

    },

    /**
    * @desc Validation of OGRNIP by rules in part 6.4.2 in FD Party 2.0
    * @param {string} inn string with char like [0-9]
    * @return {boolean} true if validation done without errors
    */
    ogrnOgrnipValidationSoleProprietor: function (ogrnOgrnip) {

        let result = true;

        if (ogrnOgrnip === undefined) {

            result = false;

        } else {

            const arrayOGRNIP = ogrnOgrnip.split('').map(Number);

            if (arrayOGRNIP.length !== 15 || !arrayOGRNIP.every(elem => !isNaN(elem))) {

                result = false;

            } else {
                // step 2
                const ogrn15 = arrayOGRNIP.pop();

                const numberV = Number(arrayOGRNIP.join(''));

                // step 3
                const moduleR = numberV % 13;

                // step 4
                const numberD = moduleR % 10;

                // step5
                if (numberD !== ogrn15) {

                    result = false;

                }
            }
        }

        return result;

    },

    /**
     * @desc Validation of natural person name part by RGSL rules
     * @errorCode {errorCode} illegalSymbols
     * @errorCode {errorCode} cyrillicAndLatinTogether
     * @errorCode {errorCode} illegalFirstLastSymbol
     * @errorCode {errorCode} twoSpacesOrHyphens
     * @errorCode {errorCode} firstLetterCapital
     */
    personNameValidation: function ({
        item,
        namePart,
        validationErrors,
        self,
        illegalSymbolsRegex,
        cyrillicAndLatinTogetherRegex,
        illegalFirstLastSymbolRegex,
        twoSpacesOrHyphensRegex,
        firstLetterCapitalRegex
    }) {

        illegalSymbolsRegex = illegalSymbolsRegex || new RegExp('^[а-яёА-ЯЁa-zA-Z -]+$');
        cyrillicAndLatinTogetherRegex = cyrillicAndLatinTogetherRegex || new RegExp('^(([а-яёА-ЯЁ -]+)|([a-zA-Z -]+))$');
        illegalFirstLastSymbolRegex = illegalFirstLastSymbolRegex || new RegExp('^(([ -].+)|(.+[ -]))$');
        twoSpacesOrHyphensRegex = twoSpacesOrHyphensRegex || new RegExp('^.+([-]{2}|[ ]{2}).+$');
        firstLetterCapitalRegex = firstLetterCapitalRegex || new RegExp('^[А-ЯЁA-Z]{1}');

        if (!namePart) { return; }

        if (!namePart.match(illegalSymbolsRegex)) {
            this.pushError(validationErrors, 'illegalSymbols', item, self);
            return;
        }
        if (!namePart.match(cyrillicAndLatinTogetherRegex))
        { this.pushError(validationErrors, 'cyrillicAndLatinTogether', item, self); }
        if (namePart.match(illegalFirstLastSymbolRegex))
        { this.pushError(validationErrors, 'illegalFirstLastSymbol', item, self); }
        if (namePart.match(twoSpacesOrHyphensRegex))
        { this.pushError(validationErrors, 'twoSpacesOrHyphens', item, self); }
        if (!namePart.match(firstLetterCapitalRegex))
        { this.pushError(validationErrors, 'firstLetterCapital', item, self); }
    },

    /**
     * @desc Validation of natural person full name by RGSL rules
     * @errorCode {errorCode} cyrillicAndLatinTogetherFullName
     */
    personFullNameValidation: function ({
        lastName,
        firstName,
        middleName,
        validationErrors,
        self,
        cyrillicAndLatinTogetherRegex
    }) {

        cyrillicAndLatinTogetherRegex = cyrillicAndLatinTogetherRegex || new RegExp('^(([а-яёА-ЯЁ -]+)|([a-zA-Z -]+))$');

        if (!lastName || !firstName) { return; }

        const fullName = lastName + firstName + (middleName || '');

        if (!fullName.match(cyrillicAndLatinTogetherRegex))
        { this.pushError(validationErrors, 'cyrillicAndLatinTogetherFullName', undefined, self); }

    },

    /**
     * @desc push error to validationErrors array
     */
    pushError: function (validationErrors, errorCode, item, self) {
        validationErrors.push({
            errorCode: errorCode,
            errorDataPath: self.businessContext.dataPath + item ? ('/' + item) : ''
        });
    },

    /**
     * @desc Need to check is validation necessary
     * @param {object} businessContext of this validation
     * @return {boolean} true if validation needed
     */
    checkValidationPersonData: function (businessContext) {

        const configurationCodeName = businessContext.configurationCodeName;

        if (configurationCodeName === partyType.NaturalPerson) { return true; }

        if (configurationCodeName === partyType.LegalEntity
            && businessContext.rootData.partyOrganisationData.soleExecutiveAuthority === true) { return true; }

        return false;

    },

    /**
     * @desc Helper for contruct wright way in responce maping function
     * @param {object} input which have all infirvation of environment
     * @return {string} right way of content
     */
    rootName: function (input) {

        const configurationCodeName = input.context.ConfigurationCodeName;
        let result = '';

        switch (configurationCodeName) {
            case partyType.NaturalPerson:
                result = 'context.Body.partyPersonData.partyPersonDataCommon';
                break;
            case partyType.LegalEntity:
                result = 'context.Body.partyOrganisationData.partyPersonDataCommon';
                break;
            default:
                result = '';
        }

        return result;

    },
    /**
     * @desc Helper for validate uniqe of OGPNIP
     * @param {array} validationErrors array which will be modifaed from finded error
     * @param {array} arrayHistory is data from table
     * @param {object} this context from component
     * @return {array} validationErrors will be modified if some error will finded
     */
    checkOgrnipUniqe: function (validationErrors, arrayHistory, self) {
        if (!arrayHistory || arrayHistory.length == 0) { return; }
        arrayHistory.forEach((curElement, curIndex) => {
            const curOGRNIP = curElement.partyOGRN.OGRNOGRNIP;
            arrayHistory.slice(curIndex + 1).forEach((anoElement, anoIndex) => {
                const anoOGRNIP = anoElement.partyOGRN.OGRNOGRNIP;
                if (curOGRNIP == anoOGRNIP && curOGRNIP != undefined)
                { this.pushError(validationErrors, 'duplicateOGRNIP', anoIndex, self); }
            });
        });
    },
    /**
     * @desc Helper for validate Consistency of Date, start Date must be before then stop date
     * @param {string} date for validate
     * @return {boolean} true if validation in date is error
     */
    checkConsistencyDate: function (periodStart, periodStop) {
        let result = false;
        if (dateHelper.isAfter(periodStart, periodStop))
        { result = true; }
        return result;
    },
    /**
     * @desc Helper for validate Consistency of Date, date must been before or equal present Date
     * @param {string} date for validate
     * @return {boolean} true if validation in date is error
     */
    checkComingDate: function (dateForValidation) {
        let result = false;
        const currentDate = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT);
        if (dateHelper.isBefore(currentDate, dateForValidation))
        { result = true; }
        return result;
    },
    /**
     * @desc Helper for validate Consistency of Date, periods can't intersected
     * @param {array} validationErrors array which will be modifaed from finded error
     * @param {array} arrayHistory is data from table
     * @param {object} this context from component
     * @return {array} validationErrors will be modified if some error will finded
     */
    checkPeriodsIntersectedSoleProprietorHistory: function (validationErrors, arrayHistory, self) {
        if (!arrayHistory || arrayHistory.length == 0) { return; }
        const currentDate = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT);
        const oldDate = dateHelper.formatDate('0100-01-01');
        arrayHistory.forEach((curElement, curIndex) => {
            const curPeriodStart = curElement.partyOGRN.dateOfStateRegistration || oldDate;
            const curPeriodStop = curElement.partyOGRN.dateOfRecordingTermination || currentDate;
            arrayHistory.slice(curIndex + 1).forEach((anoElement, anoIndex) => {
                const anoPeriodStart = anoElement.partyOGRN.dateOfStateRegistration || oldDate;
                const anoPeriodStop = anoElement.partyOGRN.dateOfRecordingTermination || currentDate;
                if (dateHelper.periodsIntersected(curPeriodStart, curPeriodStop, anoPeriodStart, anoPeriodStop)) {
                    this.pushError(validationErrors, 'badPeriod', curIndex, self);
                    this.pushError(validationErrors, 'badPeriod', curIndex + anoIndex + 1, self);
                }
            });
        });
    },
    /**
     * @desc Helper for validate bank accounts periods
     * @param {array} validationErrors array which will be modified by finded error
     * @param {array} arrayHistory array with periods
     * @param {object} this context from component
     * @return {array} validationErrors will be modified if some error will be found
     */
    checkPeriodsIntersectedBankAccounts: function (validationErrors, arrayHistory, self) {
        if (!arrayHistory || arrayHistory.length == 0) { return; }
        const currentDate = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT);
        const oldDate = dateHelper.formatDate('1900-01-01');
        arrayHistory.forEach((curElement, curIndex) => {
            const curPeriodStart = curElement.openingDate || oldDate;
            const curPeriodStop = curElement.closingDate || currentDate;
            const curPeriodBankId = curElement.bankId || curElement.SWIFT;
            const curPeriodCurrencyCode = curElement.currency && curElement.currency.currencyCode;
            arrayHistory.slice(curIndex + 1).forEach((anoElement, anoIndex) => {
                const anoPeriodStart = anoElement.openingDate || oldDate;
                const anoPeriodStop = anoElement.closingDate || currentDate;
                const anoPeriodBankId = anoElement.bankId || anoElement.SWIFT;
                const anoPeriodCurrencyCode = anoElement.currency && anoElement.currency.currencyCode;
                if (curPeriodBankId == anoPeriodBankId &&
                    curPeriodCurrencyCode == anoPeriodCurrencyCode &&
                    dateHelper.periodsIntersected(curPeriodStart, curPeriodStop, anoPeriodStart, anoPeriodStop)) {
                    this.pushError(validationErrors, 'bankAccountsPeriodsIntercrossing', curIndex, self);
                    this.pushError(validationErrors, 'bankAccountsPeriodsIntercrossing', curIndex + anoIndex + 1, self);
                }
            });
        });
    },
    /**
     * @desc Helper for validate addresses periods
     * @param {array} validationErrors array which will be modified by finded error
     * @param {array} arrayHistory array with periods
     * @param {object} this context from component
     * @return {array} validationErrors will be modified if some error will be found
     */
    checkPeriodsIntersectedAddresses: function (validationErrors, arrayHistory, self) {
        if (!arrayHistory || arrayHistory.length == 0) { return; }
        const currentDate = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT);
        const oldDate = dateHelper.formatDate('1900-01-01');
        arrayHistory.forEach((curElement, curIndex) => {
            const curPeriodStart = curElement.actualFrom || oldDate;
            const curPeriodStop = curElement.actualTo || currentDate;
            const curPeriodAddressType = curElement.addressType && curElement.addressType.addressTypeCode;
            arrayHistory.slice(curIndex + 1).forEach((anoElement, anoIndex) => {
                const anoPeriodStart = anoElement.actualFrom || oldDate;
                const anoPeriodStop = anoElement.actualTo || currentDate;
                const anoPeriodAddressType = anoElement.addressType && anoElement.addressType.addressTypeCode;
                if (curPeriodAddressType == anoPeriodAddressType &&
                    dateHelper.periodsIntersected(curPeriodStart, curPeriodStop, anoPeriodStart, anoPeriodStop)) {
                    this.pushError(validationErrors, 'addressesPeriodsIntercrossing', curIndex, self);
                    this.pushError(validationErrors, 'addressesPeriodsIntercrossing', curIndex + anoIndex + 1, self);
                }
            });
        });
    },

    checkForPassport: function (input, validationErrors, errorDataPath) {
        if (!input || !input.some(curElement => curElement.docType.docTypeClass == 'identity')) {
            validationErrors.push({
                errorCode: 'noPassport',
                errorDataPath
            });
        }
    },

    checkForRegistrationAndPostal: function (input, validationErrors, errorDataPath) {
        if (!input || !input.some(curElement => curElement.addressType.addressTypeCode == addressTypeLikeInUI.registration)) {
            validationErrors.push({
                errorCode: 'noRegistrationAddress',
                errorDataPath
            });
        }
        if (!input || !input.some(curElement => curElement.addressType.addressTypeCode == addressTypeLikeInUI.fact)) {
            validationErrors.push({
                errorCode: 'noFactAddress',
                errorDataPath
            });
        }
    },

    checkIsEmptyField: function (input, validationErrors, errorDataPath, errorCode) {
        if (input == undefined || (input && input.length === 0)) {
            validationErrors.push({
                errorCode,
                errorDataPath
            });
        }
    },

    /**
     * @desc Checks is non resident
     * @param {object} body party body
     * @return {boolean} true if non resident
     */
    isNonResident: function (body) {

        const isNonResident = getValue(body, 'partyGeneralData.isNonResident');
        if (!isNonResident) { return false; }

        return isNonResident;

    },

    /**
     * @desc Checks is required CRS according to tax residence
     * @param {object} body party body
     * @return {boolean} true if required CRS according to tax residence
     */
    isCRSTaxResidenceExists: function (partyGeneralData) {

        const taxResidence = partyGeneralData.taxResidence;
        if (!taxResidence) { return false; }

        return taxResidence.countryCode !== countryUSA.countryCode && taxResidence.countryCode !== countryRussia.countryCode;

    },

    /**
     * @desc Checks is required FATCA according to tax residence
     * @param {object} body party body
     * @return {boolean} true if required FATCA according to tax residence
     */
    isFATCATaxResidenceExists: function (partyGeneralData) {

        const taxResidence = partyGeneralData.taxResidence;
        if (!taxResidence) { return false; }

        return taxResidence.countryCode == countryUSA.countryCode;

    },

    /**
     * @desc Helper for validate person birthday, birthday must be after then 1900 year and not to be in the future
     * @param {string} date for validate
     * @return {boolean} true if validation in date is error
     */
    checkPersonBirthday: function (date) {

        return dateHelper.isBefore(date, '1901-01-01') || dateHelper.isAfter(date);
    },

    checkIsFullAddresses: function (body, validationErrors) {
        const addressesArray = body.partyAddresses;

        let indexRegistration = addressesArray.findIndex(curElement => curElement.addressType.addressTypeCode == addressTypeLikeInUI.registration);
        const lastIndex = addressesArray.lastIndexOf(curElement => curElement.addressType.addressTypeCode == addressTypeLikeInUI.registration);

        // Если несколько адресов с признаком Регистрация
        if (lastIndex != indexRegistration) {
            const currentDate = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT);
            const oldDate = dateHelper.formatDate('1900-01-01');
            const futureDate = dateHelper.formatDate('2100-01-01');
            const actualIndex = [];

            // Проверка на актуальность
            addressesArray.forEach((curElement, index) => {
                const actualFrom = curElement.actualFrom || oldDate;
                const actualTo = curElement.actualTo || futureDate;

                const checkRegistrations = curElement.addressType.addressTypeCode == addressTypeLikeInUI.registration;
                const checkIsAfterOrEqual = dateHelper.isAfterOrEqual(currentDate, actualFrom);
                const checkIsBefore = dateHelper.isBefore(currentDate, actualTo);

                if (checkRegistrations && checkIsAfterOrEqual && checkIsBefore) { actualIndex.push(index); }
            });

            if (actualIndex.length == 1) {
                indexRegistration = actualIndex[0];
            } else {
                validationErrors.push({
                    errorCode: 'noActualRegistrationAddress',
                    errorDataPath: '/Body/partyAddresses'
                });
            }
        }

        // Проверка на отсутвие адреса регистрации
        if (indexRegistration == -1) {
            validationErrors.push({
                errorCode: 'noRegistrationAddress',
                errorDataPath: '/Body/partyAddresses'
            });
        } else {
            const registrationAddres = addressesArray[indexRegistration];
            const isManual = registrationAddres.isManualAddress;
            const isForeign = registrationAddres.isForeignAddress;
            const partyRole = getValue(body, 'partyRoleOfPerson.partyRole');

            // Если ручной ввод или иностранный, то сразу провал проверки адреса(тк не мапится)
            if (isManual || isForeign) {
                // Для юр. лица и роли агент не проверяем
                if (partyRole != '/agentLegalEntity') {
                    validationErrors.push({
                        errorCode: 'cantCheckCompletenessRegistrationAddress',
                        errorDataPath: `/Body/partyAddresses/${indexRegistration}`
                    });
                }
            } else {
                const isPostalCode = registrationAddres.postalCode;
                const isCityOrSettlement = registrationAddres.city || registrationAddres.settlement;
                const isStreet = registrationAddres.street;
                const isHouse = registrationAddres.house;
                // Проверка на заполненость полей, пропущены: страна всегда Россия(daData), расширение дома не всегда есть
                if (!isPostalCode || !isCityOrSettlement || !isStreet || !isHouse) {
                    validationErrors.push({
                        errorCode: 'noFullDataRegistrationAddress',
                        errorDataPath: `/Body/partyAddresses/${indexRegistration}`
                    });
                }
            }
        }
    },

    checkIsPassportRussianOrForeign: function (body, validationErrors) {
        const documentArray = body.partyDocuments;
        const country = body.partyGeneralData.isNonResident ? 'foreignCitPassport' : 'passport';

        let indexPassport = documentArray.findIndex(curElement => curElement.docType.docTypeCode == country);
        const lastIndex = documentArray.lastIndexOf(curElement => curElement.docType.docTypeCode == country);

        // Если несколько адресов с признаком Регистрация
        if (lastIndex != indexPassport) {
            const currentDate = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT);
            const oldDate = dateHelper.formatDate('1900-01-01');
            const futureDate = dateHelper.formatDate('2100-01-01');
            const actualIndex = [];

            // Проверка на актуальность
            documentArray.forEach((curElement, index) => {
                const actualFrom = curElement.issueDate || oldDate;
                const actualTo = curElement.expireDate || futureDate;

                const checkRegistrations = curElement.docType.docTypeCode == country;
                const checkIsAfterOrEqual = dateHelper.isAfterOrEqual(currentDate, actualFrom);
                const checkIsBefore = dateHelper.isBefore(currentDate, actualTo);

                if (checkRegistrations && checkIsAfterOrEqual && checkIsBefore) { actualIndex.push(index); }
            });

            if (actualIndex.length == 1) {
                indexPassport = actualIndex[0];
            } else {
                validationErrors.push({
                    errorCode: 'noActualPassport',
                    errorDataPath: '/Body/partyDocuments'
                });
            }
        }
        // Проверка на отсутвие адреса регистрации
        if (indexPassport == -1) {
            validationErrors.push({
                errorCode: 'noPassportForAgent',
                errorDataPath: '/Body/partyDocuments'
            });
        }
    },

    checkIsMobilePhones: function (body, validationErrors) {
        const phonesArray = body.partyPhones;

        const indexPhones = phonesArray.findIndex(curElement => {
            return curElement.phoneType.phoneTypeCode == 'mobile' && curElement.isNonActual != true;
        });

        if (indexPhones == -1) {
            validationErrors.push({
                errorCode: 'noPhonesForAgent',
                errorDataPath: '/Body/partyPhones'
            });
        }
    },

    checkIsEmails: function (body, validationErrors, errorDataPath) {
        const emailsArray = getValue(body, 'partyEmails', []);
        const noEmail = getValue(body, 'partyEmailsAdditionalInfo.noEmail', false);

        if (!noEmail && emailsArray.length == 0) {
            validationErrors.push({
                errorCode: 'isEmptyEmail',
                errorDataPath: errorDataPath,
            });
        }

    },

    checkIsSNILS: function (body, validationErrors, errorDataPath) {
        const isNoNResident = body.partyGeneralData.isNonResident;
        const isSNILS = body.partyPersonData.SNILS;

        if (!isNoNResident && !isSNILS) {
            validationErrors.push({
                errorCode: 'isEmptySNILS',
                errorDataPath: errorDataPath,
            });
        }
    },

    checkNoCitizenship: function (body, validationErrors, errorDataPath) {
        const isStatelessPerson = body.partyPersonData.isStatelessPerson;
        const citizenship = body.partyPersonData.citizenship;

        if (!isStatelessPerson && (!citizenship || citizenship.length == 0)) {
            validationErrors.push({
                errorCode: 'noCitizenship',
                errorDataPath: errorDataPath,
            });
        }
    },

    checkIsSoleProprietorSite: function (body, validationErrors, errorDataPath) {
        const hasWebsite = body.partyPersonData.site?.hasWebsite;
        const naturalPersonCategory = body.partyPersonData.naturalPersonCategory;

        if (naturalPersonCategory === "soleProprietor" && hasWebsite == undefined) {
            validationErrors.push({
                errorCode: 'isEmptySoleProprietorWebsite',
                errorDataPath: errorDataPath,
            });
        }
    },

    checkIsSoleProprietorLicenses: function (body, validationErrors, errorDataPath) {
        const hasLicenses = body.partyPersonData.partyLicensesAdditionalInfo?.hasLicenses;
        const naturalPersonCategory = body.partyPersonData.naturalPersonCategory;

        if (naturalPersonCategory === "soleProprietor" && hasLicenses == undefined) {
            validationErrors.push({
                errorCode: 'isEmptySoleProprietorLicenses',
                errorDataPath: errorDataPath,
            });
        }
    },


    isSkipForMigratedByAPI: function (body, self) {
        const originatingClientId = getValue(self, 'applicationContext.originatingClientId');
        const isMigrated = body.partyMigrationAttributes?.isMigrated ?? false;
        return isMigrated && !(originatingClientId == 'web-client-vnext' || !originatingClientId);
    },

    checkBeneficiaryOwnerQuestionnaire: function(body, validationErrors) {
        const answer1 = getValue(body, 'beneficiaryOwnerQuestionnaire.questionnaire1.answer');
        const answer2 = getValue(body, 'beneficiaryOwnerQuestionnaire.questionnaire2.answer');
        const answer3 = getValue(body, 'beneficiaryOwnerQuestionnaire.questionnaire3.answer');
        if (answer1 == undefined || answer2 == undefined || answer3 == undefined) {
            validationErrors.push({
                errorCode: 'isEmptyBeneficiaryOwnerQuestionnaire'
            });
        }
    }
};
