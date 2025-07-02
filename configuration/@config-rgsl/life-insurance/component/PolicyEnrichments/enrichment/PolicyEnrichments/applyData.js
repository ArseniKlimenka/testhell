'use strict';

const { deepCopyAttributes } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { setConsent } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = function mapping(input, result) {

    const enrichedBody = result?.enrichedBody;

    if (result?.validationErrors?.length > 0) {

        const messages = result.validationErrors.map(i => i.message).join(' ');

        throw `E: Ошибки валидации: ${messages}`;
    }

    if (result?.errorResponse?.code) {

        throw `E: ${result.errorResponse.message} ${result.errorResponse.additionalErrorData?.message}`;
    }

    if (!enrichedBody) {

        return;
    }

    setConsent(enrichedBody);
    deepCopyAttributes(this.businessContext.rootData, enrichedBody);
};
