
'use strict';

/**
* @errorCode {errorCode} coordinationUDRequired
* @errorCode {errorCode} manualRateRequired
*/

module.exports = function validateAdditionalInvestmentParameters(input, ambientProperties) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;

    const body = this.businessContext.rootData;
    const attachmentsPackage = body.attachmentsPackage ?? [];

    const rateOfReturnRulesEquityActivesClient = ambientProperties.rateOfReturnRulesEquityActives;
    const rateOfReturnEquityActives = body.additionalInvestmentParameters?.rateOfReturnEquityActives;
    const isCoordinationUDRequired = rateOfReturnEquityActives?.isCoordinationUDRequired;
    const manualRate = rateOfReturnEquityActives?.manualRate;

    if (!manualRate && rateOfReturnRulesEquityActivesClient?.length > 0) {

        validationErrors.push({
            errorCode: 'manualRateRequired',
            errorDataPath: dataPath + '/rateOfReturnEquityActives'
        });
    }

    if (isCoordinationUDRequired && !attachmentsPackage.some(item => item.attachmentType == 'managingDirectorDRPK')) {

        validationErrors.push({
            errorCode: 'coordinationUDRequired',
            errorDataPath: dataPath + '/rateOfReturnEquityActives'
        });
    }

    return validationErrors;
};
