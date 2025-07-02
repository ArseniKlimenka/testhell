const { mapAvailableInsuranceTermsDays } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function applyData(input) {

    const body = this.businessContext.rootData;
    const insuranceTermsDays = body.productConfiguration.insuranceTermsDays;

    if (insuranceTermsDays?.length > 0) {
        body.basicConditions.availableInsuranceTermsDays = mapAvailableInsuranceTermsDays(insuranceTermsDays);
    }
};
