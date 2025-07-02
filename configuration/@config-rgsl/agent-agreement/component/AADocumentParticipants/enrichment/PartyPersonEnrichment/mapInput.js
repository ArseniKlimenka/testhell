module.exports = function mapInput(input) {

    if (input && input.agent && input.agent.partyCode) {
        return {
            data: {
                criteria: {
                    partyCode: input.agent.partyCode
                }
            }
        };
    }

    return null;


};
