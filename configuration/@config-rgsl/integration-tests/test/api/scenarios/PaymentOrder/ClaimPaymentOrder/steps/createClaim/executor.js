const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const { VersionedDocumentBuilderRgsl } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testBuilderExtension');
const { retryValidate } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testHelperFuncs');
const chai = require('chai');
const expect = chai.expect;
const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

async function executor(step, context, stepContext) {

    const body = stepContext.requests['body'];

    const client = new Client();
    const bankAccounts = await callDataSource('GetPartyBankAccountsOnlyDataSource', {
        paging: undefined,
        criteria: {
            partyCode: context.contractBody.insuredPerson.partyData.partyCode,
            activeOnly: true,
        },
    }, client);

    const bankAccountsFixed = bankAccounts.data.flatMap(_ =>
        _.resultData.map(item => ({
            bankId: item.bankId,
            bankName: item.bankName,
            bankBic: item.bankBic,
            bankCorrespondentAccount: item.bankCorrespondentAccount,
            SWIFT: item.SWIFT,
            IBAN: item.IBAN,
            foreignBank: item.foreignBank,
            currency: item.currency,
            number: item.number,
            openingDate: item.openingDate,
            closingDate: item.closingDate,
            bankInn: item.bankInn,
        }))
    );
    body.claimBeneficiaries[0].bankAccount = bankAccountsFixed[0];

    const claim = await createClaim(body, stepContext.actor);

    context.claimId = claim.id;
    context.claimNumber = claim.number;
    context.claimBody = claim.body;

    const result = await retryValidate(
        async () => callDataSource('PODocumentSearchDataSource', {
            paging: undefined,
            criteria: {
                referenceNumber: claim.number,
                paymentOrderType: paymentOrderType.Claim,
            },
        }, client),
        (result, cntx) => {
            expect(result.data.length, 'PO not found!').to.be.equal(1);
        },
    );

    context.paymentOrder = result.data[0].resultData;
}

async function createClaim(body, actor) {

    const builder = new VersionedDocumentBuilderRgsl('Claim');
    const document = await builder
        .setExample({ body })
        .setActor(actor)
        .create()
        .evaluate(undefined, [
            '[GetPolicyData]',
            '[GetRisksData]',
            '[GetInsuredPerson]',
        ])
        .update(_ => {
            _.claimAmounts.exchangeRate = 1;
            _.claimAmounts.paymentPercentage = 1;
            _.claimAmounts.paymentLines = [
                {
                    lineType: 'mainAmount',
                    lineAmountInContractCurrency: 100000,
                    lineAmountInRubCurrency: 100000
                }
            ];
            _.claimAmounts.rznu = 100000;
            _.claimAmounts.requestedClaimAmount = 100000;
        })
        .waitActivitiyStatusExtension('ClaimManagerApproval', false)
        .makeTransition('ClaimManagerApprovalToClaimDirectorApproval', 'ClaimDirectorApproval')
        .waitActivitiyStatusExtension('ClaimDirectorApproval', true)
        .makeTransition('ClaimDirectorApprovalToSentToPayment', 'POCreation')
        .build();

    return {
        id: document.id,
        number: document.documentNumber,
        body: document.body,
    };
}

module.exports = {
    executor,
};
