using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Repositories
{
    public interface IDimensionsRepository
    {
        /// <summary>
        /// Get OFR ID from database rule table based on provided criteria.
        /// </summary>
        /// <param name="glAccountId"></param>
        /// <param name="isPreviousPeriod"></param>
        /// <param name="documentTypeId"></param>
        /// <returns></returns>
        OfrDTO GetOfr(long glAccountId, bool isPreviousPeriod, int? documentTypeId, string currencyCode);

        /// <summary>
        /// Get SAP GL Account ID from database rule table based on provided criteria
        /// </summary>
        SapGlAccountDTO GetSapGlAccount(long glAccountId, int? ofrId, bool isPreviousPeriod, int? personTypeId, string agentType);

        TransactionDefinition GetTransactionDefinition(int transactionTypeId, int documentTypeId, int sign, bool isPreviousPeriod, bool? isLife, string agentType);

        IList<TransactionDefinitionStep> GetTransactionDefinitionSteps(string transactionDefinitionNo);

        /// <summary>
        /// Get SAP GL Account DTO by provided ID
        /// </summary>
        /// <param name="sapGlAccountId"></param>
        /// <returns></returns>
        SapGlAccountDTO GetSapGlAccountById(int sapGlAccountId);

        /// <summary>
        /// Get transaction type and related properties (Local Dimension 3, Transaction document type)
        /// </summary>
        /// <param name="transactionTypeId"></param>
        /// <returns></returns>
        TransactionTypeDTO GetTransactionTypeById(int transactionTypeId);

        /// <summary>
        /// Get currency ISO Code by currency code
        /// </summary>
        /// <param name="currencyCode"></param>
        /// <returns></returns>
        string GetCurrencyIsoCodeByCurrencyCode(string currencyCode);

        /// <summary>
        /// Get policy holder dimensions for subledger
        /// </summary>
        IList<PolicyHolderDimensionsDTO> GetPolicyHolderDimensions(IList<string> contractNumbers);

        IList<PaymentDimensionsDTO> GetPaymentDimensions(IList<long> bsiIds);

        /// <summary>
        /// Get service provider dimensions for subledger
        /// </summary>
        IList<ServiceProviderDimensions> GetServiceProviderDimensions(IList<string> serviceProviderCodes);

        /// <summary>
        /// Get Agent agreement data by contract number
        /// </summary>
        IList<AADataDTO> GetAADataByContract(IList<string> contractNumbers);

        /// <summary>
        /// Get Party dimensions for provided party code .
        /// </summary>
        IList<PartyDimensionsDTO> GetPartyDimensionsList(IList<string> partyCodes);

        /// <summary>
        /// Get businessLine for provided risk code
        /// </summary>
        IList<RiskDTO> GetRiskDetailsByRiskCode(IList<string> riskCodes);

        /// <summary>
        /// Get basic claim info needed for transaction dimensions.
        /// </summary>
        ClaimInfoDTO GetClaimInfo(string claimNumber);

        /// <summary>
        /// Get basic endowment info needed for transaction dimensions.
        /// </summary>
        EndowmentInfoDTO GetEndowmentInfo(string endowmentNumber);

        /// <summary>
        /// Gets main contract number based on provided contract number (amendment)
        /// </summary>
        /// <param name="contractNo"></param>
        /// <returns></returns>
        string GetMainContractNo(string contractNo);
    }
}
