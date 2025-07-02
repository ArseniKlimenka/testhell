const partyPhoneLib = require('@config-rgsl/party/component/PartyPhone/lib/partyPhoneLib');

module.exports = function mapping(input, sinkExchange) {

    const { party_code, party_body } = sinkExchange;

    if (!party_code || !party_body) { return; }

    const { data } = input;

    const partyPhoneObject =
    {
        countryCode: {
            countryCode: '643',
            alfa2: 'RU',
            countryShortName: 'РОССИЯ',
            countryPhoneCode: '+7'
        },
        phoneType: {
            phoneTypeCode: 'mobile',
            phoneTypeDesc: 'Мобильный'
        },
        fullNumber: data.phoneNumber.substring(1)
    };
    partyPhoneObject.fullNumberFormatted = partyPhoneLib.phoneFormatting(partyPhoneObject);

    const fullNameArray = data.physicalPersonFullName.split(' ');

    party_body.partyPersonData.lastName = fullNameArray && fullNameArray[0];
    party_body.partyPersonData.firstName = fullNameArray && fullNameArray[1];
    party_body.partyPersonData.middleName = fullNameArray && fullNameArray[2];

    if (data.email
        && party_body.partyEmails
        && !party_body.partyEmails.some(v => v.email == data.email))
    { party_body.partyEmails.push({ email: data.email }); }

    if (data.phoneNumber
        && party_body.partyPhones
        && !party_body.partyPhones.some(v => v.fullNumber == data.phoneNumber.substring(1)))
    { party_body.partyPhones.push(partyPhoneObject); }

    party_body.partyGeneralData.INNKIO = data.physicalPersonINN;
    party_body.partyPersonData.dateOfBirth = data.physicalPersonBirthDate;
    party_body.partyPersonData.personGender = data.physicalPersonGender;

    return {
        body: party_body,
        code: party_code
    };
};
