"use strict";

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0 || dataSource.data.length > 1) {

        return;
    }

    if (!input.mainAttributes.applicationInfo) {

        input.mainAttributes.applicationInfo = {};
    }

    if (!input.mainAttributes.insuredPersonInfo) {

        input.mainAttributes.insuredPersonInfo = {};
    }

    if (!input.mainAttributes.policyHolderInfo) {

        input.mainAttributes.policyHolderInfo = {};
    }

    const insuredPerson = dataSource.data[0].resultData.parties.insuredPerson;
    const policyHolder = dataSource.data[0].resultData.parties.holder;

    if (insuredPerson?.personCode) {

        input.mainAttributes.applicationInfo.applicant = {
            partyCode: insuredPerson.personCode,
            partyType: insuredPerson.partyType,
            fullName: insuredPerson.fullName
        };

        input.mainAttributes.insuredPersonInfo.insuredPerson = {
            partyCode: insuredPerson.personCode,
            partyType: insuredPerson.partyType,
            fullName: insuredPerson.fullName
        };
    }

    if (policyHolder?.personCode) {

        input.mainAttributes.policyHolderInfo.policyHolder = {
            partyCode: policyHolder.personCode,
            partyType: policyHolder.partyType,
            fullName: policyHolder.fullName
        };
    }
};
