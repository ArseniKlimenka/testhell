// from ACC_IMPL.TRANSACTION_TYPE
const transactionTypeId = {
    InsurancePremiumIncrease: 1,
    InvoicedComission: 2,
    ComissionAct: 3,
    PaymentAllocation: 4,
    PaymentOrder: 5,
    Revaluation: 6,
    RSD: 7,
};

// from ACC_IMPL.CT_PERSON_TYPE
const personTypeId = {
    NaturalPerson: 1,
    LegalEntity: 2,

    getPersonTypeId: function (partyTypeName) {
        switch (partyTypeName) {
            case 'NaturalPerson':
                return this.NaturalPerson;
            case 'LegalEntity':
                return this.LegalEntity;
            default:
                return null;
        }
    }
};

const providerConstants = {
    PARTNER: "Partner",
    EMPLOYEE: "Employee",
    REINSURER: "Reinsurer",
};

module.exports = {
    providerConstants,
    transactionTypeId,
    personTypeId
};
