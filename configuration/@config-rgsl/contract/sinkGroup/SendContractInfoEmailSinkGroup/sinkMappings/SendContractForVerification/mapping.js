'use strict';

const { businessRules } = require('@adinsure/runtime');
const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const contractNotificationHelper = require('@config-rgsl/contract/lib/contractNotificationHelper');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { cleanTextSMS } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function mapping(sinkResult, sinkExchange) {

    const attachmentsToSend = [];
    const contractAttachmentId = sinkExchange.resolveContext('contractAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');
    const shouldSignAttachment = sinkExchange.resolveContext('shouldSignAttachment');
    const email = sinkExchange.resolveContext('recipientEmail');
    let allowedEmails = this.environmentVariables['rgsl.ePolicyNotificationParams.allowedEmails'];
    const memoCBAttachmentId = sinkExchange.resolveContext('memoCBAttachmentId');
    const kidAttachmentId = sinkExchange.resolveContext('kidAttachmentId');
    const productCode = sinkExchange.resolveContext('productCode');
    const issueDate = sinkExchange.resolveContext('issueDate');
    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const InvApplicationAttachmentId = sinkExchange.resolveContext('InvApplicationAttachmentId');
    const DocumentsBankAttachmentId = sinkExchange.resolveContext('DocumentsBankAttachmentId');
    const InsuranceRulesAttachmentId = sinkExchange.resolveContext('InsuranceRulesAttachmentId');
    const isEPolicy = issueFormCode == 'ePolicy';
    const isEBMGRETVTB = productGroupArray.SHOW_NOTE_ABOUT_SIGNED.includes(productCode);
    const isSendInsuranceRules = productGroupArray.SHOW_NOTE_ABOUT_SIGNED.includes(productCode);
    const isSendContext = productGroupArray.EPOLICY_SEND_NEW_SMS_EMAIL.includes(productCode);
    const emptyLine = '';
    const isPostBank = [product.EBMGPB].includes(productCode);
    const isIDGZENIT = productGroupArray.IDG_ZENIT.includes(productCode) || product.EBMGZENIT.includes(productCode);
    const IDGRETVTB = productGroupArray.IDG_RET_VTB.includes(productCode);
    const isAfter20250401 = dateTimeUtils.isAfter(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2025-03-31'));
    const excludeBankDocumentVTBFrom20250401 = productGroupArray.EXCLUDE_BANK_DOCUMENT_VTB_FROM_2025_04_01.includes(productCode);
    const isSendBankDocument = isEBMGRETVTB && !IDGRETVTB && (isAfter20250401 && !excludeBankDocumentVTBFrom20250401 || !isAfter20250401);

    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode, issueDate }).result;


    if (allowedEmails && allowedEmails.length > 1) {

        allowedEmails = allowedEmails.split(';').map(item => item.toLowerCase());
    }
    else {

        allowedEmails = undefined;
    }

    if (shouldSignAttachment || (allowedEmails && allowedEmails.length > 0 && !allowedEmails.includes(email.toLowerCase()))) {

        return;
    }

    if (conf.MemoCBProject) {

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

    if (kidAttachmentId) {

        attachmentsToSend.push({ attachment: { id: kidAttachmentId } });
    }

    if (InvApplicationAttachmentId) {

        attachmentsToSend.push({ attachment: { id: InvApplicationAttachmentId } });
    }

    if (isEPolicy && isSendBankDocument && DocumentsBankAttachmentId && DocumentsBankAttachmentId.length > 0) {
        attachmentsToSend.push({ attachment: { id: DocumentsBankAttachmentId } });
    }

    if (isEPolicy && isSendInsuranceRules && InsuranceRulesAttachmentId && InsuranceRulesAttachmentId.length > 0) {
        attachmentsToSend.push({ attachment: { id: InsuranceRulesAttachmentId } });
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

    let contractAttachmentDescr;

    if (conf.kidPrintout || productGroupArray.REINVEST.includes(productCode) ||
        productGroupArray.VERIFICATION_SUBJECT.includes(productCode)
    ) {
        contractAttachmentDescr = 'Проект договора страхования и приложения к нему';
    }
    else {

        contractAttachmentDescr = 'Проект договора страхования и приложения к нему, в том числе памятка к договору страхования жизни';
    }

    const attachmentItems = [];

    if (productGroupArray.REINVEST.includes(productCode)) {
        attachmentItems.push(contractNotificationHelper.getInvApplicationAttachmentlItem());
    }

    const policyAttachment = contractNotificationHelper.getDocAttachmentItem(contractAttachmentDescr);
    const ediAttachment = contractNotificationHelper.getConsentEDIAttachmentlItem();
    attachmentItems.push(policyAttachment);

    if (conf.MemoCBProject) {
        attachmentItems.push(contractNotificationHelper.getMemoCBAttachmentItem());
    }

    if (conf.kidPrintout) {
        attachmentItems.push(contractNotificationHelper.getKIDAttachmentlItem());
    }

    attachmentItems.push(ediAttachment);

    const attachmentSection = contractNotificationHelper.joinAttachmentItems(attachmentItems);

    output.attachmentsContent = attachmentSection;

    const policyHolderFirstName = sinkExchange.resolveContext('policyHolderFirstName');
    const policyHolderMiddleName = sinkExchange.resolveContext('policyHolderMiddleName');
    const productDescription = sinkExchange.resolveContext('productDescription');
    const phoneNumber = sinkExchange.resolveContext('phoneNumber');
    const contractNumber = sinkExchange.resolveContext('contractNumber');
    const ruleCode = sinkExchange.resolveContext('ruleCode');
    const ruleDescription = sinkExchange.resolveContext('ruleDescription');

    output.productDescription = cleanTextSMS(productDescription);
    output.businessNumber = contractNumber;
    output.issueDate = issueDate;
    output.issueDateOut = dateTimeUtils.formatDate(issueDate, dateTimeUtils.DateFormats.CALENDAR);
    output.isNew = true;
    if (phoneNumber) {
        output.PhoneNumberTail = phoneNumber.substr(-4, 2) + '-' + phoneNumber.substr(-2, 2);
    }
    output.firstName = policyHolderFirstName;
    output.middleName = policyHolderMiddleName;
    output.firstMiddleName = policyHolderFirstName + (policyHolderMiddleName ? ` ${policyHolderMiddleName}` : emptyLine);
    output.productCode = productCode;
    output.isEBMGRETVTB = isEBMGRETVTB;
    output.isPostBank = isPostBank;
    output.ruleDescription = ruleDescription;
    output.isSendInsuranceRules = isSendInsuranceRules;
    output.isIDGZENIT = isIDGZENIT || IDGRETVTB;
    output.skipDocumentBank = IDGRETVTB || !isSendBankDocument;

    // Контекст, нужен для новой формы.
    objToSend.dataContext = {
        content: {
            sinkOutput: output
        }
    };

    return objToSend;

};
