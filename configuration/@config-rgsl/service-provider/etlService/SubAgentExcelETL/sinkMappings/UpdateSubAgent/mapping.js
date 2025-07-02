module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const { service_provider_code, service_provider_body } = sinkExchange;

    if (!service_provider_code || !service_provider_body) { return; }

    const { data } = input;
    const RGSLBranchesList = additionalDataSourcesResults.RGSBranchesDataSource.data;

    let branchObj = RGSLBranchesList.find(v => v.resultData.branchName == data.branch);
    if (branchObj) { branchObj = branchObj.resultData; }

    if (!data.sadNumber) { return; }

    service_provider_body.department = data.department;
    service_provider_body.SKK = data.SKK;
    service_provider_body.branch = branchObj;
    service_provider_body.positionKFN = data.positionKFN;

    switch (data.positionKFN) {
        case '113':
            service_provider_body.level = 'level4';
            break;
        case '101' || '986':
            service_provider_body.level = 'level3';
            break;
        case '105' || '987':
            service_provider_body.level = 'level2';
            break;
        default:
            service_provider_body.level = 'level1';
            break;
    }

    switch (data.positionKFN) {
        case '104':
            service_provider_body.salesChannel = '2';
            break;
        default:
            service_provider_body.salesChannel = '1';
            break;
    }

    service_provider_body.lnrNumber = data.lnrNumberAgentAgreement ? data.lnrNumberAgentAgreement : data.lnrNumberEmployeeAgreement;

    switch (data.receiveType) {
        case 42:
            service_provider_body.receiveType = 43;
            break;
        case 43:
            service_provider_body.receiveType = data.receiveType;
            break;
        case 44:
            service_provider_body.receiveType = data.receiveType;
            break;
        default:
            service_provider_body.receiveType = undefined;
            break;
    }

    service_provider_body.sadNumber = data.sadNumber;
    service_provider_body.sadNumberMAG = data.sadNumberMAG;
    service_provider_body.physicalPersonID = data.physicalPersonID;
    service_provider_body.sadBeginDate = data.sadBeginDate;
    service_provider_body.sadEndDate = data.sadEndDate;
    service_provider_body.isSASAgent = data.isSASAgent;
    service_provider_body.sapAD = data.sapAD;
    service_provider_body.employeeParty.partyData.partyFullName = data.physicalPersonFullName;
    service_provider_body.order = data.isSASAgent ? '6000461' : '6000260';

    return {
        body: service_provider_body,
        code: service_provider_code
    };
};
