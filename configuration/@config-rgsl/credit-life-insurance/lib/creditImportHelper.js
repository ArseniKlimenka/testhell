'use strict';

const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const creditRisks = require('@config-rgsl/life-insurance/lib/creditRisks');
const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');
const partyPhoneLib = require('@config-rgsl/party/component/PartyPhone/lib/partyPhoneLib');
const partyEmailLib = require('@config-rgsl/party/component/PartyEmail/lib/partyEmailLib');
const partyValidationByRoleConstant = require('@config-rgsl/party/lib/partyValidationByRoleConstant');
const creditImportConstants = require('@config-rgsl/credit-life-insurance/lib/creditImportConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { productConfigurationFilter } = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');

module.exports = {

    /**
     * @param {string} policySeries policySeries from bordero
     * @param {string} issueDate policy issue date from bordero
     * @param {string} creditProgramId policy credit program from bordero
     * @returns {object} insuranceProduct object as in mainInsuranceConditions component dataSchema
     */
    getProductBySeries: function (policySeries, issueDate, creditProgramId, additionalDataSourcesResults) {

        let insuranceProduct = {};

        if (['88000', '88100'].includes(policySeries)) {
            insuranceProduct = creditImportConstants.insuranceProductCCP;
        }

        if (['88200', '88300'].includes(policySeries)) {
            insuranceProduct = creditImportConstants.insuranceProductCMS;
        }

        if (['88400', '88500'].includes(policySeries)) {
            insuranceProduct = creditImportConstants.insuranceProductCDMS;
        }

        if (['92200', '92300'].includes(policySeries)) {
            insuranceProduct = creditImportConstants.insuranceProductCCP2;
        }

        if (['92400', '92500'].includes(policySeries)) {
            insuranceProduct = creditImportConstants.insuranceProductCMP;
        }

        if (['42300', '42400'].includes(policySeries)) {
            insuranceProduct = creditImportConstants.insuranceProductCMC;
        }

        if (['96300', '96400'].includes(policySeries)) {

            const productConfigurations = additionalDataSourcesResults?.GetProductConfigurationDataSource?.data?.map(i => i.resultData);

            const CMP3 = productConfigurationFilter(productConfigurations, false, creditImportConstants.insuranceProductCMP3.productCode, issueDate);
            const CMP4 = productConfigurationFilter(productConfigurations, false, creditImportConstants.insuranceProductCMP4.productCode, issueDate);
            const CMP5 = productConfigurationFilter(productConfigurations, false, creditImportConstants.insuranceProductCMP5.productCode, issueDate);

            if (CMP3.creditPrograms.includes(creditProgramId)) {
                insuranceProduct = creditImportConstants.insuranceProductCMP3;
            }
            else if (CMP4.creditPrograms.includes(creditProgramId)) {
                insuranceProduct = creditImportConstants.insuranceProductCMP4;
            }
            else if (CMP5.creditPrograms.includes(creditProgramId)) {
                insuranceProduct = creditImportConstants.insuranceProductCMP5;
            }
            else {
                throw new Error('ID страховой программы не соответствует продукту!');
            }
        }

        if (['97900', '98000'].includes(policySeries)) {
            insuranceProduct = creditImportConstants.insuranceProductCMP4;
        }

        if (['96500', '96600'].includes(policySeries)) {
            insuranceProduct = creditImportConstants.insuranceProductCCP3;
        }

        if (['74600', '74700'].includes(policySeries)) {
            insuranceProduct = creditImportConstants.insuranceProductCMP5;
        }

        if (['99300', '99400'].includes(policySeries)) {
            insuranceProduct = creditImportConstants.insuranceProductCMS2;
        }

        if (['98900', '99000'].includes(policySeries)) {
            insuranceProduct = creditImportConstants.insuranceProductCCP4;
        }

        return insuranceProduct;

    },

    /**
     * @param {string} policySeries policySeries from bordero
     * @returns {object} issueForm object as in issueForm component dataSchema
     */
    getIssueFormBySeries: function (policySeries) {

        let issueForm = {};

        if (['42300', '88000', '88200', '88400', '92200', '92400', '96300', '97900', '96500', '74600', '99300', '98900'].includes(policySeries)) {
            issueForm = { code: creditImportConstants.issueFormPaper };
        }

        if (['42400', '88100', '88300', '88500', '92300', '92500', '96400', '98000', '96600', '74700', '99400', '99000'].includes(policySeries)) {
            issueForm = { code: creditImportConstants.issueFormOffer };
        }

        return issueForm;

    },

    parseDate: function (sDate) {
        try {
            return DateTimeUtils.formatDate(sDate.substring(0, 10).split('.').reverse().join('-'));
        }
        catch (err) {
            return sDate;
        }
    },

    genderCheck: function (genderInput, middleName) {

        // check by middle name
        if (middleName) {
            if (middleName.slice(-2) == 'ич' || middleName.slice(-4) == 'оглы')
            { return 'М'; }
            if (middleName.slice(-1) == 'а' || middleName.slice(-4) == 'кызы' || middleName.slice(-4) == 'гызы')
            { return 'Ж'; }
        }

        // check input
        const genderArray = genderInput && genderInput.toLowerCase().split('') || [];
        if (genderArray.includes('m') || genderArray.includes('м')) {
            return 'М';
        }
        else if (genderArray.includes('ж')) {
            return 'Ж';
        }

        throw 'Не указан "Пол"';

    },

    creditSumCheck: function (creditSum) {
        const creditSumNumber = Number(creditSum);
        if (creditSumNumber > creditImportConstants.sumMax) { throw 'Сумма кредита превышает предельно допустимое значение'; }
        return creditSumNumber;
    },

    creditRateCheck: function (creditRate) {
        const creditRateNumber = Number(creditRate);
        if (creditRateNumber > creditImportConstants.rateMax) { throw 'Ставка по кредиту преввышает предельно допустимо значение'; }
        return creditRateNumber;
    },

    annuityPaymentCheck: function (annuityPayment, creditSum) {
        const annuityPaymentNumber = Number(annuityPayment);
        const creditSumNumber = Number(creditSum);
        if (annuityPaymentNumber > creditSumNumber) { throw 'Размер аннуитетного платежа преввышает сумму кредита'; }
        return annuityPaymentNumber;
    },

    creditEndDateCheck: function (creditEndDate, endDate) {
        if (DateTimeUtils.isAfter(creditEndDate, endDate)) { throw `Срок окончания кредита не может превышать срок окончания страхования`; }
        return creditEndDate;
    },

    recalcCreditEndDate: function (creditEndDate, endDate, policySeries, issueDate, creditProgramId) {
        const insuranceProduct = this.getProductBySeries(policySeries, issueDate, creditProgramId);
        const productCode = insuranceProduct.productCode;

        const isCreditGroup = ['CMP', 'CMP3', 'CMP4', 'CMP5'].includes(productCode);

        if (isCreditGroup)
        {
            if (dateUtils.getDayDifference(creditEndDate, endDate) <= 7)
            { return creditEndDate; }
            throw `Срок окончания страхования не может быть больше срока кредита, либо минус 7 дней`;
        }
        else
        { return creditEndDate; }
    },

    endDateCheck: function (policySeries, issueDate, startDate, endDate, dateOfBirth, creditProgramId, additionalDataSourcesResults) {

        const productConfigurations = additionalDataSourcesResults?.GetProductConfigurationDataSource?.data?.map(i => i.resultData);

        const insuranceProduct = this.getProductBySeries(policySeries, issueDate, creditProgramId);
        const productCode = insuranceProduct.productCode;
        const productConf = productConfigurationFilter(productConfigurations, false, productCode, issueDate);

        const isCreditGroup1 = ['CMS', 'CMP3', 'CMP4', 'CCP3'].includes(productCode);
        const isCreditGroup2 = ['CMS2', 'CCP4', 'CMP5'].includes(productCode);

        let yearsCount = undefined;
        let daysCount = undefined;

        if (isCreditGroup1) {
            yearsCount = creditImportConstants.maxInsuranceTerm.sevenYears;
            daysCount = creditImportConstants.maxInsuranceTerm.oneHundredFiftyDays;
        }

        if (isCreditGroup2) {
            yearsCount = creditImportConstants.maxInsuranceTerm.sevenYears;
            daysCount = creditImportConstants.maxInsuranceTerm.oneHundredEightyTwoDays;
        }

        if (endDate && yearsCount && daysCount) {
            if (startDate) {
                const period = DateTimeUtils.getPeriodData(startDate, endDate);

                if (period.year > yearsCount || (period.year == yearsCount && period.day > daysCount)) {
                    throw `Срок страхования договора превышает ${yearsCount} лет`;
                }
            }

            const insuredAgeOnEndDateMax = productConf.insuredAgeOnEndDateMax[1];
            if (dateOfBirth && DateTimeUtils.isPeriodYearMoreThanConstYear(dateOfBirth, endDate, insuredAgeOnEndDateMax)) {
                throw `Возраст застрахованного на дату окончания договора превышает ${insuredAgeOnEndDateMax} лет`;
            }
        }

        return endDate;
    },

    dateOfBirthCheck: function (dob, creditDate) {
        const dobModified = DateTimeUtils.formatDate(dob, DateTimeUtils.DateFormats.ECMASCRIPT);
        /*
        const creditDateModified = DateTimeUtils.formatDate(creditDate, DateTimeUtils.DateFormats.ECMASCRIPT);
        const different = DateTimeUtils.getYearNumber(dobModified, creditDateModified);
        if (different < 18) {
            throw 'На дату начала действия договора застрахованный не достиг 18-и летнего возраста';
        } else if (different > 70) {
            throw 'На дату начала действия договора застрахованный старше 70-и летнего возраста';
        }
        */
        return dobModified;
    },

    mobilePhoneNumberCheck: function (mobilePhoneNumber) {
        if (mobilePhoneNumber && mobilePhoneNumber.replace(/\D/g, '').length != 10) {
            throw 'Некорректный телефон';
        }
        return mobilePhoneNumber;
    },

    creditProgramCheck: function (creditProgram) {
        if (!creditProgram) {
            throw `Не указана кредитная программа`;
        }

        if (!creditImportConstants.creditPrograms.includes(creditProgram)) {
            throw `Загружаемая кредитная программа ${creditProgram} отсутствует в списке кредитных программ`;
        }

        if (!/^[п]\d{8}$/.test(creditProgram)) {
            throw `Загружаемая кредитная программа ${creditProgram} некорректна`;
        }

        return creditProgram;
    },

    tariffCheck: function (input, additionalDataSourcesResults) {

        if (!input.startDate || !input.endDate) { return; }

        let months = dateUtils.getMonthDifference(input.startDate, input.endDate);
        const endDate = dateUtils.addMonths(input.startDate, months);
        if (endDate < input.endDate) { months++; }

        const riskPremiumLife = getValue(input, 'riskPremiumLife', 0);
        const creditSumNet = getValue(input, 'creditSum', 0);
        if (months == 0 || creditSumNet == 0) { return; }

        const calcTariff = round(riskPremiumLife / (creditSumNet * months), 5);

        const product = this.getProductBySeries(input.policySeries, input.issueDate, input.creditProgramId, additionalDataSourcesResults);
        const productCode = product.productCode;
        const creditProgramId = getValue(input, 'creditProgramId');
        const issueDate = getValue(input, 'issueDate');
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate });
        let summaryTariff = 0;
        Object
            .keys(creditRisksConfig)
            .filter(item => item.indexOf('COEFF') == -1)
            .forEach(item => {
                const itemTariff = getValue(creditRisksConfig, item, 0);
                summaryTariff += itemTariff;
            });
        summaryTariff = round(summaryTariff, 5);

        if (summaryTariff != calcTariff) {
            throw `Тарификация не соответствует ID указанной программы`;
        }
    },

    JL42204Check: function (mapped, additionalDataSourcesResults) {

        const product = this.getProductBySeries(mapped.policySeries, mapped.issueDate, mapped.creditProgramId, additionalDataSourcesResults);
        const productCode = product.productCode;
        const creditSum = getValue(mapped, 'creditSum', 0);
        const creditProgramId = getValue(mapped, 'creditProgramId');
        const issueDate = getValue(mapped, 'issueDate');
        const creditRisksConfig = creditRisks({ productCode, creditSum, creditProgramId, issueDate }) || {};

        if (productCode != 'CMP4') { return; }
        if (!creditRisksConfig.JL42204) { return; }
        if (!mapped.startDate || !mapped.dateOfBirth) { return; }

        const insuredAgeOnStartDate = dateUtils.getYearDifference(mapped.dateOfBirth, mapped.startDate);
        if (insuredAgeOnStartDate > 51) {
            throw `Программы страхования с риском «Дожитие Застрахованного до недобровольной потери работы» могут быть оформлены, если возраст Застрахованного на дату оформления не превышает 51 года!`;
        }

        if (dateUtils.isPeriodYearMoreThanConstYear(mapped.startDate, mapped.endDate, creditImportConstants.maxInsuranceTerm.sevenYears)) {
            throw `Реализация программ с риском «Безраб недобр» невозможна, если срок кредита (срок договора) более 7 лет!`;
        }

    },

    CreditAndPolicyTermsCorrelationCheck: function (mapped, additionalDataSourcesResults) {

        if (!dateUtils.isAfter(mapped.creditDate, lifeInsuranceConstants.policyCreditOpenDate))
        { return; }

        const product = this.getProductBySeries(mapped.policySeries, mapped.issueDate, mapped.creditProgramId, additionalDataSourcesResults);
        const productCode = product?.productCode;

        if (!lifeInsuranceConstants.productGroupArray.CREDIT_POLICY.includes(productCode))
        { return; }

        const creditTerm = dateUtils.getPeriodData(mapped.creditDate, mapped.creditEndDate);
        const policyTerm = dateUtils.getPeriodData(mapped.startDate, mapped.endDate);

        const creditMonthsTerm = creditTerm.year * 12 + creditTerm.month;
        const policyMonthsTerm = policyTerm.year * 12 + policyTerm.month;

        const isValidTerms = lifeInsuranceConstants.policyCreditTerms
            .get(policyMonthsTerm)
            ?.includes(creditMonthsTerm);

        if (!isValidTerms)
        { throw `Срок кредита не соответсвует сроку действия полиса страхования`; }

    },

    preparePartyBody: function (lineInput, context, self) {

        // called from route, but we need to provire RU translations
        self.applicationContext.locale = "ru-RU";
        const naturalPersonDefaultValue = JSON.parse(JSON.stringify(partyConstants.naturalPersonDefaultValue));
        const countryRussia = JSON.parse(JSON.stringify(partyConstants.countryRussia));

        // calc dynamic values
        const lineData = lineInput.data;
        const INNKIO = getINNKIO(lineData);
        const personGender = getPersonGender(lineData.personGender);
        const SNILS = getSNILS(lineData);
        const addressR = getAddress(lineData, partyConstants.addressType.registration.code);
        const addressF = getAddress(lineData, partyConstants.addressType.fact.code);
        const passport = getPassport(lineData);
        const phone = getPhone(lineData);
        const email = getEmail(lineData);

        // fill context, to use in issue form on policy
        context.email = email.email;

        // fill body
        const body = naturalPersonDefaultValue;
        body.partyGeneralData.INNKIO = INNKIO;
        body.partyPersonData.lastName = lineData.lastName;
        body.partyPersonData.firstName = lineData.firstName;
        body.partyPersonData.middleName = lineData.middleName;
        body.partyPersonData.personGender = personGender;
        body.partyPersonData.dateOfBirth = lineData.dateOfBirth;
        body.partyPersonData.birthPlace = lineData.birthPlace;
        body.partyPersonData.SNILS = SNILS;
        body.partyPersonData.citizenship = [];
        body.partyPersonData.citizenship.push(countryRussia);
        body.partyPersonData.countryPlace = countryRussia;
        body.partyGeneralData.documentsValidationDate = lineData.issueDate;
        body.partyAddresses.push(addressR);
        body.partyAddresses.push(addressF);
        body.partyDocuments.push(passport);
        if (phone) { body.partyPhones.push(phone); }
        if (email) { body.partyEmails.push(email); }
        body.partyRoleOfPerson.partyRole = partyValidationByRoleConstant.PolicyHolderNaturalPerson.code;

        return body;
    },

    CMCConditionsCheck: function(mapped, additionalDataSourcesResults) {

        const product = this.getProductBySeries(mapped.policySeries, mapped.issueDate, mapped.creditProgramId, additionalDataSourcesResults);
        const productCode = product?.productCode;

        if (lifeInsuranceConstants.product.CMC != productCode)
        { return; }

        validateCMCAge(mapped.dateOfBirth);
        validateCMCTermOfTheContract(mapped.startDate, mapped.endDate);
    }
};

