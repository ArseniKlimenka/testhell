const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(initialDocument) {

    const updatedDocument = deepCopy(initialDocument);

    // Modify initial amendment data here.
    updatedDocument.paymentPlan = [];
    updatedDocument.surrenderValues = [];

    const startDate = initialDocument.policyTerms.startDate;
    const endDate = initialDocument.policyTerms.endDate;
    const contractPeriods = dateUtils.getPeriodsTableByMonths(startDate, endDate, 12);
    const isMigrated = initialDocument.migrationAttributes?.isMigrated ?? false;

    updatedDocument.risks.forEach(r => {

        r.startDate = undefined;
        r.riskInsuredSumByPeriod = [];
        r.endDate = undefined;
    });

    if (!updatedDocument.risksCorrection) {

        updatedDocument.risksCorrection = {};
    }

    updatedDocument.risksCorrection.manualCorrection = true;
    updatedDocument.amendmentData = {
        finChangeAmendmentData: {
            mainAttributes: {
                amendmentEffectiveDate: contractPeriods[0].periodStartDate
            },
            technicalData: {
                originalPolicyRisks: initialDocument.risks ?? [],
                originalPolicyTerms: initialDocument.policyTerms ?? {}
            }
        }
    };

    return { body: updatedDocument };
};
