module.exports = function resultMapping(input) {
    return {
        etlExecutionStatusId: input.ETL_EXECUTION_STATUS_ID,
        rgslGuid: input.RGSL_GUID,
        guidAlreadyExists: input.GUID_ALREADY_EXISTS,
        skipPayment: input.SKIP_PAYMENT,
    };
};
