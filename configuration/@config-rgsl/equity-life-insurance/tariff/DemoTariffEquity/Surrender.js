const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function surrender(input) {

    const contractTerm = parseInt(getValue(input, 'attributes.term', 0));
    const mainRiskCalcData = input.risks.find(r => r.code == input.mainRisk);
    const mainRiskSumInsured = mainRiskCalcData && mainRiskCalcData.sumInsured;

    const surrenderValues = [];
    for (let i = 1; i <= contractTerm; i++) {
        surrenderValues.push({
            year: i,
            surrenderValue: round(mainRiskSumInsured * i / 100, 2),
            paidUpValue: 0,
            surrenderRate: round(i / 100, 12),
            paidUpRate: 0
        });
    }

    return {
        table: surrenderValues
    };

};
