module.exports = function mapping(input) {

    if (this.businessContext.etlServiceInput.onlyAllocation) {
        return;
    }

    return {
        paymentCancellationId: this.businessContext.etlServiceInput.paymentCancellationId,
    };
};
