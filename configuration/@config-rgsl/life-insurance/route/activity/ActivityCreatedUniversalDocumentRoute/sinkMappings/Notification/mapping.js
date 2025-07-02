const { translationUtils } = require('@adinsure/runtime');
const { inquiriesTypes } = require('@config-rgsl/life-insurance/lib/inquiriesHelper');
const { userGroup } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(messageContext, sinkExchange) {

    // for translation
    this.applicationContext.locale = "ru-RU";

    const userGroupCode = messageContext.userGroupCode;
    const userGroupName = translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', userGroupCode);
    const recipientsString = this.environmentVariables["rgsl.groupEmails." + userGroupCode];
    const recipientsArray = recipientsString && recipientsString.split(';');

    if (!recipientsArray) { return; }
    if (userGroupCode == userGroup.UFO) { return; }
    if (userGroupCode == userGroup.operations && (sinkExchange?.universalDocumentConfigurationName === inquiriesTypes.EndowmentInquiry
        || sinkExchange?.universalDocumentConfigurationName === inquiriesTypes.Endowment)) { return; }

    const output = {
        entityType: messageContext.entityType,
        dataContext: {
            content: {
                userGroupName: userGroupName,
                contractNumber: sinkExchange?.number,
                partnerShortDescription: sinkExchange?.partnerShortDescription,
                policyHolderFullName: sinkExchange?.policyHolderFullName,
                productDescription: sinkExchange?.productDescription,
                riskPremium: sinkExchange?.riskPremium,
                insuranceTerms: sinkExchange?.insuranceTerms,
                currencyDesc: sinkExchange?.currencyDesc
            }
        },
        recipients: {
            ContactInformation: recipientsArray
        }
    };

    return output;

};
