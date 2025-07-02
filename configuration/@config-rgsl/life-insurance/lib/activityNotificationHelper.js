'use strict';

const { translationUtils } = require('@adinsure/runtime');
const FormatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const uriBuilder = require('@config-rgsl/infrastructure/lib/UriBuilder');
const { userGroup, quotesCode } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

function getContinueNotificationData(messageContext, sharedContext, notificationContext) {

    let userGroupCode = messageContext.userGroupCode;
    let isQuoteAndUnderwriting = false;

    if (userGroupCode === userGroup.underwriting && sharedContext.configurationName in quotesCode) {
        isQuoteAndUnderwriting = true;
    }

    userGroupCode = isQuoteAndUnderwriting ? `${userGroupCode}_quote` : userGroupCode;
    const environmentVariable = `rgsl.groupEmails.${userGroupCode}`;
    const userGroupName = translationUtils.getTranslation('masterEntity/ApplicationUserGroup/1', 'localized-field', 'name', userGroupCode);
    const recipientsString = notificationContext.environmentVariables[environmentVariable];
    const recipientsArray = recipientsString && recipientsString.split(';');
    const isOperationsGroup = userGroupCode == userGroup.operations;
    const isUKSPGroup = userGroupCode == userGroup.UKSP;
    const uwTriggers = sharedContext.body.uwTriggers;
    const environmentName = notificationContext.environmentVariables?.environmentName;

    return {
        userGroupCode,
        userGroupName,
        recipientsString,
        recipientsArray,
        isOperationsGroup,
        isUKSPGroup,
        uwTriggers,
        environmentName
    };
}

function getAssetNotificationData(messageContext, sharedContext, notificationContext) {

    const environmentVariable = `rgsl.DW`;
    const recipientsString = notificationContext.environmentVariables[environmentVariable];
    const recipientsArray = recipientsString && recipientsString.split(';');

    return {
        recipientsString,
        recipientsArray,
    };
}

function getContinueInquiryNotificationData(messageContext, sharedContext, notificationContext) {
    const userGroupCode = messageContext.body?.department?.code ?? messageContext.body?.inquiry?.department?.code;
    const uwTriggers = messageContext.body.uwTriggers;

    const environmentVariable = `rgsl.groupEmails.${userGroupCode}_inquiry`;
    const userGroupName = translationUtils.getTranslation('masterEntity/ApplicationUserGroup/1', 'localized-field', 'name', userGroupCode);
    const recipientsString = notificationContext.environmentVariables[environmentVariable];
    const recipientsArray = recipientsString && recipientsString.split(';');
    const rawEnvironmentName = notificationContext.environmentVariables?.environmentName;
    const environmentName = environmetNameTranslations[rawEnvironmentName] ?? rawEnvironmentName;

    return {
        userGroupCode,
        userGroupName,
        recipientsString,
        recipientsArray,
        uwTriggers,
        environmentName
    };

}

function getInquiryNotificationOutput(messageContext, sharedContext, notificationContext, continueNotificationData) {

    const configurationName = sharedContext.configurationName;
    const contractNumber = messageContext.body.contractNumber;
    const configurationVersion = 1;
    const clientBaseUrl = notificationContext.environmentVariables.clientBaseUrl;
    const contractUri = clientBaseUrl + '/' + uriBuilder.getContractUri(configurationName, configurationVersion, contractNumber);
    const rawEnvironmentName = notificationContext.environmentVariables?.environmentName;

    return {
        entityType: messageContext.entityType,
        dataContext: {
            content: {
                userGroupName: continueNotificationData.userGroupName,
                uwTriggers: continueNotificationData.uwTriggers,
                contractNumber: contractNumber,
                contractUri: contractUri,
                partnerShortDescription: messageContext.body.mainInsuranceConditions.partner.partnerShortDescription,
                policyHolderFullName: messageContext.body.holder,
                productDescription: messageContext.body.mainInsuranceConditions.insuranceProduct.productDescription,
                riskPremium: FormatUtils.formatNumberToMoney(messageContext.body.basicConditions.riskPremium),
                insuranceTerms: messageContext.body.basicConditions.insuranceTerms,
                currencyDesc: messageContext.body.basicConditions.currency.currencyDesc,
                environmentName: environmetNameTranslations[rawEnvironmentName] ?? rawEnvironmentName,
                number: messageContext.number
            }
        },
        recipients: {
            ContactInformation: continueNotificationData.recipientsArray
        }
    };

}

