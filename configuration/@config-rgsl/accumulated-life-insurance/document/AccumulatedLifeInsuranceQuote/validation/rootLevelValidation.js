'use strict';

const { product, issueForm } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
 * @errorCode {errorCode} ePolicyInsuredAgeOnEndDateMax
 * */

module.exports = function rootLevelValidation(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;

    const productCode = input.mainInsuranceConditions.insuranceProduct?.productCode;
    const insredAgeOnStartDate = input.riskConditions?.insredAgeOnStartDate;
    const issueFormCode = input.issueForm?.code?.issueFormCode;
    const isWCENOASproductCode = productCode == product.WCENOAS;
    const isEPolicy = issueFormCode == issueForm.ePolicy.issueFormCode;
    const isInsuredAgeExceeded = insredAgeOnStartDate > 60;

    if (isWCENOASproductCode && isEPolicy && isInsuredAgeExceeded) {
        validationErrors.push({
            errorCode: 'ePolicyInsuredAgeOnEndDateMax',
            errorDataPath: dataPath + '/insuredPerson/partyData/partyFullName'
        });

    }

    return validationErrors;

};
