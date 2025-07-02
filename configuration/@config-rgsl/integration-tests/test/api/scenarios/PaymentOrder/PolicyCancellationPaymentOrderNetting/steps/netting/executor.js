const { VersionedDocumentBuilderRgsl } = require('../../../../lib/common/testBuilderExtension');

async function executor(step, context, stepContext) {

    const builder = new VersionedDocumentBuilderRgsl('PaymentOrder');

    const contract = await builder
        .getDocumentByNumber(context.paymentOrderMain.paymentOrderNumber)
        .setActor(stepContext.actor)
        .update(_ => {
            const nettingAmount = 60000;
            _.paymentOrderAmounts.totalPaymentAmount = 40000;
            _.paymentOrderNetting = {
                nettedDocuments: [
                    {
                        documentNumber: context.contract2.number,
                        initialOpenAmount: 60000,
                        documentCurrency: 'RUB',
                        exchangeRate: 1,
                        nettedAmount: nettingAmount,
                        nettedAmountInDocCurrency: nettingAmount,
                    }
                ],
                totalNettingAmount: nettingAmount,
            };
        })
        .build();

    context.paymentOrder = contract.body;
}

module.exports = {
    executor,
};
