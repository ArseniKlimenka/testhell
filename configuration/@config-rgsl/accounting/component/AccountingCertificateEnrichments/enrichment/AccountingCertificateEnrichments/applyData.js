'use strict';

const { deepCopyAttributes } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input, result) {

    const enrichedBody = result?.enrichedBody;

    if (result?.errorResponse?.code) {

        throw `${result.errorResponse.message} ${result.errorResponse.additionalErrorData?.message}`;
    }

    if (!enrichedBody) {

        return;
    }

    deepCopyAttributes(this.businessContext.rootData, enrichedBody);
};
