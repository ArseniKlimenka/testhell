const { userGroup } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(messageContext, sinkExchange) {

    const userGroupCode = messageContext.userGroupCode;
    const recipientsString = this.environmentVariables["rgsl.groupEmails." + userGroupCode];
    const recipientsArray = recipientsString && recipientsString.split(';');

    if (!recipientsArray || userGroupCode !== userGroup.UFO || messageContext.assignedUserUsername) {

        return;
    }

    const output = {
        entityType: messageContext.entityType,
        dataContext: {
            content: {
                contractNumber: sinkExchange.universalDocumentBody.contract.number,
                accountingYear: sinkExchange.universalDocumentBody.accountingYear.year,
                holderFullName: sinkExchange.universalDocumentBody.contract.parties.holder.fullName,
                isInsurerSendDataToFns: sinkExchange.universalDocumentBody.contract.isInsurerSendDataToFns ? 'Да' : 'Нет'
            }
        },
        recipients: {
            ContactInformation: recipientsArray
        }
    };

    return output;

};
