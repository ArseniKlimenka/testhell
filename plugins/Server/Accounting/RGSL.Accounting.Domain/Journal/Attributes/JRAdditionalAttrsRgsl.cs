using Adacta.AdInsure.Accounting.Domain.Attributes;
using Adacta.AdInsure.Accounting.Domain.Journal.Repositories;
using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Attributes
{
    public class JRAdditionalAttrsRgsl: JournalAdditionalAttrs
    {
        private static readonly PropertyInfo<string> TransactionDefinitionNoProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.TransactionDefinitionNo);
        /// <summary>
        /// Contract number
        /// </summary>
        public string TransactionDefinitionNo
        {
            get { return GetValue(TransactionDefinitionNoProperty); }
            set { SetValue(TransactionDefinitionNoProperty, value); }
        }

        private static readonly PropertyInfo<long?> BankStatementItemIdProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.BankStatementItemId);
        /// <summary>
        /// Payment Id reference
        /// </summary>
        public long? BankStatementItemId
        {
            get { return GetValue(BankStatementItemIdProperty); }
            set { SetValue(BankStatementItemIdProperty, value); }
        }

        private static readonly PropertyInfo<long?> CommissionActIdProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.CommissionActId);
        /// <summary>
        /// Commission act id
        /// </summary>
        public long? CommissionActId
        {
            get { return GetValue(CommissionActIdProperty); }
            set { SetValue(CommissionActIdProperty, value); }
        }

        private static readonly PropertyInfo<string> ContractNumberProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.ContractNumber);
        /// <summary>
        /// Contract number
        /// </summary>
        public string ContractNumber
        {
            get { return GetValue(ContractNumberProperty); }
            set { SetValue(ContractNumberProperty, value); }
        }

        private static readonly PropertyInfo<string> DocCurrencyCodeProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.DocCurrencyCode);
        /// <summary>
        /// Document currency code
        /// </summary>
        public string DocCurrencyCode
        {
            get { return GetValue(DocCurrencyCodeProperty); }
            set { SetValue(DocCurrencyCodeProperty, value); }
        }

        private static readonly PropertyInfo<string> PaymentOrderNumberProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.PaymentOrderNumber);
        /// <summary>
        /// Payment order number
        /// </summary>
        public string PaymentOrderNumber
        {
            get { return GetValue(PaymentOrderNumberProperty); }
            set { SetValue(PaymentOrderNumberProperty, value); }
        }

        private static readonly PropertyInfo<bool?> IsAdvancePaymentProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.IsAdvancePayment);
        /// <summary>
        /// Is advanced payment
        /// </summary>
        public bool? IsAdvancePayment
        {
            get { return GetValue(IsAdvancePaymentProperty); }
            set { SetValue(IsAdvancePaymentProperty, value); }
        }

        private static readonly PropertyInfo<int?> BalanceUnitProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.BalanceUnit);
        /// <summary>
        /// Balance unit code (БЕ)
        /// </summary>
        public int? BalanceUnit
        {
            get { return GetValue(BalanceUnitProperty); }
            set { SetValue(BalanceUnitProperty, value); }
        }

        private static readonly PropertyInfo<int?> TransactionCode2Property = RegisterProperty((JRAdditionalAttrsRgsl a) => a.TransactionCode2);
        /// <summary>
        /// Transaction code 2
        /// </summary>
        public int? TransactionCode2
        {
            get { return GetValue(TransactionCode2Property); }
            set { SetValue(TransactionCode2Property, value); }
        }

        private static readonly PropertyInfo<int?> TransactionTypeIdProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.TransactionTypeId);
        /// <summary>
        /// Transaction type ID
        /// </summary>
        public int? TransactionTypeId
        {
            get { return GetValue(TransactionTypeIdProperty); }
            set { SetValue(TransactionTypeIdProperty, value); }
        }

        private static readonly PropertyInfo<int?> OfrIdProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.OfrId);
        /// <summary>
        /// OFR code ID
        /// </summary>
        public int? OfrId
        {
            get { return GetValue(OfrIdProperty); }
            set { SetValue(OfrIdProperty, value); }
        }

        private static readonly PropertyInfo<string> RegisterProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.Register);
        /// <summary>
        /// Register
        /// </summary>
        public string Register
        {
            get { return GetValue(RegisterProperty); }
            set { SetValue(RegisterProperty, value); }
        }

        private static readonly PropertyInfo<int?> TransactionCode1Property = RegisterProperty((JRAdditionalAttrsRgsl a) => a.TransactionCode1);
        /// <summary>
        /// Transaction code 1
        /// </summary>
        public int? TransactionCode1
        {
            get { return GetValue(TransactionCode1Property); }
            set { SetValue(TransactionCode1Property, value); }
        }

        private static readonly PropertyInfo<bool?> IsRevaluationProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.IsRevaluation);
        /// <summary>
        /// Transaction code 1
        /// </summary>
        public bool? IsRevaluation
        {
            get { return GetValue(IsRevaluationProperty); }
            set { SetValue(IsRevaluationProperty, value); }
        }

        private static readonly PropertyInfo<int?> SapGlAccountIdProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.SapGlAccountId);
        /// <summary>
        /// SAP GL Account ID
        /// </summary>
        public int? SapGlAccountId
        {
            get { return GetValue(SapGlAccountIdProperty); }
            set { SetValue(SapGlAccountIdProperty, value); }
        }

        private static readonly PropertyInfo<int?> PersonTypeIdProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.PersonTypeId);
        /// <summary>
        /// SAP GL Account ID
        /// </summary>
        public int? PersonTypeId
        {
            get { return GetValue(PersonTypeIdProperty); }
            set { SetValue(PersonTypeIdProperty, value); }
        }

        private static readonly PropertyInfo<string> AgentTypeProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.AgentType);
        /// <summary>
        /// SAP GL Account ID
        /// </summary>
        public string AgentType
        {
            get { return GetValue(AgentTypeProperty); }
            set { SetValue(AgentTypeProperty, value); }
        }

        private static readonly PropertyInfo<string> CostCenterProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.CostCenter);
        /// <summary>
        /// Cost center (МВЗ)
        /// </summary>
        public string CostCenter
        {
            get { return GetValue(CostCenterProperty); }
            set { SetValue(CostCenterProperty, value); }
        }

        private static readonly PropertyInfo<string> TradingPartnerProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.TradingPartner);
        /// <summary>
        /// Trading partner
        /// </summary>
        public string TradingPartner
        {
            get { return GetValue(TradingPartnerProperty); }
            set { SetValue(TradingPartnerProperty, value); }
        }

        private static readonly PropertyInfo<string> DocumentNoProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.DocumentNo);
        /// <summary>
        /// Document number
        /// </summary>
        public string DocumentNo
        {
            get { return GetValue(DocumentNoProperty); }
            set { SetValue(DocumentNoProperty, value); }
        }

        private static readonly PropertyInfo<string> AAOrderNoProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.AAOrderNo);
        /// <summary>
        /// Agent agreement Order number (from PAS_IMPL.AA_SAT -> ORDER_NUMBER)
        /// </summary>
        public string AAOrderNo
        {
            get { return GetValue(AAOrderNoProperty); }
            set { SetValue(AAOrderNoProperty, value); }
        }

        private static readonly PropertyInfo<string> XRef2Property = RegisterProperty((JRAdditionalAttrsRgsl a) => a.XRef2);
        /// <summary>
        /// GL account + Code OFR
        /// </summary>
        public string XRef2
        {
            get { return GetValue(XRef2Property); }
            set { SetValue(XRef2Property, value); }
        }

        private static readonly PropertyInfo<string> PersonalAccountNumberProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.PersonalAccountNumber);
        /// <summary>
        /// Personal account number
        /// </summary>
        public string PersonalAccountNumber
        {
            get { return GetValue(PersonalAccountNumberProperty); }
            set { SetValue(PersonalAccountNumberProperty, value); }
        }

        private static readonly PropertyInfo<string> BusinessLineProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.BusinessLine);
        /// <summary>
        /// Business Line (from BFX_IMPL.RISKS.BUSINESS_LINE)
        /// </summary>
        public string BusinessLine
        {
            get { return GetValue(BusinessLineProperty); }
            set { SetValue(BusinessLineProperty, value); }
        }

        private static readonly PropertyInfo<string> CedentsCountryProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.CedentsCountry);
        /// <summary>
        /// Cedents country
        /// </summary>
        public string CedentsCountry
        {
            get { return GetValue(CedentsCountryProperty); }
            set { SetValue(CedentsCountryProperty, value); }
        }

        private static readonly PropertyInfo<string> LocalDimension1Property = RegisterProperty((JRAdditionalAttrsRgsl a) => a.LocalDimension1);
        /// <summary>
        /// Local dimension 1
        /// </summary>
        public string LocalDimension1
        {
            get { return GetValue(LocalDimension1Property); }
            set { SetValue(LocalDimension1Property, value); }
        }

        private static readonly PropertyInfo<string> LocalDimension2Property = RegisterProperty((JRAdditionalAttrsRgsl a) => a.LocalDimension2);
        /// <summary>
        /// Local dimension 2
        /// </summary>
        public string LocalDimension2
        {
            get { return GetValue(LocalDimension2Property); }
            set { SetValue(LocalDimension2Property, value); }
        }

        private static readonly PropertyInfo<int?> LocalDimension3IdProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.LocalDimension3Id);
        /// <summary>
        /// Local dimension 3 ID (ID from code table ACC_IMPL.CT_LOCAL_DIMENSION_3)
        /// </summary>
        public int? LocalDimension3Id
        {
            get { return GetValue(LocalDimension3IdProperty); }
            set { SetValue(LocalDimension3IdProperty, value); }
        }

        private static readonly PropertyInfo<string> PartyCodeProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.PartyCode);
        /// <summary>
        /// Party code
        /// </summary>
        public string PartyCode
        {
            get { return GetValue(PartyCodeProperty); }
            set { SetValue(PartyCodeProperty, value); }
        }

        private static readonly PropertyInfo<int?> TransactionDocumentTypeIdProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.TransactionDocumentTypeId);
        /// <summary>
        /// Transaction document type ID (ID from code table ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE)
        /// </summary>
        public int? TransactionDocumentTypeId
        {
            get { return GetValue(TransactionDocumentTypeIdProperty); }
            set { SetValue(TransactionDocumentTypeIdProperty, value); }
        }

        private static readonly PropertyInfo<DateTime?> DateToCheckPrevPeriodProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.DateToCheckPrevPeriod);
        /// <summary>
        /// Date used to check if it's previous period or not.
        /// </summary>
        public DateTime? DateToCheckPrevPeriod
        {
            get { return GetValue(DateToCheckPrevPeriodProperty); }
            set { SetValue(DateToCheckPrevPeriodProperty, value); }
        }

        private static readonly PropertyInfo<string> CancelledDocumentNoProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.CancelledDocumentNo);
        /// <summary>
        /// If it's storno transaction, it has information about original transactions (SourceDocumentNo) that was cancelled by this transaction.
        /// </summary>
        public string CancelledDocumentNo
        {
            get { return GetValue(CancelledDocumentNoProperty); }
            set { SetValue(CancelledDocumentNoProperty, value); }
        }

        private static readonly PropertyInfo<decimal?> CommissionRateProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.CommissionRate);
        /// <summary>
        /// Commission rate (for commission transactions)
        /// </summary>
        public decimal? CommissionRate
        {
            get { return GetValue(CommissionRateProperty); }
            set { SetValue(CommissionRateProperty, value); }
        }

        private static readonly PropertyInfo<decimal?> ExchangeRateProperty = RegisterProperty((JRAdditionalAttrsRgsl a) => a.ExchangeRate);
        /// <summary>
        /// Manual exchange rate from the policy
        /// </summary>
        public decimal? ExchangeRate
        {
            get { return GetValue(ExchangeRateProperty); }
            set { SetValue(ExchangeRateProperty, value); }
        }

        /// <summary>
        /// Instantiates a new instance of <see cref="JRAdditionalAttrsRgsl"/> with empty values
        /// </summary>
        public JRAdditionalAttrsRgsl()
            : base()
        {
        }

        /// <summary>
        /// Instantiates a new instance of <see cref="JRAdditionalAttrsRgsl"/> with an already defined value dictionary
        /// </summary>
        /// <param name="values">Dictionary with initial attribute values</param>
        public JRAdditionalAttrsRgsl(IDictionary<string, object> values)
            : base(values)
        {
        }

        public override string GetStringRepresentation()
        {
            return string.Join(";", String.Empty,
                IsAdvancePayment,
                BalanceUnit,
                TransactionCode2).TrimEnd(';');
        }

    }
}
