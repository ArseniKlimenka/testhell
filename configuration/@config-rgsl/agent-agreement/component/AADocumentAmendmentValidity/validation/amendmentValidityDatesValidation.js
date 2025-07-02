'use strict';

const { dimensionEnum } = require('@config-rgsl/agent-agreement-base/lib/AAConsts');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} documentEndDateShouldBeGreaterThanStartDate
 * @errorCode {errorCode} ConclusionDateIsRequired
 * @errorCode {errorCode} StartDateIsRequired
 * @errorCode {errorCode} amendmentStartDateShouldBeGreaterOrEqualToDocumentStartDate
 * @errorCode {errorCode} amendmentEndDateDateShouldBeLesserOrEqualToDocumentEndDate
 * @errorCode {errorCode} amendmentConclusionDateShouldBeGreaterOrEqualToDocumentStartDate
 * @errorCode {errorCode} amendmentConclusionDateShouldBeLesserOrEqualToDocumentEndDate
 */

module.exports = function rootLevelValidation(input) {

    const validationErrors = [];
    const docEndDate = getValue(this.businessContext, 'rootData.validity.endDate');
    const docStartDate = getValue(this.businessContext, 'rootData.validity.startDate');
    const parsedDocumentEndDate = docEndDate ? Date.parse(docEndDate) : undefined;
    const parsedDocumentStartDate = docStartDate ? Date.parse(docStartDate) : undefined;

    if (this.businessContext.configurationDimensions['agentAgreementType'] === dimensionEnum.agentAgreementType.dimension) {

        return validationErrors;
    }

    checkValidityDates(input, validationErrors, parsedDocumentEndDate, parsedDocumentStartDate);

    return validationErrors;
};

function checkValidityDates(input, validationErrors, parsedDocumentEndDate, parsedDocumentStartDate) {

    if (!input.startDate) {

        validationErrors.push({
            errorCode: 'StartDateIsRequired',
            errorDataPath: '/startDate'
        });
    }

    if (input.startDate && input.endDate) {

        const parsedStartDate = Date.parse(input.startDate);
        const parsedEndDate = Date.parse(input.endDate);

        if (parsedEndDate < parsedStartDate) {

            validationErrors.push({
                errorCode: "documentEndDateShouldBeGreaterThanStartDate",
                errorDataPath: '/startDate'
            });
        }
    }

    if (input.startDate) {

        const parsedStartDate = Date.parse(input.startDate);

        if (parsedStartDate < parsedDocumentStartDate) {

            validationErrors.push({
                errorCode: "amendmentStartDateShouldBeGreaterOrEqualToDocumentStartDate",
                errorDataPath: '/startDate'
            });
        }
    }

    if (input.endDate && parsedDocumentEndDate) {

        const parsedEndtDate = Date.parse(input.endDate);

        if (parsedEndtDate > parsedDocumentEndDate) {

            validationErrors.push({
                errorCode: "amendmentEndDateDateShouldBeLesserOrEqualToDocumentEndDate",
                errorDataPath: '/endDate'
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
        const parsedStartDateDate = Date.parse(input.startDate);
        const parsedEndDateDate = Date.parse(input.endDate);

        if (parsedConclusionDate > parsedStartDateDate) {

            validationErrors.push({
                errorCode: "amendmentConclusionDateShouldBeGreaterOrEqualToDocumentStartDate",
                errorDataPath: '/conclusionDate'
            });
        }

        if (parsedConclusionDate > parsedEndDateDate) {

            validationErrors.push({
                errorCode: "amendmentConclusionDateShouldBeLesserOrEqualToDocumentEndDate",
                errorDataPath: '/conclusionDate'
            });
        }
    }
}
