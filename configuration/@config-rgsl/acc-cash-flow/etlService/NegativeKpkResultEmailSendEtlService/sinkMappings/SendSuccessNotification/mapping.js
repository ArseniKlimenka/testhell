'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    const environmentName = this.environmentVariables['rgsl.sendEvent.policy_holder_check.environmentName'];
    const data = sinkExchange.additionalData;
    const personalData = JSON.parse(lineInput.request);
    const emailHead = `${environmentName}ТЕРР!!!_${data.contractNumber}_ ${personalData.data.Contractor.PhisicalSection.FullName}`;

    const emailBody = {

        contractNumber: data.contractNumber,
        insuranceType: sinkExchange.ifrsPortfolio,
        issueDate: sinkExchange.issueDate,
        fullName: personalData.data.Contractor.PhisicalSection.FullName,
        birthday: personalData.data.Contractor.PhisicalSection.Birthday,
        birthPlace: personalData.data.Contractor.PhisicalSection.BirthPlace,
        identityDocument: sinkExchange.identityDoc.docTypeDesc,
        identityDocumentGivedOut: sinkExchange.identityDoc.issuerName,
        identityDocumentDateOfIssue: sinkExchange.identityDoc.issueDate,
        identityDocumentGivedOutCode: sinkExchange.identityDoc.issuerCode,
        registrationAddress: sinkExchange.registrationAddress,
        allocationInfo: sinkExchange.allocationInfo,
        allContractAllocationsSum: sinkExchange.allContractAllocationsSum,
        transactionDate: sinkExchange.transactionDate,
        payerName: sinkExchange.payerName
    };

    const email = this.environmentVariables['rgsl.sendEvent.policy_holder_check.emails'];

    return {
        entityType: 'NaturalPerson',
        recordId: lineInput.sendEventId,
        dataContext: {
            content: {
                emailHead: emailHead,
                emailBody: emailBody
            }
        },
        recipients: {
            ContactInformation: [email]
        },
        attachments: sinkExchange.attachmentsToSend,
        throwOnError: false
    };
};
