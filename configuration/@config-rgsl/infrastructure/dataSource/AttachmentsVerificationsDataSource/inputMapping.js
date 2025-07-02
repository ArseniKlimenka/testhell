module.exports = function (input) {

    const output = {
        parameters: {
            contractNumber: null,
            partyCode: null
        }
    };

    if (input.data.criteria.contractNumber) {
        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }
    else if (input.data.criteria.partyCode) {
        output.parameters.partyCode = input.data.criteria.partyCode;
    }

    return output;

};
