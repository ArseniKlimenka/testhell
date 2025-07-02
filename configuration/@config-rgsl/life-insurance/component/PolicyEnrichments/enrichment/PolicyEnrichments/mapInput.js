'use strict';

module.exports = function mapping(input) {

    const bc = this.businessContext;
    const body = bc?.rootData;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body?.basicConditions?.issueDate;

    const originalDocumentNumber = bc?.originalDocumentNumber ?? undefined;
    const documentNumber = bc?.documentNumber ?? undefined;
    const configurationCodeName = bc?.configurationCodeName;
    const configurationVersion = bc?.configurationVersion;
    const contractType = bc?.configurationDimensions?.contractType;

    if (!productCode) {
        throw new Error('Не указан код продукта.');
    }

    if (!issueDate) {
        throw new Error('Не указана дата заключения.');
    }

    const output = {
        body,
        originalDocumentNumber,
        documentNumber,
        configurationCodeName,
        configurationVersion,
        contractType
    };

    return output;
};
