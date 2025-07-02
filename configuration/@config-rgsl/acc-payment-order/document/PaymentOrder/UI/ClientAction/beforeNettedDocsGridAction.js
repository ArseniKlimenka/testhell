'use strict';

/**
 * @translationKey {translationKey} DuplicatedDocForNettingSelected
 */
module.exports = function beforeNettedDocsGridAction(input, ambientProperties) {

    if (input.operationType === 'Add') {

        const docNumberToAdd = input.affectedRow.documentNumber;
        const existingDoc = input.gridData.find(doc => doc.documentNumber === docNumberToAdd);

        if (existingDoc) {

            ambientProperties.services.confirmationDialog
                .showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.DuplicatedDocForNettingSelected', 'OK', 'OK', 2);
            return false;
        }
    }

    return true;
};
