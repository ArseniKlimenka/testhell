module.exports = function (input) {

    if (!input || !input.data || !input.data.criteria) {

        throw "Input criteria was not defined!";
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    if (input.data.criteria.referenceNo) {

        output.parameters.referenceNo = input.data.criteria.referenceNo;
    }

    return output;
};
