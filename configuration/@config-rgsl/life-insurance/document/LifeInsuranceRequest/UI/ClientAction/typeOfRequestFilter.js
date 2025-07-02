'use strict';

const { typeOfRequest, documentActors, documentRoles } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const { isCurrentUserHasRole } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

module.exports = function typeOfRequestFilter(input, ambientProperties) {

    let typeOfRequestItems = input.items;
    const technicalInformation = input?.context?.Body?.technicalInformation;
    const duplicateCancelledRequestsNumbers = technicalInformation?.duplicateCancelledRequestsNumbers;
    const blockedAgentCancellation = technicalInformation?.blockedAgentCancellation;
    const newCancellationRequestAvailable = technicalInformation?.newCancellationRequestAvailable;

    const isGeneralBackOffice = input.rootContext.WorkUnitActor.CurrentActor == documentActors.GeneralBackOffice;
    const isOperations = input.rootContext.WorkUnitActor.CurrentActor == documentActors.Operations;
    const isSalesVtbMassGroup = isCurrentUserHasRole(ambientProperties, documentRoles.SalesVTBMassGroup);
    const isInvestmentParametersEditor = isCurrentUserHasRole(ambientProperties, documentRoles.InvestmentParametersEditor);

    if (!isGeneralBackOffice && !isOperations && !isSalesVtbMassGroup && !isInvestmentParametersEditor) {
        typeOfRequestItems = typeOfRequestItems.filter(item => item != typeOfRequest.Modification);
    }

    if ((duplicateCancelledRequestsNumbers && !newCancellationRequestAvailable) || blockedAgentCancellation) {
        typeOfRequestItems = typeOfRequestItems.filter(item => item != typeOfRequest.Cancellation);
    }

    return typeOfRequestItems;

};