function validateCMCAge(dateOfBirth) {

    const age = dateUtils.getPeriodData(dateOfBirth)?.year;

    if (!(lifeInsuranceConstants.CMCValidationConstants.age.min <= age
        && lifeInsuranceConstants.CMCValidationConstants.age.max >= age)) {

        throw `Возраст не входит в интервал от 18 до 70 лет`;
    }
}

function validateCMCTermOfTheContract(startDate, endDate) {

    if (!dateUtils.isPeriodYearMoreOnConstYear(startDate, endDate, 1))
    { throw `Срок договора отличен от 1 года`; }
}

function getINNKIO(lineData) {
    let result;
    if (lineData.inn && partyValidationHelper.innValidationNauralPersonaAndSoleProprietor(lineData.inn)) {
        result = lineData.inn;
    }
    return result;
}

function getPersonGender(personGender) {
    let result;

    if (personGender == 'М') {
        result = partyConstants.gender.Male;
    } else if (personGender == 'Ж') {
        result = partyConstants.gender.Female;
    } else {
        throw new Error('No person Gender');
    }

    return result;
}

function getSNILS(lineData) {
    let result;
    if (lineData.snils && partyValidationHelper.snilsValidation(lineData.snils)) {
        result = lineData.snils;
    }
    return result;
}

