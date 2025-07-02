const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input, dataSourceResponse) {

    let sequenceNumber = dataSourceResponse.data.toString();
    const zeroCount = 5 - sequenceNumber.length;
    sequenceNumber = sequenceNumber.padStart(zeroCount, '0');

    input.changeMailSequence = sequenceNumber;
};