function getFinishedInquiryNotificationOutput(messageContext, sharedContext, notificationContext, continueNotificationData) {

    const contractData = sharedContext.contractData;

    const configurationName = messageContext.body?.inquiry?.configurationCodeName;
    const contractNumber = messageContext.body?.inquiry?.quoteNumber;
    const configurationVersion = 1;
    const clientBaseUrl = notificationContext.environmentVariables.clientBaseUrl;
    const contractUri = clientBaseUrl + '/' + uriBuilder.getContractUri(configurationName, configurationVersion, contractNumber);
    const rawEnvironmentName = notificationContext.environmentVariables?.environmentName;

    const result = {
        entityType: messageContext.entityType,
        dataContext: {
            content: {
                userGroupName: continueNotificationData?.userGroupName,
                uwTriggers: messageContext.body?.inquiry?.uwTriggers,
                contractNumber: contractNumber,
                contractUri: contractUri,
                partnerShortDescription: contractData?.partner?.partnerShortDescription,
                policyHolderFullName: messageContext.body?.inquiry?.holder,
                productDescription: contractData.productDescription,
                riskPremium: FormatUtils.formatNumberToMoney(messageContext.body?.inquiry?.riskPremium),
                insuranceTerms: contractData.insuranceTerms,
                currencyDesc: messageContext.body?.inquiry?.currencyDesc,
                environmentName: environmetNameTranslations[rawEnvironmentName] ?? rawEnvironmentName,
                number: messageContext.number
            }
        },
        recipients: {
            ContactInformation: continueNotificationData.recipientsArray
        }
    };

    return result;
}

function getActivityCreatedNotificationOutput(messageContext, sharedContext, notificationContext, continueNotificationData) {

    const configurationName = sharedContext.configurationName;
    const contractNumber = sharedContext.contractNumber;
    const configurationVersion = 1;
    const clientBaseUrl = notificationContext.environmentVariables.clientBaseUrl;
    const contractUri = clientBaseUrl + '/' + uriBuilder.getContractUri(configurationName, configurationVersion, contractNumber);
    const rawEnvironmentName = notificationContext.environmentVariables?.environmentName;

    return {
        entityType: messageContext.entityType,
        dataContext: {
            content: {
                userGroupName: continueNotificationData.userGroupName,
                uwTriggers: continueNotificationData.uwTriggers,
                contractNumber: contractNumber,
                contractUri: contractUri,
                partnerShortDescription: sharedContext.body.mainInsuranceConditions.partner.partnerShortDescription,
                policyHolderFullName: sharedContext.body.policyHolder.partyData.partyFullName,
                productDescription: sharedContext.body.mainInsuranceConditions.insuranceProduct.productDescription,
                riskPremium: FormatUtils.formatNumberToMoney(sharedContext.body.basicConditions.riskPremium),
                insuranceTerms: sharedContext.body.basicConditions.insuranceTerms,
                currencyDesc: sharedContext.body.basicConditions.currency.currencyDesc,
                environmentName: environmetNameTranslations[rawEnvironmentName] ?? rawEnvironmentName
            }
        },
        recipients: {
            ContactInformation: continueNotificationData.recipientsArray
        }
    };

}

function getAssetNotificationOutput(messageContext, sharedContext, notificationContext, continueNotificationData) {

    const rawEnvironmentName = notificationContext.environmentVariables?.environmentName;

    return {
        entityType: messageContext.entityType,
        dataContext: {
            content: {
                assets: sharedContext.assets,
                environmentName: environmetNameTranslations[rawEnvironmentName] ?? rawEnvironmentName
            }
        },
        recipients: {
            ContactInformation: continueNotificationData.recipientsArray
        }
    };

}

const environmetNameTranslations = {
    'TEST': 'Тест',
    'MIGRATION': 'Миграция',
    'PREPRODUCTION': 'Препрод',
    'PRODUCTION': 'Прод',
    'TEST2': 'Тест2'
};

module.exports = {
    getContinueNotificationData,
    getActivityCreatedNotificationOutput,
    getContinueInquiryNotificationData,
    getInquiryNotificationOutput,
    getFinishedInquiryNotificationOutput,
    getAssetNotificationData,
    getAssetNotificationOutput
};
