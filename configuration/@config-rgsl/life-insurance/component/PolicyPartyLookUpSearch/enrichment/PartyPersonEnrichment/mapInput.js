module.exports = function mapInput(input) {

    if (input && input.partyCode) {
        return {
            data: {
                criteria: {
                    partyCode: input.partyCode
                }
            }
        };
    }

    return null;


};
