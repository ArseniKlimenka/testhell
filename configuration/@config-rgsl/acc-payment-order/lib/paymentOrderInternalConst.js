const { amendmentPaymentLineType } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

const paymentOrderType = {
    PaymentRefund: "PaymentRefund",
    Commission: "Commission",
    PolicyCancellation: "PolicyCancellation",
    Claim: "Claim"
};

const paymentOrderSubType = {
    CancellationPIT: "CancellationPIT",
    Endowment: "Endowment",
    EndowmentPIT: "EndowmentPIT",
    Collective: "Collective"
};

const paymentMethod = {
    WireTransfer: "Wire transfer"
};

const bankAccount = {
    defaultPayerBankAccount: {
        bankName: "АО ЮНИКРЕДИТ БАНК",
        BIC: "44525545",
        accountNumber: "40702810300011287480",
        accountCurrency: "RUB"
    }
};

const paymentLineType = {
    PIT: "PIT",
    surrenderValue: "surrenderValue",
    investProfit: "investProfit",
    riskPayment: "riskPayment",
    investProfitSlp: "investProfitSlp",
    creditRefund: "creditRefund",
    marketing: "marketing",
    paymentRefund: "paymentRefund"
};

const paymentLinesForCalculation = [
    paymentLineType.surrenderValue,
    paymentLineType.investProfit,
    paymentLineType.riskPayment,
    paymentLineType.creditRefund
];

const paymentLinesToSelectCancellation = [
    amendmentPaymentLineType.pit,
    amendmentPaymentLineType.surrenderValue,
    amendmentPaymentLineType.investProfit,
    amendmentPaymentLineType.creditRefund,
];

const manualPaymentLinesForCancellation = [
    paymentLineType.surrenderValue,
    paymentLineType.investProfit,
    paymentLineType.creditRefund,
    paymentLineType.PIT,
    paymentLineType.marketing
];

const manualPaymentLinesForCancellationPIT = [
    paymentLineType.PIT
];

const manualPaymentLinesForClaim = [
    paymentLineType.riskPayment,
];

const paymentOrderCancellableStates = [
    "Draft",
    "WaitingForApproval"];

const paymentOrderCancellationTypes = [
    "PolicyCancellation"];

const validationData = {
    minAmountToRequireDeadline: 5000000
};

const partyCodes = {
    PITRecipient: "709"
};

const poTypesHaveDescriptionCode = [
    paymentOrderType.Claim,
    paymentOrderType.PaymentRefund,
    paymentOrderType.PolicyCancellation
];

const paymentDescriptionCode = {
    nonResident: "VO70115",
    nonResidentPaymentRefund: "VO20800"
};

const paumentOrderManualTypes = [
    paymentOrderType.Claim,
    paymentOrderType.PolicyCancellation
];

module.exports = {
    paymentMethod,
    bankAccount,
    paymentLineType,
    paymentLinesToSelectCancellation,
    paymentOrderCancellableStates,
    paymentOrderCancellationTypes,
    paymentOrderSubType,
    validationData,
    paymentLinesForCalculation,
    partyCodes,
    paymentDescriptionCode,
    paymentOrderType,
    poTypesHaveDescriptionCode,
    manualPaymentLinesForCancellation,
    manualPaymentLinesForClaim,
    manualPaymentLinesForCancellationPIT,
    paumentOrderManualTypes
};
