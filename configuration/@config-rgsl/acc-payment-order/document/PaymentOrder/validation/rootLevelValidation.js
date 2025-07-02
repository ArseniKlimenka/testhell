'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const { validationData } = require('@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst');

/**
 * @errorCode {errorCode} deadlineDateIsRequired
 * @errorCode {errorCode} totalNettedAmountTooBig
 * @errorCode {errorCode} nettedAmountIsRequired
 * @errorCode {errorCode} nettedAmountTooBig
 * @errorCode {errorCode} NettedDocumentsShouldBeAdded
 * */
module.exports = function rootLevelValidation(input) {

    const validationErrors = [];

    const type = getValue(input, 'paymentOrderInformation.paymentOrderType');
    const amount = getValue(input, 'paymentOrderAmounts.totalPaymentAmount');
    const deadline = getValue(input, 'paymentOrderInformation.paymentDeadlineDate');

    if (type === paymentOrderType.Commission && amount > validationData.minAmountToRequireDeadline && !deadline) {

        validationErrors.push({
            errorCode: 'deadlineDateIsRequired',
            errorDataPath: '/Body/paymentOrderInformation/paymentDeadlineDate'
        });
    }

    const nettedDocuments = getValue(input, 'paymentOrderNetting.nettedDocuments');

    if (nettedDocuments && nettedDocuments.length > 0) {

        for (let i = 0; i < nettedDocuments.length; i++) {

            const doc = nettedDocuments[i];

            if (!doc.nettedAmountInDocCurrency && !doc.isFutureContract) {

                validationErrors.push({
                    errorCode: 'nettedAmountIsRequired',
                    errorDataPath: `/Body/paymentOrderNetting/nettedDocuments/${i}/nettedAmount`
                });
            }

            if (doc.nettedAmountInDocCurrency > doc.initialOpenAmount) {

                validationErrors.push({
                    errorCode: 'nettedAmountTooBig',
                    errorDataPath: `/Body/paymentOrderNetting/nettedDocuments/${i}/nettedAmount`
                });
            }
        }

        const totalNettedAmount = nettedDocuments.reduce((sum, doc) => sum + doc.nettedAmount, 0);
        const originalTotalAmount = getValue(input, 'paymentOrderAmounts.originalTotalAmount');

        if (totalNettedAmount > originalTotalAmount) {

            validationErrors.push({
                errorCode: 'totalNettedAmountTooBig',
                errorDataPath: `/Body/paymentOrderNetting/nettedDocuments`
            });
        }
    }

    const shouldUseNetting = getValue(input, 'paymentOrderInformation.shouldUseNetting', false);

    if (shouldUseNetting && (!nettedDocuments || nettedDocuments.length === 0)) {

        validationErrors.push({
            errorCode: 'NettedDocumentsShouldBeAdded',
            errorDataPath: '/Body/paymentOrderInformation/shouldUseNetting',
            severity: 'Warning'
        });
    }

    return validationErrors;
};
