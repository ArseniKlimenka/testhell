'use strict';

/**
 * @errorCode {errorCode} documentsPeriodsIntercrossing
 * @errorCode {errorCode} currentPassportIsAbsent
 */

module.exports = function validatePartyDocuments(input) {

    const validationErrors = [];
    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return validationErrors; }

    const passports = input.partyDocuments.filter(x => x.docType.docTypeCode == "passport");
    if (passports.length > 0) {
        const currentPassport = input.partyDocuments.find(x => x.docType.docTypeCode == "passport" && !x.expireDate);
        if (!currentPassport) {
            validationErrors.push({
                errorCode: "currentPassportIsAbsent"
            });
        }
    }

    const dataPath = this.businessContext.dataPath;
    input.partyDocuments.forEach((curItem, index, array) => {

        const curItemIndex = index;
        const curItemDocTypeCode = curItem.docType && curItem.docType.docTypeCode;
        const curItemIssueDate = curItem.issueDate;
        const curItemExpireDate = curItem.expireDate;

        array.forEach((anotherItem, index) => {

            const anotherItemIndex = index;
            const anotherItemDocTypeCode = anotherItem.docType && anotherItem.docType.docTypeCode;
            const anotherItemIssueDate = anotherItem.issueDate;
            const anotherItemExpireDate = anotherItem.expireDate;

            if (anotherItemIndex != curItemIndex && curItemDocTypeCode == anotherItemDocTypeCode) {

                if (
                    (curItemIssueDate >= anotherItemIssueDate && (!anotherItemExpireDate || anotherItemExpireDate >= curItemIssueDate))
                    ||
                    (curItemIssueDate <= anotherItemIssueDate && (!curItemExpireDate || curItemExpireDate >= anotherItemIssueDate))
                ) {
                    validationErrors.push({
                        errorCode: "documentsPeriodsIntercrossing",
                        errorDataPath: dataPath + '/' + curItemIndex
                    });
                }

            }

        });
    });

    return validationErrors;

};
