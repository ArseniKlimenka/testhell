module.exports = function mapping(lineInput, sinkExchange) {

    if (!lineInput.data.sendEmail) { return; }

    const output = {
        entityType: 'UniversalDocument',
        dataContext: {
            content: {
                userLogin: lineInput.data.username,
                userPassword: sinkExchange.password
            }
        },
        recipients: {
            ContactInformation: [lineInput.data.email]
        }
    };

    return output;
};
