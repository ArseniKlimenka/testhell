module.exports = function clearRequest(input) {
    delete input.context.Body.request;
    delete input.context.Body.validationErrors;
    delete input.context.Body.createdPolicyNumber;
    this.view.rebind();
};
