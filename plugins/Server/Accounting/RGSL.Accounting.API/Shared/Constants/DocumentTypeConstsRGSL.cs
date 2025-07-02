namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants
{
    /// <summary>
    /// Constants for Document Type (ACC.CT_DOCUMENT_TYPE).
    /// </summary>
    public static class DocumentTypeConstsRGSL// : DocumentTypeConsts
    {
        /// <summary>
        /// Sales invoice - premium
        /// </summary>
        public const int SalesInvoicePremium = 1;

        /// <summary>
        /// Bank statement item
        /// </summary>
        public const int BankStatementItem = 2;

        /// <summary>
        /// Tolerance payment
        /// </summary>
        public const int TolerancePayment = 1001;

        /// <summary>
        /// Invoiced commission
        /// </summary>
        public const int InvoicedCommission = 1002;

        /// <summary>
        /// Commission act
        /// </summary>
        public const int CommissionAct = 1003;

        /// <summary>
        /// Claim
        /// </summary>
        public const int Claim = 1004;

        /// <summary>
        /// Payment order with type Claim
        /// </summary>
        public const int PaymentOrderClaim = 1005;

        /// <summary>
        /// Payment order with type Commission
        /// </summary>
        public const int PaymentOrderCommission = 1006;

        /// <summary>
        /// Payment order with type Payment refund
        /// </summary>
        public const int PaymentOrderPaymentRefund = 1007;

        /// <summary>
        /// Payment order with type Policy cancellation
        /// </summary>
        public const int PaymentOrderPolicyCancellation = 1008;

        /// <summary>
        /// Policy cancellation with reason Credit repayment
        /// </summary>
        public const int PolicyCancellationCreditRepayment = 1009;

        /// <summary>
        /// Tolerance - underpayment
        /// </summary>
        public const int ToleranceUnderpayment = 1010;

        /// <summary>
        /// Tolerance - overpayment
        /// </summary>
        public const int ToleranceOverpayment = 1011;

        /// <summary>
        /// Accounts receivable - Advance
        /// </summary>
        public const int AdvancePaymentAllocation = 1012;

        /// <summary>
        /// Accounts receivable - Advance - Posted
        /// </summary>
        public const int AdvancePaymentPosted = 1013;

        /// <summary>
        /// Payment order - Invest profit
        /// </summary>
        public const int PaymentOrderPolicyInvestProfit = 1017;

        /// <summary>
        /// Payment order - Claim (PIT)
        /// </summary>
        public const int PaymentOrderClaimPIT = 1018;

        /// <summary>
        /// Payment order - Policy cancellation (PIT)
        /// </summary>
        public const int PaymentOrderPolicyCancellationPIT = 1019;

        /// <summary>
        /// Payment allocation - netting 1
        /// </summary>
        public const int PaymentAllocationNetting1 = 1020;

        /// <summary>
        /// Payment allocation - netting 2
        /// </summary>
        public const int PaymentAllocationNetting2 = 1021;

        /// <summary>
        /// RSD approved
        /// </summary>
        public const int RsdApproved = 1023;

        /// <summary>
        /// RSD payment allocation
        /// </summary>
        public const int RsdPaymentAllocation = 1024;

        /// <summary>
        /// Payment order allocation
        /// </summary>
        public const int PaymentOrderAllocation = 1027;

        /// <summary>
        /// Payment allocation
        /// </summary>
        public const int PaymentAllocation = 1028;

        /// <summary>
        /// Payment order allocation. Refund fix 48029 -> 48028
        /// </summary>
        public const int PaymentOrderRefundFix = 1029;
    }
}
