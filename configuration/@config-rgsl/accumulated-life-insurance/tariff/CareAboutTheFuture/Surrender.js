'use strict';

const surrenderValuesCoefficients = require('./rules/CareAboutTheFutureSurrenderValues');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function surrender(input) {

    const { paymentFrequency } = input;
    const contractTerm = parseInt(input?.attributes?.term || 0);
    const surrenderCoefficients = surrenderValuesCoefficients({ contractTerm, paymentFrequency });
    const installmentAmount = input?.attributes?.installmentAmount || 0;

    if (!surrenderCoefficients || !installmentAmount) {
        return {
            table: []
        };
    }
    const surrenderValues = Object.values(surrenderCoefficients).map((sv, idx) => {
        const year = idx + 1;
        return {
            year,
            surrenderValue: round(sv * installmentAmount * year, 2),
            paidUpValue: 0,
            surrenderRate: round(sv, 12),
            paidUpRate: 0
        };
    });

    return {
        table: surrenderValues
    };

};
