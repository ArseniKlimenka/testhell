const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { finChangeConfNames } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { getDayByCurrency } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = {

    /**
     * @description Fill component policyTerms data
     */
    generateTerms: function (input) {

        const context = input.context;
        const configurationCodeName = context.ConfigurationCodeName;
        const body = context.Body;
        const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
        const issueDate = body.basicConditions?.issueDate;
        let insuranceTerms = body.basicConditions?.insuranceTerms;
        const insuranceTermsMonths = body.basicConditions?.insuranceTermsMonths;
        const insuranceTermsDays = body.basicConditions?.insuranceTermsDays?.value;
        const isReinvest = body.basicConditions?.isReinvest ?? false;
        const insuredPersonDateOfBirth = body.insuredPerson?.partyData?.dateOfBirth;
        const paymentFrequencyCode = body.basicConditions?.paymentFrequency?.paymentFrequencyCode;
        const withTarification = body.basicConditions?.withTarification ?? false;
        const isCollectivePolicy = configurationCodeName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy;
        const currencyCode = body.basicConditions?.currency?.currencyCode;
        const daysBetweenIssueAndStartDynamic = body.basicConditions?.daysBetweenIssueAndStartDynamic;
        const manualCorrection = body.policyTerms.manualCorrection;

        if (isCollectivePolicy && !withTarification) {

            body.policyTerms.paymentPeriodStartDate = body.policyTerms.startDate;
            body.policyTerms.paymentPeriodEndDate = body.policyTerms.endDate;

            return;
        }

        const emptyPolicyTerms = {
            startDate: undefined,
            endDate: undefined,
            effectiveDate: undefined,
            paymentPeriodStartDate: undefined,
            paymentPeriodEndDate: undefined,
            accumulationPeriodStartDate: undefined,
            accumulationPeriodEndDate: undefined,
            payOutStartDate: undefined,
            payOutEndDate: undefined
        };

        const isQuoteOrCollective = [
            lifeInsuranceConstants.productCode.EquityLifeInsuranceQuote,
            lifeInsuranceConstants.productCode.InvestmentLifeInsuranceQuote,
            lifeInsuranceConstants.productCode.AccumulatedLifeInsuranceQuote,
            lifeInsuranceConstants.productCode.CreditLifeInsuranceQuote,
            lifeInsuranceConstants.productCode.MedLifeInsuranceQuote,
            lifeInsuranceConstants.productCode.RiskLifeInsuranceQuote,
            lifeInsuranceConstants.productCode.AccidentLifeInsuranceQuote,
            lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy
        ].includes(configurationCodeName);

        const isFinChange = finChangeConfNames.includes(configurationCodeName);

        if (!isQuoteOrCollective && !isFinChange) {

            return;
        }

        const productConfOnAmendmentDate = body.amendmentData?.finChangeAmendmentData?.mainAttributes?.productConfOnAmendmentDate;
        let productConfDate = undefined;

        if (!productConfOnAmendmentDate) {

            productConfDate = body.basicConditions?.issueDate;
        }
        else {

            productConfDate = body.amendmentData?.finChangeAmendmentData?.mainAttributes?.amendmentIssueDate;
        }

        if (!productCode || !issueDate) {

            body.policyTerms = emptyPolicyTerms;
            return;
        }

        const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate: productConfDate }) : body?.productConfiguration;
        const isWholeLife = productConf.isWholeLife;
        const isMigrated = body.migrationAttributes?.isMigrated ?? false;

        if (isWholeLife) {
            {

                insuranceTerms = 1;
            }
        }

        if ((!insuranceTerms && !insuranceTermsMonths && !insuranceTermsDays && !isMigrated)) {

            body.policyTerms = emptyPolicyTerms;
            return;
        }

        let startDate = body.policyTerms.startDate;
        let endDate = body.policyTerms.endDate;

        if (!isMigrated) {

            if (configurationCodeName != lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy && !manualCorrection) {

                const daysBetweenIssueAndStart = daysBetweenIssueAndStartDynamic ?? getDayByCurrency(productConf, isReinvest, currencyCode);
                startDate = dateHelper.addDays(issueDate, daysBetweenIssueAndStart);
            }

            if (insuranceTermsDays) {
                endDate = dateHelper.addDays(startDate, insuranceTermsDays - 1);
            }
            else {
                const durationInMonths = insuranceTerms ? 12 * insuranceTerms : 1 * insuranceTermsMonths;
                endDate = dateHelper.addMonthsSubstractDay(startDate, durationInMonths);
            }
        }

        const effectiveDate = startDate;
        let paymentPeriodStartDate = startDate;
        let paymentPeriodEndDate = endDate;
        if (lifeInsuranceConstants.sportProducts.includes(productCode)) {
            paymentPeriodStartDate = issueDate;
            paymentPeriodEndDate = issueDate;
        }

        const accumulationPeriodStartDate = startDate;
        const accumulationPeriodEndDate = endDate;
        const payOutStartDate = dateHelper.addDays(endDate, 1);
        const payOutEndDate = payOutStartDate;

        // temp hardcode for WCENOAS product
        const forLife = 120;
        const payPeriodAge = 80;
        const productCodeAutoCalculateTerms = ['WCENOAS', 'WCEN3OAS'];
        const isAutoCalculateTerms = productCodeAutoCalculateTerms.includes(productCode);
        let autoCalculateTerms;
        let autoCalculateEndDate;
        let autoCalculatePayPeriod;
        let autoCalculatePayPeriodEnd;

        if (isAutoCalculateTerms && !isMigrated) {

            autoCalculateTerms = autoCalculateInsuranceTerms(insuredPersonDateOfBirth, forLife, issueDate);
            autoCalculateEndDate = dateHelper.addMonthsSubstractDay(startDate, autoCalculateTerms * 12);
            autoCalculatePayPeriod = autoCalculateInsuranceTerms(insuredPersonDateOfBirth, payPeriodAge, issueDate);

            if (paymentFrequencyCode == '1') {

                autoCalculatePayPeriod = 1;
            }
            else {

                autoCalculatePayPeriod = autoCalculatePayPeriod > 15 ? 15 : autoCalculatePayPeriod;
            }

            autoCalculatePayPeriodEnd = dateHelper.addMonthsSubstractDay(startDate, autoCalculatePayPeriod * 12);
            body.basicConditions.insuranceTerms = autoCalculatePayPeriod.toString();
        }

        body.policyTerms = {
            startDate,
            endDate: autoCalculateEndDate ? autoCalculateEndDate : endDate,
            effectiveDate,
            paymentPeriodStartDate,
            paymentPeriodEndDate: autoCalculateEndDate ? autoCalculatePayPeriodEnd : paymentPeriodEndDate,
            accumulationPeriodStartDate,
            accumulationPeriodEndDate,
            payOutStartDate,
            payOutEndDate,
            manualCorrection: body.policyTerms.manualCorrection,
            paymentPeriodLastDate: body.policyTerms.paymentPeriodLastDate
        };
    }
};

function autoCalculateInsuranceTerms(insuredPersonDateOfBirth, forLife, issueDate) {

    const insuranceTermsInYears = insuredPersonDateOfBirth ? forLife - dateHelper.getYearDifference(issueDate, insuredPersonDateOfBirth) : forLife;
    return insuranceTermsInYears <= forLife ? insuranceTermsInYears : forLife;
}
