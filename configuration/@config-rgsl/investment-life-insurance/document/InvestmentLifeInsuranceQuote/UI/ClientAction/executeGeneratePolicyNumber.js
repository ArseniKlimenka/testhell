const { setValue } = require("@config-rgsl/infrastructure/lib/ObjectUtils");

module.exports = async function executeGeneratePolicyNumber(input, ambientProperties) {

    setValue(input, 'context.Body.technicalInformation.isNeedGenerateFutureNumber', true);

    await this.view.save();

    const futureContractNumber = await getFuturePolicyNumber(input, ambientProperties);
    setValue(input, 'context.Body.technicalInformation.futureContractNumber', futureContractNumber);
    setValue(input, 'context.Body.technicalInformation.isNeedGenerateFutureNumber', false);

    await this.view.save();
};

async function getFuturePolicyNumber(input, ambientProperties) {

    const request = {
        method: 'post',
        url: `api/core/shared/integration-services/CreatePolicyNumber/1`,
        data: {
            data: {
                contractNumber: input.context.Number
            }
        }
    };

    const result = await ambientProperties.services.api.call(request);

    return result.data.contractNumber;
}
