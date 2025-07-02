using Adacta.AdInsure.RGSL.Accounting.Domain.Attributes;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Attributes;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Posting
{
    public class GeneralJournalLineRgsl
    {
        /// <summary>
        /// Contract Id - Id of document that is crucial for business transaction while at same time it is not a posting basis.
        /// </summary>
        public string ContractId { get; set; }

        /// <summary>
        /// Contract Number - business number (e.g. insurance policy number, recourse file no.).
        /// </summary>
        public string ContractNumber { get; set; }

        /// <summary>
        /// Identification of line which produce this record
        /// </summary>
        public string SourceLineId { get; set; }

        /// <summary>
        /// Main contract id - will be used to select balance account entries by main contract id since amendments (and sub-policies in group policy) have different contract ids.
        /// </summary>
        public string MainContractId { get; set; }

        /// <summary>
        /// Main contract number - business number.
        /// </summary>
        public string MainContractNo { get; set; }

        /// <summary>
        /// Currency in which all amounts are expressed (with exception of amounts in local currency). Same currency as currency of related journal.
        /// </summary>
        public string CurrencyCode { get; set; }

        /// <summary>
        /// Amount Before Tax (Quantity * (Price Before Tax - Discount))
        /// </summary>
        public decimal AmountBeforeTax { get; set; }

        /// <summary>
        /// Total amount of tax (Quantity * Price Tax)
        /// </summary>
        public decimal TaxAmount { get; set; }

        /// <summary>
        /// Gross amount
        /// </summary>
        public decimal GrossAmount { get; set; }

        /// <summary>
        /// Amount Before Tax in local currency
        /// </summary>
        public decimal AmountBeforeTaxLc { get; set; }

        /// <summary>
        /// Total amount of tax in local currency
        /// </summary>
        public decimal TaxAmountLc { get; set; }

        /// <summary>
        /// Gross amount in local currency
        /// </summary>
        public decimal GrossAmountLc { get; set; }

        /// <summary>
        /// Getter for AttributeValueSet identification - exposes internal object.
        /// Should only be used during insert!
        /// </summary>
        public long? AttributeValueSetId => AttributeValueSet?.Id;

        /// <summary>
        /// Additional attributes
        /// </summary>
        public JRAdditionalAttrsRgsl Attributes { get; set; }

        /// <summary>
        /// Getter for Attribute identification - exposes internal object.
        /// Should only be used during insert!
        /// </summary>
        public long? AttributesId => Attributes?.Id;
        /// <summary>
        /// GL account
        /// Optional attribute
        /// if defined the posting procedure     use this value rather then posting profile
        /// </summary>
        public long? GlAccountId { get; set; }
        /// <summary>
        /// Indicator whether is debit or credit.
        /// </summary>
        public bool IsDebit { get; set; }

        /// <summary>
        /// Attribute set to define attributes for analytics
        /// </summary>
        public long? AdditionalAttrSetId { get; set; }

        public AttributeValueSetRgsl AttributeValueSet { get; set; }
    }
}
