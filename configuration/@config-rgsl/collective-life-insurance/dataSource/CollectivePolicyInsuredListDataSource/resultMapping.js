const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    const output = {};

    output.id = input.ID;
    output.contractNumber = input.CONTRACT_NUMBER;
    output.partyCode = input.PARTY_CODE;
    output.fullName = `${input.SURNAME} ${input.FIRST_NAME}${input.MIDDLE_NAME == undefined ? "" : ` ${input.MIDDLE_NAME}`}`;
    output.surName = input.SURNAME;
    output.firstName = input.FIRST_NAME;
    output.middleName = input.MIDDLE_NAME;
    output.birthDay = input.BIRTHDAY;
    output.gender = input.GENDER == 0 ? "женский" : "мужской";
    output.mobile = input.MOBILE;
    output.amount = input.AMOUNT;
    output.premium = input.PREMIUM;
    output.reinsurerCode = input.REINSURER_CODE;
    output.reinsurerName = input.REINSURER_NAME;
    output.reinsurerShare = input.REINSURER_SHARE;
    output.risks = JSON.parse(getValue(input, 'RISKS', '[]'));

    return output;
};
