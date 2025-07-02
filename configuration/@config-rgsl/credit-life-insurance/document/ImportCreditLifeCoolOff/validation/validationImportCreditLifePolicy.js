const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} fileIsRequired
 */

module.exports = function validationImportCreditLifePolicy(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;

    const fileId = getValue(input, 'file.fileId');

    if (!fileId) {
        validationErrors.push({
            errorCode: "fileIsRequired",
            errorDataPath: dataPath + '/file/fileName'
        });
    }

    return validationErrors;

};
