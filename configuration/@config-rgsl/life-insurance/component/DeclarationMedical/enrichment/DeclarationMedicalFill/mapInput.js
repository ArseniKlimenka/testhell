const declarationUtils = require('@config-rgsl/life-insurance/lib/declarationUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapInput(input) {

    const manualCorrection = this.businessContext.rootData.declarationMedicalConfirmation?.manualCorrection;

    if (manualCorrection) {
        return;
    }

    const productCode = declarationUtils.declarationFill(this, 'Medical');
    const issueDate = this.businessContext.rootData.basicConditions?.issueDate;

    return {
        data: {
            criteria: {
                productCode: productCode,
                issueDate: issueDate,
                isPolicyHolder: 0
            }
        }
    };
};
