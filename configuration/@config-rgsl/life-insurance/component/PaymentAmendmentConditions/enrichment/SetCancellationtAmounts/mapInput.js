const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input) {

    const body = this.businessContext.rootData;
    const origDocNumber = this.businessContext.originalDocumentNumber;
    const docNumber = this.businessContext.documentNumber;

    const output = {
        data: {
            contractNumber: origDocNumber,
            amendmentNumber: docNumber,
            amendmentConfName: this.businessContext.configurationCodeName,
            body: body
        }
    };

    return output;
};
