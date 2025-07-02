'use strict';

const FormatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

function joinAttachmentItems(attachmentItems) {
    return `<table border="0" style="table-layout: fixed; border-collapse: collapse; width: 600px;">
      <tbody>
        <tr>` +
        attachmentItems.join(``)
        + `</tr>
      </tbody>
    </table>`;
}

const vtpProductCodesForNotification = [
    "IDGV1VTB",
    "IDGV2VTB",
    "IDGV3VTB",
    "IDGV5VTB",
    "IDGV2PPVTB",
    "IDGV3PPVTB",
    "IDGV5PPVTB",
    "EBMGVTB",
    "IDGP1VTB",
    "IDG1EKSPO",
    "IDGP2VTB",
    "IDGP3VTB",
    "IDGP5VTB",
    "IDGP2PPVTB",
    "IDGP3PPVTB",
    "IDGP5PPVTB",
    "IDGPN1VTB",
    "IDGPN2VTB",
    "IDGPN3VTB",
    "IDGPN4VTB",
    "IDGPN5VTB",
    "IDGPN2PPVTB",
    "IDGPN3PPVTB",
    "IDGPN4PPVTB",
    "IDGPN5PPVTB",
    "EBMGVVTB",
    "EBMGVNVTB",
    "IDGV4VTB",
    "IDGVN4VTB",
    "IDGP4VTB",
    "IDGV4PPVTB",
    "IDGP4PPVTB",
    "TERMVVTB",
    "EBMGUBRR",
    "EBMGNVTB",
    "EBM3GUBRR",
    "IDG2RETVTB",
    "IDG3RETVTB",
    "IDG5RETVTB",
    "IDGN2RETVTB",
    "IDGN3RETVTB",
    "IDGN5RETVTB",
    "IDGVN1VTB",
    "IDGVN2VTB",
    "IDGVN3VTB",
    "IDGVN5VTB",
    "IDGVN2PPVTB",
    "IDGVN3PPVTB",
    "IDGVN4PPVTB",
    "IDGVN5PPVTB"
];

function getDocAttachmentItem(attachmentDescription) {
    return `
      <td style="width: 240px; font-size:17px;" valign="top">
        <img src="cid:Doc.png" width="50" alt="" style="width:50px;max-width:100%;height:auto;" />
        <p style="padding:0;margin:10px 30px 0px 0px;font-family:Arial,sans-serif;font-size:17px;">${attachmentDescription}</p>
      </td>`;
}

function getMemoCBAttachmentItem() {
    const attachmentDescription = 'Информация о договоре добровольного страхования согласно требованиям Банка России от 05.10.2021 №5968-У';
    return getDocAttachmentItem(attachmentDescription);
}

function getConsentEDIAttachmentlItem() {
    const attachmentDescription = 'Соглашение об электронном документообороте';
    return getDocAttachmentItem(attachmentDescription);
}

function getKIDAttachmentlItem() {
    const attachmentDescription = 'Ключевой информационный документ об условиях договора добровольного страхования';
    return getDocAttachmentItem(attachmentDescription);
}

function getInvApplicationAttachmentlItem() {
    const attachmentDescription = 'Заявление на получение страховых выплат';
    return getDocAttachmentItem(attachmentDescription);
}

function getPolicyNonResidentData(messageContext, sharedContext, notificationContext) {

    const recipientsString = notificationContext.environmentVariables["rgsl.groupEmails.nonResident"];
    const recipientsArray = recipientsString && recipientsString.split(';');
    const isNonResidentPolicyHolder = messageContext.body.policyHolder?.partyData?.partyBody?.partyGeneralData?.isNonResident;

    return {
        recipientsString,
        recipientsArray,
        isNonResidentPolicyHolder
    };
}

function getPolicyNonResidentOutput(messageContext, sharedContext, notificationContext, continueNotificationData) {

    const configurationName = messageContext.configurationCodeName;
    const contractNumber = sharedContext.contractNumber;
    const configurationVersion = 1;
    const clientBaseUrl = notificationContext.environmentVariables.clientBaseUrl;
    const contractUri = clientBaseUrl + '/' + uriBuilder.getContractUri(configurationName, configurationVersion, contractNumber);

    const contractIssueDate = sharedContext.body.basicConditions.issueDate ? DateTimeUtils.formatDate(sharedContext.body.basicConditions.issueDate, DateTimeUtils.DateFormats.CALENDAR) : '';
    const paymentExpirationDate = sharedContext.body.paymentPlan[0]?.paymentExpirationDate ? DateTimeUtils.formatDate(sharedContext.body.paymentPlan[0]?.paymentExpirationDate, DateTimeUtils.DateFormats.CALENDAR) : '';
    const textDeclinationByYear = FormatUtils.getTextDeclinationByYear(sharedContext.body.basicConditions.insuranceTerms);
    const policyHolderCitizenship = messageContext.body.policyHolder.partyData.partyBody.partyPersonData?.citizenship?.map(country => country.countryFullName).join(', ');
    const currencyDesc = messageContext.body.basicConditions.currency?.currencyDesc;

    return {
        entityType: messageContext.entityType,
        dataContext: {
            content: {
                contractNumber: contractNumber,
                contractUri: contractUri,
                contractIssueDate: contractIssueDate,
                paymentExpirationDate: paymentExpirationDate,
                partnerShortDescription: sharedContext.body.mainInsuranceConditions.partner.partnerShortDescription,
                policyHolderFullName: sharedContext.body.policyHolder.partyData.partyFullName,
                productDescription: sharedContext.body.mainInsuranceConditions.insuranceProduct.productDescription,
                riskPremium: FormatUtils.formatNumberToMoney(sharedContext.body.basicConditions.riskPremium),
                insuranceTerms: sharedContext.body.basicConditions.insuranceTerms,
                textDeclinationByYear: textDeclinationByYear,
                currencyDesc: currencyDesc,
                policyHolderCitizenship: policyHolderCitizenship
            }
        },
        recipients: {
            ContactInformation: continueNotificationData.recipientsArray
        }
    };

}

module.exports = {
    joinAttachmentItems,
    vtpProductCodesForNotification,
    getDocAttachmentItem,
    getMemoCBAttachmentItem,
    getConsentEDIAttachmentlItem,
    getKIDAttachmentlItem,
    getInvApplicationAttachmentlItem,
    getPolicyNonResidentData,
    getPolicyNonResidentOutput
};
