module.exports = function aaNumberClearButton(input) {
    delete input.context.Body.commission.agentAgreement.id;
    delete input.context.Body.commission.agentAgreement.number;
    delete input.context.Body.commission.agentAgreement.manualNumber;
    delete input.context.Body.commission.agentAgreement.externalNumber;
    delete input.context.Body.commission.agentAgreement.formatedNumber;
};
