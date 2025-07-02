const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');
const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = async function beforeReviewToApproved(input, ambientProperties) {

    const checkKPKResult = await flowRulesHelper.checkKPK(input, ambientProperties);

    if (checkKPKResult.length > 0) {
        const message = checkKPKResult.join(" ");
        throw message;
    }

    const productCode = getValue(input, 'data.Body.mainInsuranceConditions.insuranceProduct.productCode');
    if (['NOTEV2BFKO', 'NOTEV3BFKO', 'NOTE2BFKO', 'NOTE3BFKO', 'NOTE1BFKO', 'NOTE1BFKO3', 'NOTE1BFKO4', 'NOTEV1BFKO'].includes(productCode)) {

        let futureContractNumber = getValue(input, 'data.Body.technicalInformation.futureContractNumber');
        if (!futureContractNumber) {
            futureContractNumber = await getFuturePolicyNumber(input, ambientProperties);
            setValue(input, 'data.Body.technicalInformation.futureContractNumber', futureContractNumber);

            await this.view.save();
        }
    }
};

async function getFuturePolicyNumber(input, ambientProperties) {

    const request = {
        method: 'post',
        url: `api/core/shared/integration-services/CreatePolicyNumber/1`,
        data: {
            data: {
                contractNumber: input.data.Number
            }
        }
    };

    const result = await ambientProperties.services.api.call(request);

    return result.data.contractNumber;
}
