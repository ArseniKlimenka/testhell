'use strict';

/**
 * @errorCode {errorCode} documentEndDateShouldBeGreaterThanStartDate
 * @errorCode {errorCode} ConclusionDateIsRequired
 * @errorCode {errorCode} StartDateIsRequired
 * @errorCode {errorCode} conclusionDateShouldBeGreaterOrEqualToStartDate
 * @errorCode {errorCode} conclusionDateShouldBeLesserOrEqualToEndDate
 */

module.exports = function rootLevelValidation(input) {

    const validationErrors = [];

    const parsedEndDate = input.endDate ? Date.parse(input.endDate) : undefined;
    const parsedStartDate = input.startDate ? Date.parse(input.startDate) : undefined;

    if (input.startDate && input.endDate) {

        if (parsedEndDate < parsedStartDate) {

            validationErrors.push({
                errorCode: "documentEndDateShouldBeGreaterThanStartDate",
                errorDataPath: '/startDate'
            });
        }
    }

    if (!input.conclusionDate) {

        validationErrors.push({
            errorCode: 'ConclusionDateIsRequired',
            errorDataPath: '/conclusionDate'
        });
    }
    else {

        const parsedConclusionDate = Date.parse(input.conclusionDate);

        if (parsedConclusionDate > parsedStartDate) {

            validationErrors.push({
                errorCode: "conclusionDateShouldBeGreaterOrEqualToStartDate",
                errorDataPath: '/conclusionDate'
            });
        }

        if (parsedConclusionDate > parsedEndDate) {

            validationErrors.push({
                errorCode: "conclusionDateShouldBeLesserOrEqualToEndDate",
                errorDataPath: '/conclusionDate'
            });
        }
    }

    if (!input.startDate) {

        validationErrors.push({
            errorCode: 'StartDateIsRequired',
            errorDataPath: '/startDate'
        });
    }

    return validationErrors;
};
