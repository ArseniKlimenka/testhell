'use strict';

module.exports = function executivePersonResponseMapping(input, ambientProperties) {
    let output = [];

    const isPublicOfficial = input.componentContext.isPublicOfficial ?? false;

    if (input.response && input.response.data && input.response.data.length > 0) {
        output = input.response.data.map(elem => elem.resultData);
    }
    else {
        output.push(input.context.beneficiaryOwner);
    }

    output = output.filter(x => { return isPublicOfficial && x.executivePersonCode !== '6'; });

    return output;
};
