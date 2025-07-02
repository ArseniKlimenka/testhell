'use strict';

/* eslint no-undef: "off"*/

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} changesNoteIsRequired
 * @errorCode {errorCode} otherNonActiveAmendmentsFound
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const enrich = documents.getDocumentConfiguration('AAChangeAmendment', '1').processEnrichmentsFn;
    enrich(undefined, input.body, ['[GetNonActiveAmendments]']);

    const nonActiveAmendments = getValue(input.body, 'tempTechnicalData.nonActiveAmendments', []);

    if (nonActiveAmendments.length > 0) {

        return {
            errorCode: 'otherNonActiveAmendmentsFound'
        };
    }

    const changesNote = getValue(input.body, 'amendmentData.changeAmendmentData.changesNote');

    if (!changesNote || changesNote.length === 0) {

        validationErrors.push({
            errorCode: 'changesNoteIsRequired',
            errorDataPath: '/Body/amendmentData/changeAmendmentData/changesNote'
        });
    }

    return validationErrors;
};
