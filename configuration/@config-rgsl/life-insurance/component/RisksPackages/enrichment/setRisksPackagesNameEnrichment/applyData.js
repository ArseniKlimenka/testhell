'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { riskPackagesConfiguration } = require('@config-rgsl/life-insurance/lib/riskPackagesConfiguration');

module.exports = function mapping(input, dataSourceResponse) {

    const availablePackages = getValue(this, 'businessContext.rootData.risksPackages.availablePackages', []);
    const selectedPackages = getValue(this, 'businessContext.rootData.risksPackages.selectedPackages', []);

    this.businessContext.rootData.risksPackages.availablePackages = updateRisksPackagesName(availablePackages);
    this.businessContext.rootData.risksPackages.selectedPackages = updateRisksPackagesName(selectedPackages);

};

function updateRisksPackagesName(packages) {
    return packages.map(item => {
        const packageConf = riskPackagesConfiguration({ packageCode: item.packageCode });
        return {
            packageCode: item.packageCode,
            packageName: packageConf.packageName
        };
    });
}
