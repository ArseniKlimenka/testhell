
'use strict';

const { groupBy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { checkPersonBirthday } = require('@config-rgsl/party/lib/partyValidationHelper');

/**
* @errorCode {errorCode} riskPercentageForAdditionalBeneficiariesIsTooHigh
* @errorCode {errorCode} beneficiariesCountForRiskIsTooHigh
* @errorCode {errorCode} beneficiaryBirthDateMustBeGreaterThan1901YearAndLesserThanToday
*/
module.exports = function validateBeneficiaries(input, ambientProperties) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;

    const body = this.businessContext.rootData;

    const beneficiaries = body.additionalBeneficiaries ?? [];

    if (beneficiaries.length === 0) {

        return;
    }

    const mappedBeneficiaries = beneficiaries.map(item => {
        item.riskCode = (item.risk?.code ?? 'NONE');
        item.riskName = (item.risk?.description ?? 'Не указан');
        return item;
    });

    const groupedByRisk = groupBy(mappedBeneficiaries, "riskCode");

    groupedByRisk.forEach(group => {

        const totalPercentage = group.items.reduce((sum, current) => sum + current.share, 0);
        const totalItems = group.items.length;

        if (group.key !== 'NONE') {

            const riskName = group.items[0].riskName;

            if (totalPercentage > 1) {

                validationErrors.push({
                    errorCode: 'riskPercentageForAdditionalBeneficiariesIsTooHigh',
                    reference: {
                        riskNameText: riskName
                    },
                    severity: 'Error'
                });
            }

            if (totalItems > 4) {

                validationErrors.push({
                    errorCode: 'beneficiariesCountForRiskIsTooHigh',
                    reference: {
                        riskNameText: riskName
                    },
                    severity: 'Error'
                });
            }
        }
    });

    for (let i = 0; i < beneficiaries.length; i++) {

        const beneficiary = beneficiaries[i];

        const isdateOfBirthIncorrect = checkPersonBirthday(beneficiary.dateOfBirth);

        if (isdateOfBirthIncorrect) {

            validationErrors.push({
                errorCode: 'beneficiaryBirthDateMustBeGreaterThan1901YearAndLesserThanToday',
                errorDataPath: `${dataPath}/${i}/dateOfBirth`
            });
        }
    }

    return validationErrors;
};
