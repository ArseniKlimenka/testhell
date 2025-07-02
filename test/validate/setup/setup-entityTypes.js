exports.entityTypes = {
    'Claim': {
        commonSchemaPath: 'claims/schema/common-claim-schema.json',
        evaluate: '@adinsure/claims/lib/evaluate'
    },
    'ClaimCalculation': {
        commonSchemaPath: 'claim-calculations/schema/common-claim-calculation-schema.json',
        evaluate: '@adinsure/claim-calculations/lib/evaluate'
    },
    'ClaimEvent': {
        commonSchemaPath: 'claim-events/schema/common-claim-event-schema.json',
        evaluate: '@adinsure/claim-events/lib/evaluate'
    },
    'ClaimInspection': {
        commonSchemaPath: 'claim-inspections/schema/common-claim-inspection-schema.json',
        evaluate: '@adinsure/claim-inspections/lib/evaluate'
    },
    'Complaint': {
        commonSchemaPath: 'complaints/schema/common-complaint-schema.json',
        evaluate: '@adinsure/complaints/lib/evaluate'
    },
    'Consent': {
        commonSchemaPath: 'consents/schema/common-consent.data-schema.json',
        evaluate: '@adinsure/consents/lib/evaluate'
    },
    'Contract': {
        commonSchemaPath: 'contracts/schema/common-contract-schema.json',
        evaluate: '@adinsure/contracts/lib/evaluate'
    },
    'ImportDocument': {
        commonSchemaPath: 'platform-framework/schema/common-import-document-schema.json',
        evaluate: '@adinsure/platform-framework/lib/config/documents'
    },
    'LegalProcedure': {
        commonSchemaPath: 'legal-procedures/schema/common-legal-procedure-schema.json',
        evaluate: '@adinsure/legal-procedures/lib/evaluate'
    },
    'NettingProposal': {
        commonSchemaPath: 'acc-netting-proposal/schema/common-netting-proposal-schema.json',
        evaluate: '@adinsure/acc-netting-proposal/lib/evaluate'
    },
    'Party': {
        commonSchemaPath: 'parties/schema/common-party.data-schema.json',
        evaluate: '@adinsure/parties/lib/evaluate'
    },
    'PaymentOrder': {
        commonSchemaPath: 'acc-payment-order/schema/common-payment-order-schema.json',
        evaluate: '@adinsure/acc-payment-order/lib/evaluate'
    },
    'PeriodClosing': {
        commonSchemaPath: 'acc-period-closing/schema/common-period-closing-schema.json',
        evaluate: '@adinsure/acc-period-closing/lib/evaluate'
    },
    'Recovery': {
        commonSchemaPath: 'recoveries/schema/common-recovery-schema.json',
        evaluate: '@adinsure/recoveries/lib/evaluate'
    },
    'ServiceClaimRefund': {
        commonSchemaPath: 'service-claim-refunds/schema/common-service-claim-refund-schema.json',
        evaluate: '@adinsure/service-claim-refunds/lib/evaluate'
    },
    'ServicePolicy': {
        commonSchemaPath: 'service-policies/schema/common-service-policy-schema.json',
        evaluate: '@adinsure/service-policies/lib/evaluate'
    },
    'ServiceProvider': {
        commonSchemaPath: 'organisation/schema/common-service-provider.data-schema.json',
        evaluate: '@adinsure/platform-framework/lib/config/master-entities'
    },
    'UniversalDocument': {
        commonSchemaPath: undefined,
        evaluate: '@adinsure/platform-framework/lib/config/documents'
    },
    'WorkCalendar': {
        commonSchemaPath: 'organisation/schema/common-work-calendar-schema.json',
        evaluate: '@adinsure/organisation/lib/work-calendars'
    }
};