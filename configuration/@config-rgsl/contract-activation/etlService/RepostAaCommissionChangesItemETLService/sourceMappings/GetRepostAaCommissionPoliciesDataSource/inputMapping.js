module.exports = function mapSinkToDataSource(input) {

    return {
        data: {
            criteria: {
                agentAgreementNumber: input.aaNumber,
            }
        }
    };
};
