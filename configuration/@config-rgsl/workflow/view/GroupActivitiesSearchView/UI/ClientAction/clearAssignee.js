module.exports = function clearAssignee(input) {
    delete input.data.assigneeId;
    delete input.data.showVerification;
    delete input.data.holderName;
    delete input.data.contractNumber;
    delete input.data.issueDateFrom;
    delete input.data.issueDateTo;
    this.view.reevaluateRules();
};
