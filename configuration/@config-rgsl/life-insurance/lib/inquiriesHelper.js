'use strict';

function mapRequest(input, ambientProperties) {

    const request = {
        method: 'post',
        url: 'api/core/public/universal-documents/CancellationInquiry/1/',
        data: {
            data: {
                configurationCodeName: input.rootContext.ConfigurationCodeName,
                department: input.context.ClientViewModel.inquiriesData.department,
                inquiryReasons: input.context.ClientViewModel.inquiriesData.inquiryReasons,
                textOfInquiry: input.context.ClientViewModel.inquiriesData.textOfInquiry,
                cancellationNumber: input.rootContext.Number,
                cancellationId: input.rootContext.Id,
                creatorUserName: ambientProperties.applicationContext.currentUser().getUserName(),
                contractNumber: input.rootContext.Number ?? input.rootContext.OriginalDocumentNumber,
                contractConfigurationCodeName: input.rootContext.OriginalConfigurationCodeName,
                insuredPerson: input.context.Body.insuredPerson.partyData.partyFullName,
                holder: input.context.Body.policyHolder.partyData.partyFullName,
                uwTriggers: input.context.Body.uwTriggers,
                basicConditions: input.context.Body.basicConditions,
                mainInsuranceConditions: input.context.Body.mainInsuranceConditions
            }
        },
        callContext: {
            workUnitActorCode: 'InquiryManager'
        },
        returnFullResponse: true
    };

    return request;
}

const inquiriesTypes = {
    EndowmentInquiry: 'EndowmentInquiry',
    Endowment: 'Endowment'
};

module.exports = {
    mapRequest,
    inquiriesTypes
};
