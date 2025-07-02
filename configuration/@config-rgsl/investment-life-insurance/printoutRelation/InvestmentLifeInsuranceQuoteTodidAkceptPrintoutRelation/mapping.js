const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    const {
        policy,
        currency,
        experationDate
    } = printoutsHelper.getPollicyInfo(input, this);
    let insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);
    const insuredGenderMale = input.body.insuredPerson.partyData.partyBody.partyPersonData?.personGender == 'Male';
    insured = printoutsHelper.getPersonData(insured, input.body.insuredPerson.partyData);
    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder;
    const bank = printoutsHelper.getBankNumber(input.body.insuredPerson.partyData.partyBody.partyBankAccounts);
    const isNOTEV1BFKO = input.body.mainInsuranceConditions.insuranceProduct.productCode == 'NOTEV1BFKO';
    return {
        policy,
        currency,
        experationDate,
        insuredGenderMale,
        insured,
        isPolicyHolder,
        bank,
        isNOTEV1BFKO
    };
};
