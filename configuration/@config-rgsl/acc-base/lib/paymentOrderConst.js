const paymentOrderType = {
    PaymentRefund: "PaymentRefund",
    Commission: "Commission",
    PolicyCancellation: "PolicyCancellation",
    Claim: "Claim"
};

const paymentOrderSubType = {
    PIT: "CancellationPIT",
    Endowment: "Endowment",
    EndowmentPIT: "EndowmentPIT",
    Collective: "Collective"
};

const paymentOrderStates = {
    Draft: "Draft",
    WaitingForApproval: "WaitingForApproval",
    Cancelled: "Cancelled",
    Approved: "Approved",
    PaymentError: "PaymentError",
    Paid: "Paid",
    PaidCancelledNetting: "PaidCancelledNetting"
};

const paymentOrderActiveStates = [
    "Approved",
    "Paid",
    "PaidCancelledNetting"];

const paymentLineType = {
    PIT: "PIT",
    surrenderValue: "surrenderValue",
    investProfit: "investProfit",
    investProfitAnnual: "investProfitAnnual",
    investProfitCoupon: "investProfitCoupon",
    riskPayment: "riskPayment",
    creditRefund: "creditRefund",
    marketing: "marketing"
};

const defaultBankAccount = {
    incomeSourceId: 22,
    paymentSourceId: 1
};

module.exports = {
    paymentOrderType,
    paymentOrderActiveStates,
    paymentOrderStates,
    paymentOrderSubType,
    paymentLineType,
    defaultBankAccount
};
