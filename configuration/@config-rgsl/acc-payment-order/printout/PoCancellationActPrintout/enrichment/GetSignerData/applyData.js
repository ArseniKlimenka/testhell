
module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse?.data?.length === 0) {

        return;
    }

    const party = dataSourceResponse.data[0].resultData;
    const signerRecord = party;
    input.actSignerMail = signerRecord.body.partyEmails && signerRecord.body.partyEmails.length > 0 ? signerRecord.body.partyEmails[0].email : '';
};
