module.exports = function mapping(input, dataSourceResponse) {

    if (!dataSourceResponse.data || dataSourceResponse.data.length == 0) { return; }

    const resultData = dataSourceResponse.data[0].resultData;
    input.userId = resultData.userId;
    input.userName = resultData.userName;
    input.partyCode = resultData.partyCode;
    input.partyFullName = resultData.partyFullName;
    input.employeeCode = resultData.employeeCode;
    input.organisationUnitCode = resultData.organisationUnitCode;
    input.organisationUnitName = resultData.organisationUnitName;
    input.actualEmail = resultData.actualEmail;

};
