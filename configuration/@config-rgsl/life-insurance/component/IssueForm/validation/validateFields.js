'use strict';

const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
 * @errorCode {errorCode} codeAbsent
 * @errorCode {errorCode} phoneNumberAbsent
 * @errorCode {errorCode} emailAbsent
 * @errorCode {errorCode} issueFormIsNotAvailableForProduct
 */

module.exports = function validateFields(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;
    const ePolicy = 'ePolicy';
    const offer = 'offer';
    const skipMigrated = skipForMigrated(this.businessContext.rootData);

    const body = this.businessContext.rootData;

    const productConf = body?.productConfiguration;
    const productConfPaperTypes = productConf?.paperTypes ?? [];
    const issueFormCode = input.code?.issueFormCode;
    const isCollectivePolicy = this.businessContext.configurationCodeName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy;

    if (!isCollectivePolicy) {
        if (!productConfPaperTypes.includes(issueFormCode)) {
            validationErrors.push({
                errorCode: "issueFormIsNotAvailableForProduct",
                errorDataPath: dataPath + '/code',
            });
        }

        if (!input.code?.issueFormCode) {
            validationErrors.push({
                errorCode: "codeAbsent",
                errorDataPath: dataPath + '/code',
            });
        }
    }

    if (input.code?.issueFormCode == ePolicy && !input.phoneNumber && !skipMigrated) {
        validationErrors.push({
            errorCode: "phoneNumberAbsent",
            errorDataPath: dataPath + '/phoneNumber',
        });
    }

    if ((input.code?.issueFormCode == ePolicy || input.code?.issueFormCode == offer) && !input.email && !skipMigrated) {
        validationErrors.push({
            errorCode: "emailAbsent",
            errorDataPath: dataPath + '/email',
        });
    }

    return validationErrors;
};
