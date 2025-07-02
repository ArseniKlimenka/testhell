module.exports = function policyHolderClearButton(input) {

    delete input.data.request.data.criteria.policyHolderCode;
};
