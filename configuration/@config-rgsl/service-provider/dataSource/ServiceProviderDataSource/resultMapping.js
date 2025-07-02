module.exports = function resultMapping(input) {
    const output = {};

    output.serviceProviderCode = input.code;
    output.businessCode = input.body.businessCode;
    output.partyId = input.body.partyId;
    output.partyCode = input.body.partyCode;
    output.partyDisplayName = input.body.partyDisplayName;
    output.partyShortName = input.body.partyShortName;
    output.orgUnitCode = input.body.orgUnitCode;
    output.orgUnitName = input.body.orgUnitName;
    output.serviceProviderType = input.metadata.configuration.name;
    output.sadNumber = input.body.sadNumber;

    return output;
};
