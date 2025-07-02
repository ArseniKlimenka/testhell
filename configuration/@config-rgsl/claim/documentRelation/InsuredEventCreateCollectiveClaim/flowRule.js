'use strict';

module.exports = function rule({ body, commonBody }) {

    const contractConfName = body.contract?.configurationName;

    if (contractConfName === 'CollectiveLifeInsurancePolicy') {

        return true;
    }

    return false;
};
