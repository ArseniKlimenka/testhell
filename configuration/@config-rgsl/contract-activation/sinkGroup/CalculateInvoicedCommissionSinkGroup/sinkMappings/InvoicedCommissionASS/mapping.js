'use strict';

const { reduceGroupBy, getDistribution } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const { buildInvoicedCommissionSink } = require('@config-rgsl/contract-activation/lib/sinkMappingHelperInvoicedCommission');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { invoicedCommissionTypeIds } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function mapping(input, sinkExchange) {

    const policyInfo = sinkExchange.resolveContext('policyInfo');
    const oldInvoicedCommission = sinkExchange.resolveContext('lastInvoicedCommission');
    const newInvoicedCommission = [];
    const policyAaCommission = sinkExchange.resolveContext('policyAaCommission');
    const policyCommissionData = sinkExchange.resolveContext('policyCommission');
    const paymentPlan = sinkExchange.resolveContext('paymentPlan');
    const zeroResult = {
        rate: 0,
        amount: 0,
    };

    for (const contract of input.contracts) {

        const contractNumber = contract.contractNumber;

        const pp = paymentPlan.filter(_ => _.contractNumber === contractNumber);
        const polInfo = policyInfo.find(_ => _.contractNumber === contractNumber);
        const firstInstallmentPaid = polInfo?.firstInstallmentPaid ?? false;
        const invoiceOnActivation = polInfo?.invoiceOnActivation ?? false;
        const aaContractComm = policyAaCommission.filter(_ => _.contractNumber === contractNumber);
        const policyCommission = policyCommissionData.filter(_ => _.contractNumber === contractNumber);
        const oldInvComm = oldInvoicedCommission.filter(_ => _.contractNumber === contractNumber);
        const newInvComm = [];

        if (firstInstallmentPaid || invoiceOnActivation) {


            for (const ppItem of pp) {

                const polCommItems = policyCommission.filter(_ =>
                    _.objectCode === ppItem.objectCode &&
                    _.itemCode === ppItem.itemNo &&
                    _.periodNumber === ppItem.insuranceYear);

                for (const polCommItem of polCommItems) {
                    const aaInstallmentComm = aaContractComm.find(_ => _.dueDate === ppItem.dueDate) ?? zeroResult;

                    const invoicedCommissionItem = {
                        contractNumber: contractNumber,
                        dueDate: ppItem.dueDate,
                        postingDate: ppItem.postingDate,
                        objectCode: ppItem.objectCode,
                        itemNo: ppItem.itemNo,
                        currencyCode: ppItem.currencyCode,
                        baseAmount: ppItem.baseAmount,
                        aaCommRate: aaInstallmentComm.rate,
                        docCommRate: polCommItem.docCommRate,
                        finalCommRate: polCommItem.docCommRate ?? aaInstallmentComm.rate,
                        calcCommAmount: undefined,
                        insuranceYear: ppItem.insuranceYear,
                    };
                    newInvComm.push(invoicedCommissionItem);
                }
            }

            const groupedByInstallment = reduceGroupBy(newInvComm, [
                'dueDate',
                'postingDate',
                'objectCode',
                'finalCommRate',
                'insuranceYear',
            ], 'lines');

            for (const installment of groupedByInstallment) {
                const amount = installment.lines.reduce((a, b) => a + b.baseAmount, 0);
                const totalCommAmount = round(amount * installment.finalCommRate, 2);
                const proportions = installment.lines.map(_ => _.baseAmount);
                const commAmounts = getDistribution(proportions, totalCommAmount);

                for (let i = 0; i < installment.lines.length; i++) {
                    const invoicedCommission = installment.lines[i];
                    const commAmount = commAmounts[i];

                    invoicedCommission.calcCommAmount = commAmount;
                }
            }
        }
        const deltaInvComm = calculateInvoicedCommissionDelta(oldInvComm, newInvComm, pp);
        const filteredDeltaInvComm = filterInvoicedCommissionItems(deltaInvComm, contract.repostFromDate, contract.repostFromBegining);

        const isCancellationTransaction = input.premiumEvent === 'cancellation' && polInfo.startDate !== polInfo.amendmentValidFrom;
        const cancellationPostDate = input.premiumEvent === 'cancellation' ? polInfo.amendmentValidFrom : undefined;
        for (const ici of filteredDeltaInvComm) {
            ici.amendmentNumber = polInfo.amendmentNumber;
            ici.isCancellationTransaction = isCancellationTransaction;
            ici.cancellationPostDate = cancellationPostDate;
        }

        newInvoicedCommission.push(...filteredDeltaInvComm);
    }

    newInvoicedCommission.sort((a, b) => {
        let c;
        c = dateTimeUtils.compareDates(a.dueDate, b.dueDate);
        if (c) { return c; }
        c = compareStrings(a.itemNo, b.itemNo);
        return c;
    });

    sinkExchange.mapContext('invoicedItems', newInvoicedCommission);
    const invoicedCommissionTables = buildInvoicedCommissionSink(newInvoicedCommission, invoicedCommissionTypeIds.REGULAR);
    return invoicedCommissionTables;
};

function compareStrings(strA, strB) {
    if (strA < strB) {
        return -1;
    }
    if (strA > strB) {
        return 1;
    }
    return 0;
}

function filterInvoicedCommissionItems(invoicedCommissionItems, repostFromDate, repostFromBegining) {
    let result = invoicedCommissionItems.filter(_ => _.calcCommAmount !== 0);

    if (!repostFromDate && !repostFromBegining) {
        throw 'repostFromDate or repostFromBegining must be set';
    }

    if (repostFromDate) {
        result = result.filter(_ => _.postingDate >= repostFromDate);
    }

    return result;
}

function calculateInvoicedCommissionDelta(oldInvoicedItems, newInvoicedItems, paymentPlan) {
    const oldNegative = (oldInvoicedItems ?? []).map(_ => ({
        ..._,
        baseAmount: -_.baseAmount,
        calcCommAmount: -_.calcCommAmount,
    }));
    const invoicedCommissions = oldNegative.concat(newInvoicedItems);

    const groupedInvoicedCommissions = reduceGroupBy(invoicedCommissions,
        [
            'contractNumber',
            'dueDate',
            'postingDate',
            'objectCode',
            'itemNo',
            'currencyCode',
            'aaCommRate',
            'docCommRate',
        ], undefined, (p, c) => {
            return {
                baseAmount: round(p.baseAmount + c.baseAmount, 2),
                calcCommAmount: round(p.calcCommAmount + c.calcCommAmount, 2),
            };
        },
        {
            baseAmount: 0,
            calcCommAmount: 0,
        }
    );

    return groupedInvoicedCommissions;
}
