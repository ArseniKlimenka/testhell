module.exports = function serviceProviderMapping({
    code,
    body,
    commonBody,
    configurationCodeName
}) {

    const serviceProvider = {};

    serviceProvider['ORG_IMPL.SERVICE_PROVIDER_HUB'] = [
        {
            SERVICE_PROVIDER_CODE: code
        }
    ];

    serviceProvider['ORG_IMPL.SERVICE_PROVIDER_INFO_SAT'] = [
        {
            SERVICE_PROVIDER_CODE: code,
            PARTY_CODE: commonBody.partyCode,
            ORGANISATION_UNIT_CODE: commonBody.attributes && commonBody.attributes.orgUnitCode,
            VISIBILITY_TYPE: commonBody.attributes && commonBody.attributes.visibilityType,
            CONFIGURATION_CODE_NAME: configurationCodeName,
            PARTNER_TYPE: body.partnerType ? body.partnerType : body.reinsurerType,
            TAB_NUMBER: body.tabNumber,
            PARTNER_CODE: body.partnerCode ? body.partnerCode : body.reinsurerCode,
            RECEIVE_TYPE: body.receiveType,
            IS_PERSONAL_MANAGER: body.isPersonalManager,
            ACTUAL_EMAIL: body.actualEmail,
        }
    ];

    if (configurationCodeName === 'Employee') {
        serviceProvider['ORG_IMPL.SP_SUB_AGENT_SAT'] = [
            {
                SERVICE_PROVIDER_CODE: code,
                SAD_NUMBER: body.sadNumber,
                PHYSICAL_PERSON_ID: body.physicalPersonID,
                SAD_BEGIN_DATE: body.sadBeginDate,
                SAD_END_DATE: body.sadEndDate,
                LNR_NUMBER: body.lnrNumber,
                POSITION_KFN: body.positionKFN,
                SAD_NUMBER_1: body.sadNumber1,
                SAD_NUMBER_2: body.sadNumber2,
                SAD_NUMBER_MAG: body.sadNumberMAG,
                SAD_NUMBER_NSO: body.sadNumberNSO,
                IS_SAS_AGENT: body.isSASAgent,
                LEVEL: body.level,
                SAD_FINAL: body.sadFinal,
                SKK: body.SKK,
                RECEIVE_TYPE: body.receiveType,
                ORDER_NUMBER: body.order,
                SAP_AD: body.sapAD,
                SALES_CHANNEL: body.salesChannel,
                BRANCH_ID: body.branch?.branchId,
                DEPARTMENT: body.department,
            }
        ];
    }

    return serviceProvider;
};
