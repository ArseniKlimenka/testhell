'use strict';

const { selectedTypesMaxLimit } = require('@config-rgsl/infrastructure/lib/sportConstants');

/**
 * @errorCode {errorCode} sportTypesIsRequired
 * @errorCode {errorCode} selectedTypesMaxExceeded
*/
module.exports = function validateSportTypes(input, ambientProperties) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;

    if (body.basicConditions.sportTypes?.selectedTypes?.length < 1) {
        validationErrors.push({
            errorCode: "sportTypesIsRequired",
            errorDataPath: dataPath + "/selectedTypes"
        });
    }

    if (body.basicConditions.sportTypes?.selectedTypes?.length > selectedTypesMaxLimit) {
        validationErrors.push({
            errorCode: "selectedTypesMaxExceeded",
            errorDataPath: dataPath + "/selectedTypes",
            reference: {
                max: selectedTypesMaxLimit,
            }
        });
    }

    return validationErrors;
};
