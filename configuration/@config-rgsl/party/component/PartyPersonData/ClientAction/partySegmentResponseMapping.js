const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function partySegmentResponseMapping(input, ambientProperties) {
    let output = [];

    if (input.response && input.response.data && input.response.data.length > 0) {
        output = input.response.data.map(elem => elem.resultData);
    }
    else {
        output.push(input.context.beneficiaryOwner);
    }

    return output;
};
