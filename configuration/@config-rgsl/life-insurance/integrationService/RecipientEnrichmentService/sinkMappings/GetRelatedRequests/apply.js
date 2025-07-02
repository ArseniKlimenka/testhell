module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const resultData = sinkResult.data[0]?.resultData;
    if (!resultData) {
        return;
    }

    sinkExchange.recipient = {
        partyData: {
            partyCode: resultData.recipientPartyCode,
            partyFullName: resultData.recipientPartyFullName
        },
        reasonForRecipient: resultData.reasonForRecipient
    };
};
