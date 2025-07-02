const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');


module.exports = function mapping(input) {

    const {
        policy,
        currency,
        experationDate
    } = printoutsHelper.getPollicyInfo(input, this);

    const body = input?.body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isPbIDG = productGroupArray.PB_SEVENTY_PLUS_IDG.includes(productCode);

    const issueDate = body?.basicConditions?.issueDate;
    const phDateOfBirth = body?.policyHolder?.partyData?.partyBody?.partyPersonData?.dateOfBirth;
    const holder70plus = dateHelper.getYearNumber(phDateOfBirth, issueDate) >= 71;

    const isPbIDG70plus = isPbIDG && holder70plus;

    return {
        policy,
        isPbIDG70plus
    };

};
