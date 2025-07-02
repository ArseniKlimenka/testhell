module.exports = function enableAdditionalServices(input, ambientProperties) {

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';

    return isCollectivePolicy;
};
