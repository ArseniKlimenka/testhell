'use strict';

/**
 * @translationKey {translationKey} ServiceProviderDuplicate
 */

const { callDataSource } = require('@config-rgsl/infrastructure/lib/CommonUtils');
function translate(ambientProperties, key, params) { return ambientProperties.services.translate.getSync(ambientProperties.configurationCodeName, key, params); }

module.exports = async function checkForDuplicates(input, ambientProperties) {
    const serviceProviderCode = input.context.Code;
    const partnerCode = input.context.Body.partnerCode ?? input.context.Body.reinsurerCode;
    const configurationCodeName = input.context.ConfigurationCodeName;

    if (!partnerCode || !configurationCodeName || !ambientProperties) {
        return;
    }

    const request = {
        data: {
            criteria: {
                partnerCode: partnerCode,
                configurationCodeName: configurationCodeName
            }
        }
    };

    const response = await callDataSource(ambientProperties, 'GetServiceProviderDataSource', request);
    const serviceProvider = response.data.find(p => p.resultData.serviceProviderCode == serviceProviderCode);

    if (response.data.length && !serviceProvider) {
        showError('ServiceProviderDuplicate', ambientProperties, { partnerCode: partnerCode });

        return true;
    }
};

function showError(errorCode, ambientProperties, inputContext) {
    ambientProperties.services.confirmationDialog.showError(translate(ambientProperties, errorCode, inputContext), undefined, undefined, 1);
}
