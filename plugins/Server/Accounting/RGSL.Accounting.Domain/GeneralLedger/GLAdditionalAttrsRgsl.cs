using System;
using System.Collections.Generic;
using Adacta.AdInsure.Accounting.Domain.Attributes;
using Adacta.AdInsure.Accounting.Domain.GeneralLedger;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger
{
    public class GLAdditionalAttrsRgsl : LedgerAdditionalAttrs
    {
        private static readonly PropertyInfo<DateTime> ProposedPostingDateProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.ProposedPostDate);
        /// <summary>
        /// Date used to check if it's previous period or not.
        /// </summary>
        public DateTime ProposedPostDate
        {
            get { return GetValue(ProposedPostingDateProperty); }
            set { SetValue(ProposedPostingDateProperty, value); }
        }

        private static readonly PropertyInfo<string> TransactionDefinitionNoProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.TransactionDefinitionNo);
        /// <summary>
        /// Transaction definition no
        /// </summary>
        public string TransactionDefinitionNo
        {
            get { return GetValue(TransactionDefinitionNoProperty); }
            set { SetValue(TransactionDefinitionNoProperty, value); }
        }

        private static readonly PropertyInfo<long?> BankStatementItemIdProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.BankStatementItemId);
        /// <summary>
        /// Payment Id reference
        /// </summary>
        public long? BankStatementItemId
        {
            get { return GetValue(BankStatementItemIdProperty); }
            set { SetValue(BankStatementItemIdProperty, value); }
        }

        private static readonly PropertyInfo<long?> CommissionActIdProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.CommissionActId);
        /// <summary>
        /// Commission act id
        /// </summary>
        public long? CommissionActId
        {
            get { return GetValue(CommissionActIdProperty); }
            set { SetValue(CommissionActIdProperty, value); }
        }

        private static readonly PropertyInfo<string> ContractNumberProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.ContractNumber);
        /// <summary>
        /// Contract number
        /// </summary>
        public string ContractNumber
        {
            get { return GetValue(ContractNumberProperty); }
            set { SetValue(ContractNumberProperty, value); }
        }

        private static readonly PropertyInfo<string> PaymentOrderNumberProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.PaymentOrderNumber);
        /// <summary>
        /// Payment order number
        /// </summary>
        public string PaymentOrderNumber
        {
            get { return GetValue(PaymentOrderNumberProperty); }
            set { SetValue(PaymentOrderNumberProperty, value); }
        }

        private static readonly PropertyInfo<int?> BalanceUnitProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.BalanceUnit);
        /// <summary>
        /// Balance unit code (БЕ)
        /// </summary>
        public int? BalanceUnit
        {
            get { return GetValue(BalanceUnitProperty); }
            set { SetValue(BalanceUnitProperty, value); }
        }

        private static readonly PropertyInfo<int?> TransactionCode2Property = RegisterProperty((GLAdditionalAttrsRgsl a) => a.TransactionCode2);
        /// <summary>
        /// Transaction code 2
        /// </summary>
        public int? TransactionCode2
        {
            get { return GetValue(TransactionCode2Property); }
            set { SetValue(TransactionCode2Property, value); }
        }

        private static readonly PropertyInfo<int?> TransactionTypeIdProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.TransactionTypeId);
        /// <summary>
        /// Transaction type ID
        /// </summary>
        public int? TransactionTypeId
        {
            get { return GetValue(TransactionTypeIdProperty); }
            set { SetValue(TransactionTypeIdProperty, value); }
        }

        private static readonly PropertyInfo<int?> OfrIdProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.OfrId);
        /// <summary>
        /// OFR code ID
        /// </summary>
        public int? OfrId
        {
            get { return GetValue(OfrIdProperty); }
            set { SetValue(OfrIdProperty, value); }
        }

        private static readonly PropertyInfo<string> RegisterProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.Register);
        /// <summary>
        /// Register
        /// </summary>
        public string Register
        {
            get { return GetValue(RegisterProperty); }
            set { SetValue(RegisterProperty, value); }
        }

        private static readonly PropertyInfo<int?> TransactionCode1Property = RegisterProperty((GLAdditionalAttrsRgsl a) => a.TransactionCode1);
        /// <summary>
        /// Transaction code 1
        /// </summary>
        public int? TransactionCode1
        {
            get { return GetValue(TransactionCode1Property); }
            set { SetValue(TransactionCode1Property, value); }
        }

        private static readonly PropertyInfo<int?> SapGlAccountIdProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.SapGlAccountId);
        /// <summary>
        /// SAP GL Account ID
        /// </summary>
        public int? SapGlAccountId
        {
            get { return GetValue(SapGlAccountIdProperty); }
            set { SetValue(SapGlAccountIdProperty, value); }
        }

        private static readonly PropertyInfo<string> CostCenterProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.CostCenter);
        /// <summary>
        /// Cost center (МВЗ)
        /// </summary>
        public string CostCenter
        {
            get { return GetValue(CostCenterProperty); }
            set { SetValue(CostCenterProperty, value); }
        }

        private static readonly PropertyInfo<string> TradingPartnerProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.TradingPartner);
        /// <summary>
        /// Trading partner
        /// </summary>
        public string TradingPartner
        {
            get { return GetValue(TradingPartnerProperty); }
            set { SetValue(TradingPartnerProperty, value); }
        }

        private static readonly PropertyInfo<string> DocumentNoProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.DocumentNo);
        /// <summary>
        /// Document number
        /// </summary>
        public string DocumentNo
        {
            get { return GetValue(DocumentNoProperty); }
            set { SetValue(DocumentNoProperty, value); }
        }

        private static readonly PropertyInfo<string> AAOrderNoProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.AAOrderNo);
        /// <summary>
        /// Agent agreement Order number (from PAS_IMPL.AA_SAT -> ORDER_NUMBER
        /// </summary>
        public string AAOrderNo
        {
            get { return GetValue(AAOrderNoProperty); }
            set { SetValue(AAOrderNoProperty, value); }
        }

        private static readonly PropertyInfo<string> XRef2Property = RegisterProperty((GLAdditionalAttrsRgsl a) => a.XRef2);
        /// <summary>
        /// Agent agreement Order number (from PAS_IMPL.AA_SAT -> ORDER_NUMBER
        /// </summary>
        public string XRef2
        {
            get { return GetValue(XRef2Property); }
            set { SetValue(XRef2Property, value); }
        }

        private static readonly PropertyInfo<string> PersonalAccountNumberProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.PersonalAccountNumber);
        /// <summary>
        /// Personal account number
        /// </summary>
        public string PersonalAccountNumber
        {
            get { return GetValue(PersonalAccountNumberProperty); }
            set { SetValue(PersonalAccountNumberProperty, value); }
        }

        private static readonly PropertyInfo<string> BusinessLineProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.BusinessLine);
        /// <summary>
        /// Business Line (from BFX_IMPL.RISKS.BUSINESS_LINE)
        /// </summary>
        public string BusinessLine
        {
            get { return GetValue(BusinessLineProperty); }
            set { SetValue(BusinessLineProperty, value); }
        }

        private static readonly PropertyInfo<string> CedentsCountryProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.CedentsCountry);
        /// <summary>
        /// Cedents country
        /// </summary>
        public string CedentsCountry
        {
            get { return GetValue(CedentsCountryProperty); }
            set { SetValue(CedentsCountryProperty, value); }
        }

        private static readonly PropertyInfo<string> LocalDimension1Property = RegisterProperty((GLAdditionalAttrsRgsl a) => a.LocalDimension1);
        /// <summary>
        /// Local dimension 1
        /// </summary>
        public string LocalDimension1
        {
            get { return GetValue(LocalDimension1Property); }
            set { SetValue(LocalDimension1Property, value); }
        }

        private static readonly PropertyInfo<string> LocalDimension2Property = RegisterProperty((GLAdditionalAttrsRgsl a) => a.LocalDimension2);
        /// <summary>
        /// Local dimension 2
        /// </summary>
        public string LocalDimension2
        {
            get { return GetValue(LocalDimension2Property); }
            set { SetValue(LocalDimension2Property, value); }
        }

        private static readonly PropertyInfo<int?> LocalDimension3IdProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.LocalDimension3Id);
        /// <summary>
        /// Local dimension 3 ID (ID from code table ACC_IMPL.CT_LOCAL_DIMENSION_3)
        /// </summary>
        public int? LocalDimension3Id
        {
            get { return GetValue(LocalDimension3IdProperty); }
            set { SetValue(LocalDimension3IdProperty, value); }
        }

        private static readonly PropertyInfo<string> PartyCodeProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.PartyCode);
        /// <summary>
        /// Party code
        /// </summary>
        public string PartyCode
        {
            get { return GetValue(PartyCodeProperty); }
            set { SetValue(PartyCodeProperty, value); }
        }

        private static readonly PropertyInfo<int?> TransactionDocumentTypeIdProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.TransactionDocumentTypeId);
        /// <summary>
        /// Transaction document type ID (ID from code table ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE)
        /// </summary>
        public int? TransactionDocumentTypeId
        {
            get { return GetValue(TransactionDocumentTypeIdProperty); }
            set { SetValue(TransactionDocumentTypeIdProperty, value); }
        }

        private static readonly PropertyInfo<DateTime?> DateToCheckPrevPeriodProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.DateToCheckPrevPeriod);
        /// <summary>
        /// Date used to check if it's previous period or not.
        /// </summary>
        public DateTime? DateToCheckPrevPeriod
        {
            get { return GetValue(DateToCheckPrevPeriodProperty); }
            set { SetValue(DateToCheckPrevPeriodProperty, value); }
        }

        private static readonly PropertyInfo<string> CancelledDocumentNoProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.CancelledDocumentNo);
        /// <summary>
        /// If it's storno transaction, it has information about original transactions (SourceDocumentNo) that was cancelled by this transaction.
        /// </summary>
        public string CancelledDocumentNo
        {
            get { return GetValue(CancelledDocumentNoProperty); }
            set { SetValue(CancelledDocumentNoProperty, value); }
        }

        private static readonly PropertyInfo<decimal?> CommissionRateProperty = RegisterProperty((GLAdditionalAttrsRgsl a) => a.CommissionRate);
        /// <summary>
        /// Commission rate (for commission transactions)
        /// </summary>
        public decimal? CommissionRate
        {
            get { return GetValue(CommissionRateProperty); }
            set { SetValue(CommissionRateProperty, value); }
        }

        /// <summary>
        /// Instantiates a new instance of <see cref="GLAdditionalAttrsRgsl"/> with empty values
        /// </summary>
        public GLAdditionalAttrsRgsl()
            : base()
        {
        }

        /// <summary>
        /// Instantiates a new instance of <see cref="GLAdditionalAttrsRgsl"/> with an already defined value dictionary
        /// </summary>
        /// <param name="values">Dictionary with initial attribute values</param>
        public GLAdditionalAttrsRgsl(IDictionary<string, object> values)
            : base(values)
        {
        }

        public override string GetStringRepresentation()
        {
            return string.Join(";", string.Empty,
                BalanceUnit,
                TransactionCode2
                ).TrimEnd(';');
        }
    }
}
