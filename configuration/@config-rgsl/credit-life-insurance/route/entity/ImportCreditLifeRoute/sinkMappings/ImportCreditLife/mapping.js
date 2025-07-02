module.exports = function mapping(input) {
    return {
        importDocumentId: input.id,
        importDocumentNumber: input.number,
        partner: input.body.partner,
        initiator: input.body.initiator,
        agentAgreement: input.body.agentAgreement
    };
};
