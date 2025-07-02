module.exports = function mapping(input, sinkExchange) {

    if (!input.data.sendEmail) { return; }

    const partyData = sinkExchange.partyData;
    const partyEmails = partyData?.body?.partyEmails || [];
    const email = partyEmails.length > 0 ? partyEmails[0].email : undefined;
    sinkExchange.email = email;
    if (!email) { throw 'E-mail отсутствует'; }

    const output = {
        entityType: 'UniversalDocument',
        dataContext: {
            content: {
                userLogin: input.data.userName,
                userPassword: sinkExchange.password
            }
        },
        recipients: {
            ContactInformation: [email]
        }
    };

    return output;
};
