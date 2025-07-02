module.exports = function mapping(input, messageContext, sinkExchange) {

    const recipientsString = this.environmentVariables["rgsl.complianceNotification.emails"];
    const emailHeadPrefix = this.environmentVariables["rgsl.emailNotification.environmentName"];
    const recipientsArray = recipientsString && recipientsString.split(';');

    if (!recipientsArray || messageContext.isSkippingRoute === true) {

        return;
    }

    const notification = {
        entityType: 'NaturalPerson',
        dataContext: {
            content: {
                emailHeadPrefix: emailHeadPrefix ? `${emailHeadPrefix}_` : "",
                userFullName: messageContext.userFullName,
                cardCode: input.cardCode,
                partyFullName: input.partyFullName
            }
        },
        recipients: {
            ContactInformation: recipientsArray
        }
    };

    return notification;
};
