
module.exports = function mapping(input, dataSourceResponse) {

    input.paymentLines = dataSourceResponse.data.body.paymentAmendmentConditions.paymentLines;
    input.canellationRecipients = dataSourceResponse.data.body.paymentAmendmentConditions.canellationRecipients;
};
