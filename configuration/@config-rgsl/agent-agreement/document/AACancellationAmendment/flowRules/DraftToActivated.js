'use strict';

/* eslint no-undef: "off"*/

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} otherNonActiveAmendmentsFound
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const enrich = documents.getDocumentConfiguration('AACancellationAmendment', '1').processEnrichmentsFn;
    enrich(undefined, input.body, ['[GetNonActiveAmendments]']);

    const nonActiveAmendments = getValue(input.body, 'tempTechnicalData.nonActiveAmendments', []);

    if (nonActiveAmendments.length > 0) {

        return {
            errorCode: 'otherNonActiveAmendmentsFound'
        };
    }

    return validationErrors;
};
