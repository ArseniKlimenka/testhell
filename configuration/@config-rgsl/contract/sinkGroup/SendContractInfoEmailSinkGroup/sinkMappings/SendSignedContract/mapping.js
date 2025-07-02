'use strict';

const { businessRules } = require('@adinsure/runtime');
const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { cleanTextSMS } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function mapping(sinkResult, sinkExchange) {

    const attachmentsToSend = [];
    const contractAttachmentId = sinkExchange.resolveContext('signedContractAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');
    const shouldSignAttachment = sinkExchange.resolveContext('shouldSignAttachment');
    const email = sinkExchange.resolveContext('recipientEmail');
    let allowedEmails = this.environmentVariables['rgsl.ePolicyNotificationParams.allowedEmails'];
    const memoCBAttachmentId = sinkExchange.resolveContext('signedMemoCBAttachmentId');
    const kidAttachmentId = sinkExchange.resolveContext('kidAttachmentId');
    const otherDocumentsAttachmentId = sinkExchange.resolveContext('otherDocumentsAttachmentId');
    const InvApplicationSignedAttachmentId = sinkExchange.resolveContext('InvApplicationSignedAttachmentId');
    const productCode = sinkExchange.resolveContext('productCode');
    const isWCENOAS = [product.WCENOAS, product.WCEN3OAS].includes(productCode);
    const isEBMGRETVTB = productGroupArray.SHOW_NOTE_ABOUT_SIGNED.includes(productCode);
    const isIDGZENIT = productGroupArray.IDG_ZENIT.includes(productCode);
    const isSendContext = productGroupArray.EPOLICY_SEND_NEW_SMS_EMAIL.includes(productCode);
    const issueDate = sinkExchange.resolveContext('issueDate');
    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = issueFormCode == 'ePolicy';
    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode, issueDate }).result;
    const DocumentsBankSignedAttachmentId = sinkExchange.resolveContext('DocumentsBankSignedAttachmentId');
    const emptyLine = '';
    const isPostBank = [product.EBMGPB].includes(productCode);
    const IDGRETVTB = productGroupArray.IDG_RET_VTB.includes(productCode);
    const isAfter20250401 = dateTimeUtils.isAfter(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2025-03-31'));
    const excludeBankDocumentVTBFrom20250401 = productGroupArray.EXCLUDE_BANK_DOCUMENT_VTB_FROM_2025_04_01.includes(productCode);
    const isSendBankDocument = isEBMGRETVTB && !IDGRETVTB && (isAfter20250401 && !excludeBankDocumentVTBFrom20250401 || !isAfter20250401);

    if (allowedEmails && allowedEmails.length > 1) {

        allowedEmails = allowedEmails.split(';').map(item => item.toLowerCase());
    }
    else {

        allowedEmails = undefined;
    }

    if (!shouldSignAttachment || (allowedEmails && allowedEmails.length > 0 && !allowedEmails.includes(email.toLowerCase()))) {

        return;
    }

    if (conf.MemoCBSigned) {

        if (memoCBAttachmentId) {

            attachmentsToSend.push({ attachment: { id: memoCBAttachmentId } });
        }
        else {

            throw "Memo CB attachment not found! Email will not be sent!";
        }
    }

    if (contractAttachmentId) {

        attachmentsToSend.push({ attachment: { id: contractAttachmentId } });
    }
    else {

        throw "Contract attachment not found! Email will not be sent!";
    }

    if (isEPolicy && isWCENOAS && otherDocumentsAttachmentId && otherDocumentsAttachmentId.length > 0) {

        attachmentsToSend.push({ attachment: { id: otherDocumentsAttachmentId[0] } });
    }

    // Не отправлять КИД во втором письме для Policy
    if (kidAttachmentId && (!isEPolicy || isEBMGRETVTB || isPostBank)) {

        attachmentsToSend.push({ attachment: { id: kidAttachmentId } });
    }

    if (InvApplicationSignedAttachmentId) {

        attachmentsToSend.push({ attachment: { id: InvApplicationSignedAttachmentId } });
    }

    if (isEPolicy && isSendBankDocument && DocumentsBankSignedAttachmentId && DocumentsBankSignedAttachmentId.length > 0) {

        attachmentsToSend.push({ attachment: { id: DocumentsBankSignedAttachmentId } });
    }

    const thorwEmailExceptions = this.environmentVariables['rgsl.ePolicyNotificationParams.thorwEmailExceptions'] === 'true';

    const objToSend = {
        entityType: 'Contract',
        recordId: contractId,
        recipients: {
            ContactInformation: [email]
        },
        attachments: attachmentsToSend,
        throwOnError: thorwEmailExceptions
    };

    if (!isSendContext) {

        return objToSend;
    }

    const output = {};

    output.kidPrintout = conf?.kidPrintout;
    output.issueDate = issueDate;
    output.productCode = productCode;
    output.additionalServices = sinkResult?.additionalServices?.map(item => item.serviceCode);

    const policyHolderFirstName = sinkExchange.resolveContext('policyHolderFirstName');
    const policyHolderMiddleName = sinkExchange.resolveContext('policyHolderMiddleName');
    const productDescription = sinkExchange.resolveContext('productDescription');
    const contractNumber = sinkExchange.resolveContext('contractNumber');

    output.productDescription = cleanTextSMS(productDescription);
    output.businessNumber = contractNumber;
    output.issueDateOut = dateTimeUtils.formatDate(issueDate, dateTimeUtils.DateFormats.CALENDAR);
    output.isNew = true;
    output.firstName = policyHolderFirstName;
    output.middleName = policyHolderMiddleName;
    output.firstMiddleName = policyHolderFirstName + (policyHolderMiddleName ? ` ${policyHolderMiddleName}` : emptyLine);
    output.isEBMGRETVTB = isEBMGRETVTB;
    output.isPostBank = isPostBank;
    output.isIDGZENIT = isIDGZENIT || IDGRETVTB;

    // Контекст, нужен для новой формы.
    objToSend.dataContext = {
        content: {
            sinkOutput: output
        }
    };

    return objToSend;

};
