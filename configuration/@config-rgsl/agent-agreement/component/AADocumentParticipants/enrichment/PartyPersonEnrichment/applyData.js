module.exports = function applyData(input, dataSourceResponse) {


    if (dataSourceResponse?.data?.length === 0) {

        return;
    }

    const party = dataSourceResponse.data[0].resultData;
    input.agent.fullName = (party.commonBody && party.commonBody.fullName) ? party.commonBody.fullName : undefined;
    input.agent.partyBody = party.body ? party.body : {};
};
