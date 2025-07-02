const { naturalPersonDefaultValue } = require('@config-rgsl/party/lib/partyConstantsImpl'); // возможно нужно перенести значение во внуть компонента
const { countryCodeRus, phoneTypeMobile } = require('@config-rgsl/employee/lib/userExcelETLconst');

module.exports = function mapping(lineInput) {

    const fullName = lineInput.data.fullName.split(' ');
    const lastName = fullName[0];
    const firstName = fullName[1];
    const middleName = fullName[2] ? fullName[2] : '';

    const email = lineInput.data.email;

    const phone = lineInput.data.mobTel;

    const body = naturalPersonDefaultValue;

    body.partyPersonData.firstName = firstName;
    body.partyPersonData.lastName = lastName;
    body.partyPersonData.middleName = middleName;

    body.partyPhones = [
        {
            countryCode: countryCodeRus,
            phoneType: phoneTypeMobile,
            fullNumber: `${phone}`,
            fullNumberFormatted: `+7 (${phone.substring(0, 3)}) ${phone.substring(3, 6)} ${phone.substring(6, 8)} ${phone.substring(8)}`
        }
    ];

    body.partyEmails = [
        {
            email: email
        }
    ];

    return {
        body
    };
};
