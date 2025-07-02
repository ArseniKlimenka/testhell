'use strict';

/**
 * @errorCode {errorCode} taxResidenciesPeriodsIntercrossing
 */

module.exports = function validatePartyTaxResidencies(input) {

    const validationErrors = [];
    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return validationErrors; }

    const dataPath = this.businessContext.dataPath;
    input.partyTaxResidencies.forEach((curItem, index, array) => {

        const curItemIndex = index;
        const curItemStartDate = curItem.startDate;
        const curItemEndDate = curItem.endDate;

        array.forEach((anotherItem, index) => {

            const anotherItemIndex = index;
            const anotherItemStartDate = anotherItem.startDate;
            const anotherItemEndDate = anotherItem.endDate;

            if (anotherItemIndex != curItemIndex) {

                if (
                    (curItemStartDate >= anotherItemStartDate && (!anotherItemEndDate || anotherItemEndDate >= curItemStartDate))
                    ||
                    (curItemStartDate <= anotherItemStartDate && (!curItemEndDate || curItemEndDate >= anotherItemStartDate))
                ) {
                    validationErrors.push({
                        errorCode: "taxResidenciesPeriodsIntercrossing",
                        errorDataPath: dataPath + '/' + curItemIndex
                    });
                }

            }

        });
    });

    return validationErrors;

};
