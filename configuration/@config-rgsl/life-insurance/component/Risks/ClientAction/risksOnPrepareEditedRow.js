'use strict';

module.exports = function risksOnPrepareEditedRow(input, ambientProperties) {

    const withoutProduct = input.affectedRow.risk?.withoutProduct;
    let manualRiskProgram = input.affectedRow.manualRiskProgram;
    let manualRiskPerson = input.affectedRow.manualRiskPerson;

    if (withoutProduct && (!manualRiskProgram || !manualRiskPerson)) {

        const riskProgram = input.affectedRow.risk?.riskPrograml;
        const riskPerson = input.affectedRow.risk?.riskPerson;
        manualRiskProgram = riskProgram;
        manualRiskPerson = riskPerson;
    }

    return true;
};
