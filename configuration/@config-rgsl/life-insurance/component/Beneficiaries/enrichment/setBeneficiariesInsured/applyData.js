'use strict';

module.exports = function applyData(input, dataSourceResponse) {


    if (dataSourceResponse?.data?.length === 0) {

        return;
    }

    const insuredData = dataSourceResponse.data[0].resultData;
    const body = input.context?.Body || this.businessContext?.rootData;

    if (insuredData.partyId) {

        if (!body.beneficiaries) {
            body.beneficiaries = {};
        }
        body.beneficiaries.beneficiaries = [];

        body.beneficiaries.beneficiaries.push({
            beneficiaryId: insuredData.partyId,
            partyFullName: insuredData.commonBody.fullName,
            dateOfBirth: insuredData.commonBody.dateOfBirth,
            personGender: insuredData.commonBody.attributes.personGender
        });
    }
};
