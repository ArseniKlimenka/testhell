module.exports = function dataSourceInputMapping(input) {

    return {
        data: {
            criteria: {
                selectedNumbers: input.selectedNumbers,
                accountingCertificateStates: input.accountingCertificateStates
            }
        }
    };
};
