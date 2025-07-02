const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

const { allocationDocumentType } = require('@config-rgsl/acc-base/lib/accConsts');
const { paymentFrequency } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants.js');

module.exports = function mapping(input, sinkExchange) {

    if (input.body.documentTypeId !== allocationDocumentType.POLICY) {

        sinkExchange.logMessages.push({
            message: 'AllocationDocumentType is not a policy',
            logLevel: 'debug'
        });

        return;
    }

    const recipientsString = this.environmentVariables["rgsl.nonResidentAllocation.emails"];
    const emailHeadPrefix = this.environmentVariables["rgsl.nonResidentAllocation.environmentName"];
    const recipientsArray = recipientsString && recipientsString.split(';');

    if (!recipientsArray || sinkExchange.isSkippingRoute === true) {

        sinkExchange.logMessages.push({
            message: `Skip notification sink. Recipients count is ${recipientsArray.length}, isSkippingRoute is ${sinkExchange.isSkippingRoute}`,
            logLevel: 'debug'
        });

        return;
    }

    const result = [];
    const contractBody = sinkExchange.contractData.body;

    for (const allocation of sinkExchange.allocations) {

        const ppItem = sinkExchange.ppData.find(x => x.dueDate === allocation.dueDate);

        if (!ppItem) {

            throw new Error(`Не найдено ни одной записи из графика оплаты с датой ${ppItem.dueDate}`);
        }

        const premiumAmount = contractBody?.paymentPlan?.reduce((sum, payment) => sum + payment.paymentMandatory, 0);
        const paymentFrequencyDescription = contractBody?.basicConditions?.paymentFrequency?.paymentFrequencyCode != paymentFrequency.oneTime.code
            ? contractBody?.basicConditions?.paymentFrequency?.paymentFrequencyDescription?.toLowerCase() : undefined;
        const paymentExpirationDate = contractBody?.paymentPlan?.find(x => x.paymentPeriodStart === ppItem.dueDate)?.paymentExpirationDate;

        if (!paymentExpirationDate) {

            throw new Error(`Не найдено ни одной записи из графика оплаты в Body договора с датой ${ppItem.dueDate}`);
        }

        const citizenshipString = contractBody.policyHolder.partyData.partyBody.partyPersonData.citizenship
            ?.map((x) => (x.countryFullName && x.countryFullName !== "NULL") ? x.countryFullName : x.countryShortName)
            .join(', ') ?? '';

        const notification = {
            dataContext: {
                content: {
                    emailHeadPrefix: `${emailHeadPrefix}_`,
                    contractNo: input.body.documentNo,
                    issueDate: dateTimeUtils.formatDate(contractBody.basicConditions.issueDate, dateTimeUtils.DateFormats.CALENDAR),
                    fullName: contractBody.policyHolder.partyData.partyFullName,
                    citizenship: citizenshipString,
                    premiumCurrencyCode: contractBody?.basicConditions?.currency?.currencyCode,
                    premiumAmount: premiumAmount,
                    paymentFrequency: paymentFrequencyDescription,
                    paymentExpirationDate: dateTimeUtils.formatDate(paymentExpirationDate, dateTimeUtils.DateFormats.CALENDAR),
                    incomeSourceName: sinkExchange.incomeSourceName,
                    endDate: dateTimeUtils.formatDate(contractBody.policyTerms.endDate, dateTimeUtils.DateFormats.CALENDAR),
                    paymentCurrencyCode: sinkExchange.incomeCurrencyCode,
                    paymentAmout: allocation.bsi.amount,
                    paymentDate: dateTimeUtils.formatDate(allocation.bsi.paymentDate, dateTimeUtils.DateFormats.CALENDAR)
                }
            },
            recipients: {
                ContactInformation: recipientsArray
            }
        };

        result.push(notification);
    }

    sinkExchange.logMessages.push({
        message: `Result data: ${JSON.stringify(result)}`,
        logLevel: 'debug'
    });

    sinkExchange.logResult = [];
    sinkExchange.logResult.push({
        message: `Result data: ${JSON.stringify(result)}`,
        logLevel: 'debug'
    });

    return result;
};
