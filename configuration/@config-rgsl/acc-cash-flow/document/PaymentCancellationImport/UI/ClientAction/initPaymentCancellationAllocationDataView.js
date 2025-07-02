module.exports = function initPaymentCancellationAllocationDataView(input) {
    this.getCurrentView().setSearchRequest({ data: { criteria: { paymentCancellationId: input.context.Id } } });
    this.getCurrentView().search();
};
