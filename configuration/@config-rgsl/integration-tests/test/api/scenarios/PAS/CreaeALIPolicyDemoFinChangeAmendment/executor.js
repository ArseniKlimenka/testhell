const { VersionedDocumentBuilderRgsl } = require('../../lib/common/testBuilderExtension');
const { parseEtag } = require('../../lib/common/etagLib');

async function executor(step, context, stepContext) {

    const builder = new VersionedDocumentBuilderRgsl('AccumulatedLifeInsurancePolicy');
    const amendment = await builder
        .getDocumentByNumber(context.contractNumber)
        .setActor(stepContext.actor)
        .makeRelation('AccumulatedLifeInsurancePolicyCreateFinancialChangeAmendmentRelation')
        .waitActivitiyStatusExtension('OperationsApproval')
        .setActor(stepContext.actor)
        .update(_ => {
            _.amendmentData = {
                finChangeAmendmentData: {
                    mainAttributes: {
                        amendmentEffectiveDate: context.amendmentEffectiveDate,
                        changeTypes: [
                            'insuredSumAndPaymentEdit',
                        ],
                        amendmentIssueDate: context.amendmentEffectiveDate,
                        acceptDate: context.amendmentEffectiveDate,
                    },
                    technicalData: {},
                    applicationInfo: {
                        applicant: {
                            partyCode: _.policyHolder.partyData.partyCode,
                            partyType: _.policyHolder.partyData.partyType,
                            fullName: _.policyHolder.partyData.partyFullName,
                        },
                        receiveMethod: 'email',
                        applicationDate: context.amendmentEffectiveDate,
                        requestIssueDate: context.amendmentEffectiveDate,
                        registrationDate: context.amendmentEffectiveDate,
                        documentsReceivedDate: context.amendmentEffectiveDate,
                    },
                    amendmentInfo: {
                        approvalRequests: {},
                        approvalConclusions: {},
                    },
                },
            };
            _.basicConditions.riskPremium = context.newPremiumSize;
            for (const risk of _.risks) {
                risk.riskPremium = risk.riskPremium / risk.riskInsuredSum * _.basicConditions.riskPremium;
                risk.riskInsuredSum = _.basicConditions.riskPremium;
            }
        })
        .evaluate(undefined, ['/paymentPlans'])
        .makeTransition('OperationsApproval_to_Activated', 'Activated')
        .build();

    const contractId = parseEtag(amendment.etag).id;

    if (context.amendmentFieldName) {
        context[context.amendmentFieldName] = {
            id: contractId,
            number: amendment.documentNumber,
            body: amendment.body,
        };
    }
}

module.exports = {
    executor,
};
