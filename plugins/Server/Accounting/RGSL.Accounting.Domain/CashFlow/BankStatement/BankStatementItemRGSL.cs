using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement
{
    public class BankStatementItemRGSL
    {
        public long? BankStatementItemId { get; set; }
        public string RegistryReferenceNo { get; set; }
        public string AggregatedPaymentRegisterId { get; set; }
        public string ImportDocumentId { get; set; }
        public string BankStatementItemNo { get; set; }
        public int IncomeSourceId { get; set; }
        public BankStatementItemDirectionRGSL Direction { get; set; }
        public string PaymentDescription { get; set; }
        public string OriginalPaymentDescription { get; set; }
        public string CurrencyCode { get; set; }
        public BankStatementItemStatusRGSL StatusId { get; set; }
        public decimal Amount { get; set; }
        public decimal OpenAmount { get; set; }
        public bool HasRefunds { get; set; }
        public DateTime PaymentDate { get; set; }
        /// <summary>
        /// Date in UTC format
        /// </summary>
        public DateTime CreateDate { get; set; }
        public DateTime TransactionDate { get; set; }
        public bool IsRegistry { get; set; }
        public bool IsAcquiring { get; set; }
        public bool NonAcceptance { get; set; }
        public BankStatementItemToleranceType ToleranceType { get; set; }
        public string DebtorName { get; set; }
        public string DebtorType { get; set; }
        public string DebtorBankAccountNo { get; set; }
        public string CreditorName { get; set; }
        public string CreditorType { get; set; }
        public string CreditorBankAccountNo { get; set; }
        public string Segment { get; set; }
        public BankStatementItemPaymentSourceIdRGSL PaymentSourceId { get; set; }
        public bool IsMigrated { get; set; }
        public bool Fake { get; set; }
        public Guid? RgslGuid { get; set; }
        public BankStatementItemDocumentTypeIdRGSL? RgslDocumentTypeId { get; set; }
        public DateTime? RgslDocumentDate { get; set; }
        public bool ReloadRequired { get; set; }

        /// <summary>
        /// Make memberwise clone
        /// </summary>
        public BankStatementItemRGSL Clone()
        {
            var result = (BankStatementItemRGSL) MemberwiseClone();
            return result;
        }
    }
}
