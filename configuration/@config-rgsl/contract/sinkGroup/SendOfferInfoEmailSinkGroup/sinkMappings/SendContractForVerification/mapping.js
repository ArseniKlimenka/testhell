'use strict';

const { businessRules } = require('@adinsure/runtime');

module.exports = function mapping(sinkResult, sinkExchange) {

    const attachmentsToSend = [];
    const contractAttachmentId = sinkExchange.resolveContext('contractAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');
    const email = sinkExchange.resolveContext('recipientEmail');
    let allowedEmails = this.environmentVariables['rgsl.ePolicyNotificationParams.allowedEmails'];
    const kidAttachmentId = sinkExchange.resolveContext('kidAttachmentId');
    const productCode = sinkExchange.resolveContext('productCode');
    const issueDate = sinkExchange.resolveContext('issueDate');
    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode, issueDate }).result;

    if (allowedEmails && allowedEmails.length > 1) {

        allowedEmails = allowedEmails.split(';').map(item => item.toLowerCase());
    }
    else {

        allowedEmails = undefined;
    }

    if ((allowedEmails && allowedEmails.length > 0 && !allowedEmails.includes(email.toLowerCase()))) {

        return;
    }

    if (contractAttachmentId) {

        attachmentsToSend.push({ attachment: { id: contractAttachmentId } });
    }
    else {

        throw "Contract attachment not found! Email will not be sent!";
    }


    if (kidAttachmentId) {

        attachmentsToSend.push({attachment: { id: kidAttachmentId }});
    }

    const thorwEmailExceptions = this.environmentVariables['rgsl.ePolicyNotificationParams.thorwEmailExceptions'] === 'true';

    return {
        entityType: 'Contract',
        recordId: contractId,
        recipients: {
            ContactInformation: [email]
        },
        attachments: attachmentsToSend,
        throwOnError: thorwEmailExceptions
    };
};
