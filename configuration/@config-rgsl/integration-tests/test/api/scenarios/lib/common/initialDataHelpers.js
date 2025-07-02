const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');

async function getDefaultAgentAgreement(externalNumber) {
    const client = new Client();
    const response = await callDataSource('GetAgentAgreementInfoDataSource', {
        paging: undefined,
        criteria: {
            externalNumber: externalNumber,
            documentState: 'Activated',
        },
    }, client);

    const data = response.data;
    if (data.length != 1) { throw new Error('Wrong count of data found! Count = ' + data.length); }

    return data[0].resultData;
}

async function getDefaultParty(fullName, bankAccountNumber) {
    const client = new Client();
    const response = await callDataSource('GetPartyInfoDataSource', {
        paging: undefined,
        criteria: {
            fullName: fullName,
            bankAccountNumber: bankAccountNumber
        },
    }, client);

    const data = response.data;
    if (data.length != 1) { throw new Error('Wrong count of data found! Count = ' + data.length); }

    return data[0].resultData;
}

async function getDefaultOrganisationUnit(fullName) {
    const client = new Client();
    const response = await callDataSource('GetOrganisationUnitInfoDataSource', {
        paging: undefined,
        criteria: {
            fullName: fullName,
        },
    }, client);

    return response.data;
}

async function getDefaultPartyAdmin() {
    return await getDefaultParty('Administrator Administrator Administrator');
}

async function getDefaultPartyPolicyHolder() {
    return await getDefaultParty('Иванов Иван Иванович', '40802810300011287487');
}

async function getDefaultPartyBFKO() {
    return await getDefaultParty('БФКО');
}

async function getDefaultServiceProvider(partyCode, serviceProviderType, businessCode) {
    const client = new Client();
    const response = await callDataSource('ServiceProviderDataSource', {
        paging: undefined,
        criteria: {
            partyCode: partyCode,
            serviceProviderType: serviceProviderType,
            businessCode: businessCode,
        },
    }, client);

    const data = response.data;
    if (data.length != 1) { throw new Error('Wrong count of data found! Count = ' + data.length); }

    return data[0].resultData;
}

async function getDefaultOrganisationUnitBFKO() {
    return await getDefaultOrganisationUnit('БФКО ГО');
}

async function getDefaultUser(employeeCode) {
    const client = new Client();
    const response = await callDataSource('UserDataSource', {
        paging: undefined,
        criteria: {
            employeeCode: employeeCode,
        },
    }, client);

    const data = response.data;
    if (data.length != 1) { throw new Error('User was not found!'); }

    return data[0].resultData;
}

module.exports = {
    getDefaultAgentAgreement,
    getDefaultParty,
    getDefaultPartyAdmin,
    getDefaultPartyPolicyHolder,
    getDefaultPartyBFKO,
    getDefaultServiceProvider,
    getDefaultOrganisationUnit,
    getDefaultOrganisationUnitBFKO,
    getDefaultUser,
};
