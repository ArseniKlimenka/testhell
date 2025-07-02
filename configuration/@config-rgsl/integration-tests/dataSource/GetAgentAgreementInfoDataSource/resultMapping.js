module.exports = function resultMapping(input) {

    return {
        agentAgreementId: input.AGENT_AGREEMENT_ID,
        agentAgreementNumber: input.AA_NUMBER,
        manualNumber: input.MANUAL_NUMBER,
        externalNumber: input.EXTERNAL_NUMBER,
        aaLoadDate: input.AA_LOAD_DATE,
        mvzNumber: input.MVZ_NUMBER,
        conclusionDate: input.CONCLUSION_DATE,
        agentCode: input.AGENT_CODE,
        agentPartyCode: input.AGENT_PARTY_CODE,
    };
};

