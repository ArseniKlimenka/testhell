module.exports = function mapping(input) {

    if (!input.contractNumber) {
        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: input.contractNumber,
                    isDidPayment: true,
                    excludeRequestNumber: input.requestNumber
                }
            }
        }
    };

};
