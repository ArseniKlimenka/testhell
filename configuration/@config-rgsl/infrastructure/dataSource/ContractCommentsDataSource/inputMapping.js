module.exports = function (input) {

    const output = {
        parameters: {
            contractNumber: null
        }
    };

    if (input.data.criteria.contractNumber) {
        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    return output;

};
