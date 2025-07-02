'use strict';

const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');
const { addressType } = require('@config-rgsl/party/lib/partyConstantsImpl');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');
const { preparePartyBody } = require('@config-rgsl/credit-life-insurance/lib/creditImportHelper');

module.exports = function mapping(lineInput, sinkExchange) {

    // called from route, but we need to provide RU translations
    this.applicationContext.locale = "ru-RU";

    return {
        body: mergePartyBody(lineInput, sinkExchange, this),
        code: sinkExchange?.party?.code
    };
};

function mergePartyBody(lineInput, context, that) {

    context.partyExceptions = [];
    const currentBody = context?.party?.body;
    const newBody = preparePartyBody(lineInput, context, that);

    // Проверяем ИНН
    let isValidINN = false;
    const newINN = lineInput?.data?.inn;
    const currentINN = currentBody?.partyGeneralData?.INNKIO;
    if (newINN) {
        isValidINN = partyValidationHelper.innValidation(newINN, partyType.NaturalPerson);
        if (!isValidINN) {
            context.partyExceptions.push({ name: 'Проверка ИНН', msg: 'Некорректный ИНН' });
        }

        if (currentBody && currentINN != newINN) {
            context.partyExceptions.push({ name: 'Проверка ИНН', msg: 'У Контрагента, не совпадает ИНН' });
        }
    }

    // Проверяем СНИЛС
    let isValidSNILS = false;
    const newSNILS = lineInput?.data?.snils;
    const currentSNILS = currentBody?.partyPersonData?.SNILS;
    if (newSNILS) {
        isValidSNILS = partyValidationHelper.snilsValidation(newSNILS);
        if (!isValidSNILS) {
            context.partyExceptions.push({ name: 'Проверка СНИЛС', msg: 'Некорректный СНИЛС' });
        }

        if (currentBody && currentSNILS != newSNILS) {
            context.partyExceptions.push({ name: 'Проверка СНИЛС', msg: 'У Контрагента, не совпадает СНИЛС' });
        }
    }

    if (!currentBody) { return newBody; }

    // Добавляем ИНН
    if (isValidINN) {
        currentBody.partyGeneralData.INNKIO = newINN;
    }

    // Добавляем СНИЛС
    if (isValidSNILS) {
        currentBody.partyPersonData.SNILS = newSNILS;
    }

    // Добавляем новый адрес электронной почты
    newBody.partyEmails.forEach(x => {
        if (!currentBody.partyEmails.find(a => a.email == x.email)) {
            currentBody.partyEmails.push(x);
        }
    });

    // Добавляем новый номер мобильного телефона
    newBody.partyPhones.forEach(x => {
        if (!currentBody.partyPhones.find(a => a.fullNumber == x.fullNumber && a.phoneType.phoneTypeCode == x.phoneType.phoneTypeCode)) {
            currentBody.partyPhones.push(x);
        }
    });

    // Добавляем гражданство Россия, если его нет
    newBody.partyPersonData?.citizenship.forEach(x => {
        if (!currentBody.partyPersonData?.citizenship.find(a => a.countryShortName == x.countryShortName)) {
            currentBody.partyPersonData?.citizenship.push(x);
        }
    });

    // Добавляем адрес регистрации
    const newAddressR = newBody.partyAddresses.find(x => x.addressType.addressTypeCode == addressType.registration.code);
    const addressesR = currentBody.partyAddresses.filter(x => x.addressType.addressTypeCode == addressType.registration.code);
    const existingAddressR = addressesR.find(x => x.fullAddress.value == newAddressR.fullAddress.value);
    if (!existingAddressR) {
        addressesR.forEach(x => {
            if (x.actualTo) {
                x.actualTo = dateUtils.addDays(x.actualTo, -1);
            }
            else {
                x.actualTo = dateUtils.addDays(lineInput.data.startDate, -1);
            }

            if (x.actualFrom) {
                x.actualFrom = dateUtils.addDays(x.actualFrom, -1);
            }
        });

        newAddressR.actualFrom = lineInput.data.startDate;
        currentBody.partyAddresses.push(newAddressR);
    }

    // Добавляем фактический адрес
    const newAddressF = newBody.partyAddresses.find(x => x.addressType.addressTypeCode == addressType.fact.code);
    const addressesF = currentBody.partyAddresses.filter(x => x.addressType.addressTypeCode == addressType.fact.code);
    const existingAddressF = addressesF.find(x => x.fullAddress.value == newAddressF.fullAddress.value);
    if (!existingAddressF) {
        addressesF.forEach(x => {
            if (x.actualTo) {
                x.actualTo = dateUtils.addDays(x.actualTo, -1);
            }
            else {
                x.actualTo = dateUtils.addDays(lineInput.data.startDate, -1);
            }

            if (x.actualFrom) {
                x.actualFrom = dateUtils.addDays(x.actualFrom, -1);
            }
        });

        newAddressF.actualFrom = lineInput.data.startDate;
        currentBody.partyAddresses.push(newAddressF);
    }

    return currentBody;
}
