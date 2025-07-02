
module.exports = function mapping(input, dataSourceResponse) {

    input.endowmentAmounts = dataSourceResponse.data.body.endowmentAmounts;
    input.endowmentBeneficiaries = dataSourceResponse.data.body.endowmentBeneficiaries;
};
