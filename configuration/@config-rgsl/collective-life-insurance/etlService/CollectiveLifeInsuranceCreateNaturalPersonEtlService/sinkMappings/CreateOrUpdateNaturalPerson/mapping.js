const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const partyPhoneLib = require('@config-rgsl/party/component/PartyPhone/lib/partyPhoneLib');

module.exports = function mapping(lineInput, sinkExchange) {

    this.applicationContext.locale = "ru-RU";

    return {
        body: mergePartyBody(lineInput, sinkExchange),
        code: sinkExchange.partyCode
    };
};

function mergePartyBody(lineInput, context) {

    const body = context.partyBody != undefined ? context.partyBody : getNewPartyBody(lineInput);

    // Добавляем новый номер мобильного телефона
    if (lineInput.mobile) {
        const mobilePhone = getMobilePhone(lineInput.mobile);
        const existingMobilePhone = body.partyPhones.find(x => x.fullNumber == mobilePhone.fullNumber && x.phoneType.phoneTypeCode == mobilePhone.phoneType.phoneTypeCode);
        if (!existingMobilePhone) {
            body.partyPhones.push(mobilePhone);
        }
    }

    return body;
}

function getMobilePhone(mobilePhoneNumber) {

    let clearMobilePhoneNumber = mobilePhoneNumber.replace(/\D/g, '');
    if (clearMobilePhoneNumber.length > 10) {
        clearMobilePhoneNumber = clearMobilePhoneNumber.slice(1, clearMobilePhoneNumber.length);
    }

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
        fullNumber: clearMobilePhoneNumber
    };

    phone.fullNumberFormatted = partyPhoneLib.phoneFormatting(phone);

    return phone;
}

function getPersonGender(personGender) {

    let result;

    if (personGender == 'мужской') {
        result = partyConstants.gender.Male;
    } else if (personGender == 'женский') {
        result = partyConstants.gender.Female;
    } else {
        throw new Error('No person Gender');
    }

    return result;
}

function getNewPartyBody(lineInput) {

    const body = JSON.parse(JSON.stringify(partyConstants.naturalPersonDefaultValue));
    body.partyPersonData.lastName = lineInput.surName;
    body.partyPersonData.firstName = lineInput.firstName;
    body.partyPersonData.middleName = lineInput.middleName;
    body.partyPersonData.personGender = getPersonGender(lineInput.gender);
    body.partyPersonData.dateOfBirth = lineInput.birthDay;

    // body.partyGeneralData.documentsValidationDate = "2023-06-13";
    // body.partyGeneralData.lastUpdateDate =  "2023-06-13";

    return body;
}