function getAddress(lineData, addressTypeCode) {

    const addressTypeDesc = Object.values(partyConstants.addressType).find(item => item.code == addressTypeCode).description;
    const prefix = addressTypeCode.toLowerCase();
    let country = getValue(lineData, prefix + 'Country');
    const city = getValue(lineData, prefix + 'City');
    let street = getValue(lineData, prefix + 'Street');
    const house = getValue(lineData, prefix + 'House');
    const flat = getValue(lineData, prefix + 'Flat');
    const postalCode = getValue(lineData, prefix + 'PostCode');

    let fullAddressValue;
    if (!city && !street && !house && !flat && !postalCode) {
        fullAddressValue = country;
        street = country;
        country = undefined;
    }
    else {
        const fullAfddressArray = [country, city, street, house, flat, postalCode];
        fullAddressValue = fullAfddressArray.filter(item => item).join(', ');
    }

    return {
        addressType: {
            addressTypeCode: addressTypeCode,
            addressTypeDesc: addressTypeDesc
        },
        isSameAsRegistration: false,
        isManualAddress: true,
        fullAddress: {
            value: fullAddressValue
        },
        postalCode: postalCode,
        country: country,
        city: city,
        street: street,
        house: house,
        flat: flat
    };

}

function getPassport(lineData) {
    return {
        docType: {
            docTypeCode: "passport",
            docTypeDesc: "Паспорт гражданина Российской Федерации",
            docTypeClass: "identity",
            allowToSalers: true
        },
        docSeries: lineData.docSeries,
        docNumber: lineData.docNumber,
        issueDate: lineData.docIssueDate,
        issuerName: lineData.issuerName,
        issuerCode: lineData.issuerCode
    };
}

