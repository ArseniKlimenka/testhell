'use strict';

const configValidationByRole = require('@config-rgsl/party/lib/partyValidationByRoleConstant');
const { LocalDate } = require('@js-joda/core');

module.exports = function applyData(partyDocument) {

    const partyRole = this.businessContext?.rootData?.data?.partyRoleOfPerson?.partyRole || this.businessContext?.rootData?.partyRoleOfPerson?.partyRole;

    if (partyRole === configValidationByRole.PolicyHolderBoxNaturalPerson.code || partyRole === configValidationByRole.InsuredBoxNaturalPerson.code) {

        if (partyDocument.issuerName === "" || partyDocument.issuerName.toLowerCase() === "загс" || partyDocument.issuerName.toLowerCase() === "мвд") {
            partyDocument.issuerName = undefined;
        }

        if (partyDocument.issuerCode === "") {
            partyDocument.issuerCode = undefined;
        }

        if (partyDocument.issueDate === LocalDate.now().toString()) {
            partyDocument.issueDate = undefined;
        }

    }

};
