"use strict";

module.exports = function mapping(input, dataSource) {

    if ((dataSource?.data?.length ?? 0) === 0) {

        return;
    }

    if (!input.tempTechnicalData) {

        input.tempTechnicalData = {};
    }

    const beneficariesBankAccounts = dataSource.data.map(item => {

        let name = item.resultData.body.partyOrganisationData?.fullOrgName;

        if (!name) {

            const lastName = item.resultData.body.partyPersonData?.lastName;
            const firstName = item.resultData.body.partyPersonData?.firstName;
            const middleName = item.resultData.body.partyPersonData?.middleName;

            name = `${lastName ?? ''} ${firstName ?? ''} ${middleName ?? ''}`;
        }

        return {
            partyCode: item.resultData.partyCode,
            fullName: name,
            bankAccounts: item.resultData.body.partyBankAccounts
        };
    });

    input.tempTechnicalData.beneficariesBankAccounts = beneficariesBankAccounts;
};
