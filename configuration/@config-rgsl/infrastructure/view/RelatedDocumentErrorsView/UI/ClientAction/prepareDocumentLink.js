'use strict';

const { getConfCodeNameByDimension } = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function prepareDocumentLink(input) {

    const { entityType, confName, confVersion, number, relatedUniDocNumber, dimProductGroup, dimAmendmentType, dimContractType } = input.data.resultData;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: entityType,
                configurationCodeName: confName ?? getConfCodeNameByDimension(dimProductGroup, dimAmendmentType, dimContractType),
                version: confVersion,
                documentNumber: number ?? relatedUniDocNumber
            }
        }
    };
};
