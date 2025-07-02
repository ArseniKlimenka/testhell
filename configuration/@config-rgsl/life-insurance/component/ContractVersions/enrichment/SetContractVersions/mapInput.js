const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapInput(input) {

    const originalDocumentId = getValue(this, 'businessContext.rootData.technicalInformation.originalDocumentId');
    if (!originalDocumentId) { return; }

    return {
        data: {
            criteria: {
                originalDocumentId: originalDocumentId,
                versionStateWithNull: 'Applied'
            }
        }
    };

};
