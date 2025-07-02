const partyDuplicatesHelper = require('@config-rgsl/party/lib/partyDuplicatesHelper');

module.exports = function mapping(input) {

    const body = this.businessContext.rootData;
    const partyType = this.businessContext.configurationCodeName;
    const partyCode = this.businessContext.entityCode || undefined;

    return partyDuplicatesHelper.prepareInput(body, partyType, partyCode);

};
