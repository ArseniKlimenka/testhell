'use strict';

const { newGuid, replaceNullWithUndefined } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');
const { Exception } = require('handlebars');

module.exports = function resultMapping(input) {

    input = replaceNullWithUndefined(input);

    const data = {
        excelRowNumber: input.$rowNumber,
        contractNumber: input.contractNumber,
        policyYearNumber: input.policyYearNumber ? parseInt(input.policyYearNumber) : undefined,
        reinsurerShare: input.reinsurerShare ? parseFloat(input.reinsurerShare) : undefined,
        reinsurerCode: input.reinsurerCode ? parseInt(input.reinsurerCode) : undefined,
        reinsuranceNumber: input.reinsuranceNumber
    };

    const currentRowNumber = input.$rowNumber;
    const currentContractNumber = input.contractNumber;
    const currentPolicyYearNumber = parseInt(input.policyYearNumber);
    const currentReinsurerShare = parseFloat(input.reinsurerShare);

    if (isNaN(currentPolicyYearNumber)) {
        throw new Exception(`Договор ${currentContractNumber}. Строка ${currentRowNumber}. Номер перестрахования ${input.reinsurerShare} должен иметь числовой формат.`);
    }

    if (isNaN(currentReinsurerShare)) {
        throw new Exception(`Договор ${currentContractNumber}. Строка ${currentRowNumber}. Доля перестрахования ${input.reinsurerShare} должна иметь числовой формат.`);
    }

    if (currentReinsurerShare < 0 || currentReinsurerShare > 100) {
        throw new Exception(`Договор ${currentContractNumber}. Строка ${currentRowNumber}. Доля перестрахования ${input.reinsurerShare} должна быть в диапозоне от 0 до 100.`);
    }

    if (!this.businessContext.totalShareArr) {
        this.businessContext.totalShareArr = [];
    }

    if (!this.businessContext.totalShareArr
        .filter(obj => obj.contractNumber == input.contractNumber && obj.policyYearNumber == input.policyYearNumber).length > 0) {
        this.businessContext.totalShareArr.push({
            contractNumber: input.contractNumber,
            policyYearNumber: input.policyYearNumber,
            totalShare: Number((parseFloat(input.reinsurerShare)).toFixed(4))
        });
    } else {
        const objIndex = this.businessContext.totalShareArr.findIndex((obj => obj.contractNumber == input.contractNumber && obj.policyYearNumber == input.policyYearNumber));
        this.businessContext.totalShareArr[objIndex].totalShare =
            this.businessContext.totalShareArr[objIndex].totalShare + Number((parseFloat(input.reinsurerShare)).toFixed(4));

        const currentObjContractNumber = this.businessContext.totalShareArr[objIndex].contractNumber;
        const currentObjPolicyYearNumber = this.businessContext.totalShareArr[objIndex].policyYearNumber;
        const currentObjTotalShare = this.businessContext.totalShareArr[objIndex].totalShare;
        if (currentObjTotalShare > 100) {
            throw new Exception(`Договор ${currentObjContractNumber}. Cумма долей перестраховщика (${currentObjTotalShare}%) для полисного года ${currentObjPolicyYearNumber} в реестре по договору страхования не может быть больше 100%.`);
        }
    }

    return {
        data: data,
        $recordKey: newGuid(),
    };
};
