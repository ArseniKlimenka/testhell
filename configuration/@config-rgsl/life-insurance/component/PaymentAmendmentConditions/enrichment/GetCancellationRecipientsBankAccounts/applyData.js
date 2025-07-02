"use strict";

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0) {

        return;
    }

    const body = this.businessContext.rootData;

    if (!body.tempTechnicalData) {

        body.tempTechnicalData = {};
    }

    const recipientsBankAccounts = dataSource.data.map(item => {

        let name = getValue(item.resultData.body, 'partyOrganisationData.fullOrgName');

        if (!name) {

            const lastName = getValue(item.resultData.body, 'partyPersonData.lastName');
            const firstName = getValue(item.resultData.body, 'partyPersonData.firstName');
            const middleName = getValue(item.resultData.body, 'partyPersonData.middleName');

            name = `${lastName ?? ''} ${firstName ?? ''} ${middleName ?? ''}`;
        }

        return {
            partyCode: item.resultData.partyCode,
            fullName: name,
            bankAccounts: item.resultData.body.partyBankAccounts
        };
    });

    body.tempTechnicalData.recipientsBankAccounts = recipientsBankAccounts;
};
