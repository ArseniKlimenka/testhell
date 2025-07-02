const { visibilityTypeMapping } = require('@config-rgsl/employee/lib/exportUserHelper');

module.exports = function mapping(lineInput, sinkExchange) {

    const tabNumber = lineInput.data.tabNumber;
    const position = lineInput.data.position;

    const visibilityType = visibilityTypeMapping(lineInput.data.visibilityType);

    return {
        body: {
            tabNumber: tabNumber,
            position: position,
            visibilityType: visibilityType,
            orgUnitName: sinkExchange.DOInfo.name,
            orgUnitCode: sinkExchange.DOInfo.code,
            actualEmail: lineInput.data.email,
            employeeParty: {
                partyData: {
                    partyBody: sinkExchange.partyData.body,
                    partyId: sinkExchange.partyData.partyId,
                    partyCode: sinkExchange.partyData.partyCode,
                    partyType: "NaturalPerson",
                    partyFullName: sinkExchange.partyData.commonBody.fullName
                }

            }
        }
    };
};