function getPhone(lineData) {
    const fakePhoneNumber = '0000000000';

    const mobilePhoneNumber = lineData.mobilePhoneNumber ? lineData.mobilePhoneNumber : fakePhoneNumber;
    const isNonActual = !lineData.mobilePhoneNumber;

    const phone = {
        countryCode: {
            countryCode: "643",
            alfa2: "RU",
            countryShortName: "РОССИЯ",
            countryPhoneCode: "+7"
        },
        phoneType: {
            phoneTypeCode: "mobile",
            phoneTypeDesc: "Мобильный"
        },
        fullNumber: mobilePhoneNumber,
        isNonActual: isNonActual
    };

    const phoneValidation = partyPhoneLib.phoneValidation(phone, {});
    if (phoneValidation.length > 0) {
        phone.fullNumber = fakePhoneNumber;
        phone.isNonActual = true;
    }
    phone.fullNumberFormatted = partyPhoneLib.phoneFormatting(phone);

    return phone;
}

function getEmail(lineData) {
    let email = {
        email: 'noemail@noemail.ru'
    };
    if (lineData.email) {
        const tempEmail = {
            email: lineData.email
        };
        const tempEmailValidation = partyEmailLib.emailValidation(tempEmail, {});
        if (tempEmailValidation.length == 0) {
            email = tempEmail;
        }
    }
    return email;
}

