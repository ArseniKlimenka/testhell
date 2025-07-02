module.exports = function DataSourceInputMapping(input) {
    if (!input || !input.data || !input.data.criteria) {
        throw "Input criteria was not defined!";
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    output.parameters.productCode = output.parameters.product?.productCode;
    output.parameters.eventTypeCode = output.parameters.eventType?.code;
    output.parameters.eventReasonCode = output.parameters.eventReason?.code;

    return output;
};
