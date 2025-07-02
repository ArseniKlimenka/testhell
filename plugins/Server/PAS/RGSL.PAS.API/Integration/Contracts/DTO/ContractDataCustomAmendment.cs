using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.DTO
{
    public class ContractDataCustomAmendment
    {
        [JsonProperty("contractId")]
        public string ContractId { get; set; }

        [JsonProperty("contractNumber")]
        public string ContractNumber { get; set; }

        [JsonProperty("originalContractNumber")]
        public string OriginalContractNumber { get; set; }

        [JsonProperty("seqNumber")]
        public int SeqNumber { get; set; }

        [JsonProperty("documentType")]
        public string DocumentType { get; set; }

        [JsonProperty("documentStateCode")]
        public string DocumentStateCode { get; set; }

        [JsonProperty("body")]
        public ContractDataCustomAmendmentBody Body { get; set; }

        [JsonProperty("commonBody")]
        public ContractDataCustomAmendmentCommonBody CommonBody { get; set; }
    }

    public class ContractDataCustomAmendmentBody
    {
        [JsonProperty("policyTerms")]
        public ContractDataCustomAmendmentPolicyTerms PolicyTerms { get; set; }

        [JsonProperty("basicConditions")]
        public ContractDataCustomAmendmentBasicConditions BasicConditions { get; set; }

        [JsonProperty("mainInsuranceConditions")]
        public ContractDataCustomAmendmentMainInsuranceConditions MainInsuranceConditions { get; set; }

        [JsonProperty("basicInvestmentParameters")]
        public ContractDataCustomAmendmentBasicInvestmentParameters BasicInvestmentParameters { get; set; }

        [JsonProperty("policyHolder")]
        public ContractDataCustomAmendmentParty PolicyHolder { get; set; }

        [JsonProperty("insuredPerson")]
        public ContractDataCustomAmendmentParty InsuredPerson { get; set; }
    }

    public class ContractDataCustomAmendmentPolicyTerms
    {
        [JsonProperty("startDate")]
        [JsonConverter(typeof(StringConverter<string>))]
        public string StartDate { get; set; }

        [JsonProperty("endDate")]
        [JsonConverter(typeof(StringConverter<string>))]
        public string EndDate { get; set; }
    }

    public class ContractDataCustomAmendmentBasicConditions
    {
        [JsonProperty("insuranceTerms")]
        public int InsuranceTerms { get; set; }

        [JsonProperty("currency")]
        public ContractDataCustomAmendmentCurrency Currency { get; set; }

        [JsonProperty("paymentFrequency")]
        public ContractDataCustomAmendmentPaymentFrequency PaymentFrequency { get; set; }
    }

    public class ContractDataCustomAmendmentCurrency
    {
        [JsonProperty("currencyCode")]
        public string CurrencyCode { get; set; }
    }

    public class ContractDataCustomAmendmentPaymentFrequency
    {
        [JsonProperty("paymentFrequencyDescription")]
        public string PaymentFrequencyDescription { get; set; }
    }
    
    public class ContractDataCustomAmendmentMainInsuranceConditions
    {
        [JsonProperty("insuranceProduct")]
        public ContractDataCustomAmendmentInsuranceProduct InsuranceProduct { get; set; }
    }

    public class ContractDataCustomAmendmentBasicInvestmentParameters
    {
        [JsonProperty("investmentStrategy")]
        public ContractDataCustomAmendmentInvestmentStrategy InvestmentStrategy { get; set; }
    }

    public class ContractDataCustomAmendmentInvestmentStrategy
    {
        [JsonProperty("investmentStrategyCode")]
        public string InvestmentStrategyCode { get; set; }

        [JsonProperty("investmentStrategyDescription")]
        public string InvestmentStrategyDescription { get; set; }
    }

    public class ContractDataCustomAmendmentInsuranceProduct
    {
        [JsonProperty("productCode")]
        public string ProductCode { get; set; }

        [JsonProperty("productDescription")]
        public string ProductDescription { get; set; }

        [JsonProperty("productGroup")]
        public string ProductGroup { get; set; }
    }

    public class ContractDataCustomAmendmentPartyData
    {
        [JsonProperty("partyCode")]
        public string PartyCode { get; set; }
    }

    public class ContractDataCustomAmendmentParty
    {
        [JsonProperty("partyData")]
        public ContractDataCustomAmendmentPartyData PartyData { get; set; }
    }

    public class ContractDataCustomAmendmentCommonBody
    {
        [JsonProperty("payment")]
        public ContractDataCustomAmendmentPayment Payment { get; set; }

        [JsonProperty("paymentPlan")]
        public ContractDataCustomAmendmentPaymentPlan PaymentPlan { get; set; }
    }

    public class ContractDataCustomAmendmentPayment
    {
        [JsonProperty("requiredInstallment")]
        public ContractDataCustomAmendmentRequiredInstallment RequiredInstallment { get; set; }
    }

    public class ContractDataCustomAmendmentRequiredInstallment
    {
        [JsonProperty("amount")]
        public decimal Amount { get; set; }
    }

    public class ContractDataCustomAmendmentPaymentPlan
    {
        [JsonProperty("manual")]
        public List<ContractDataCustomAmendmentPaymentPlanManual> Manual { get; set; }
    }

    public class ContractDataCustomAmendmentPaymentPlanManual
    {
        [JsonProperty("dueDate")]
        public DateTime DueDate { get; set; }
    }
}
