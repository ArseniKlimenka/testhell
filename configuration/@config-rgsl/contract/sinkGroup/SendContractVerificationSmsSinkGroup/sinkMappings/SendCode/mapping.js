'use strict';
const { partnerCode } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { cleanTextSMS } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function mapping(sinkInput, sinkExchange) {

    let manager = 'сотруднику Банка';
    const partnerBusinessCode = sinkInput.partnerBusinessCode;
    const product = lifeInsuranceConstants.product;
    const emptyLine = '';

    if ([partnerCode.OAS, partnerCode.REINVEST].includes(Number(partnerBusinessCode))) {
        manager = 'Вашему менеджеру';
    }

    const secCodeTag = '#SEC_CODE#';
    let message = `Здравствуйте!\n\nДля заключения договора страхования жизни № ${sinkInput.contractNumber} от ${sinkInput.issueDate} сообщите ${manager} код - ${secCodeTag}.\n\nСК «Росгосстрах Жизнь».`;
    const policyHolderMiddleName = sinkInput?.policyHolderMiddleName ? ` ${sinkInput?.policyHolderMiddleName}` : emptyLine;
    const productDescription = cleanTextSMS(sinkInput?.productDescription);
    if (lifeInsuranceConstants.productGroupArray.EPOLICY_SEND_NEW_SMS_EMAIL.includes(sinkInput?.productCode)) {
        message = `Здравствуйте!\n\n${sinkInput?.policyHolderFirstName}${policyHolderMiddleName}, на Вашу электронную почту направлен комплект документов для оформления договора страхования жизни «${productDescription}» № ${sinkInput.contractNumber} от ${sinkInput.issueDate}. Для его подписания сообщите менеджеру код - ${secCodeTag}.\n\nСК «Росгосстрах Жизнь»`;
    }

    let allowedPhoneNumbers = this.environmentVariables['rgsl.ePolicyNotificationParams.allowedPhoneNumbers'];

    if (allowedPhoneNumbers && allowedPhoneNumbers.length > 1) {

        allowedPhoneNumbers = allowedPhoneNumbers.split(';');
    }
    else {

        allowedPhoneNumbers = undefined;
    }

    if (allowedPhoneNumbers && allowedPhoneNumbers.length > 0 && !allowedPhoneNumbers.includes(sinkInput.phoneNumber)) {

        return;
    }

    return {
        request: {
            SmsTypeCode: 0,
            ReferenceNumber: sinkInput.contractNumber,
            PartyCode: sinkInput.holderPartyCode,
            PhoneNumber: sinkInput.phoneNumber,
            Message: message,
            SecurityCodeMessageTag: secCodeTag,
            SecurityCodeDigitsCount: 4,
            ThrowOnIntegrationError: true,
            ProductCode: sinkInput.productCode,
            SourceType: sinkInput.sourceType
        }
    };
};
