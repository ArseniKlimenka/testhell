module.exports = function mapping(input, sinkExchange) {

    const user = sinkExchange.resolveContext('keycloakUser');
    let partyCode = user.attributes.PartyCode;

    if (Array.isArray(partyCode)) {
        partyCode = partyCode[0];
    }

    const sendEmail = input?.data?.sendEmail;
    if (!partyCode || !sendEmail) { return; }

    return {
        input: {
            data: {
                criteria: {
                    partyCode: partyCode
                }
            }
        }
    };

};
