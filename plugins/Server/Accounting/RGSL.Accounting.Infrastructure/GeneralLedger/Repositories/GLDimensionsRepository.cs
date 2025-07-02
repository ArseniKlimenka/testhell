using System.Collections.Generic;
using System.Linq;
using Adacta.AdInsure.Framework.Core.Data.Orm;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.GeneralLedger.Queries;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.GeneralLedger.Repositories
{
    public class GLDimensionsRepository : IDimensionsRepository
    {
        private readonly DatabaseFactory _databaseFactory;

        public GLDimensionsRepository(DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public OfrDTO GetOfr(long glAccountId, bool isPreviousPeriod, int? documentTypeId, string currencyCode)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                var ofr = db.Fetch<OfrDTO>(GLDimensionsQueries.SelectOfrByCriteria(), new { glAccountId, isPreviousPeriod, documentTypeId, currencyCode });
                return ofr.SingleOrDefault();
            }
        }

        public SapGlAccountDTO GetSapGlAccount(long glAccountId, int? ofrId, bool isPreviousPeriod, int? personTypeId, string agentType)
        {
            using var db = _databaseFactory.CreateDatabase();
            var sapGlAccount = db.Fetch<SapGlAccountDTO>(GLDimensionsQueries.SelectSapGlAccountByCriteria(), new { glAccountId, ofrId, isPreviousPeriod, personTypeId, agentType });
            return sapGlAccount.SingleOrDefault();
        }

        public TransactionDefinition GetTransactionDefinition(int transactionTypeId, int documentTypeId, int sign, bool isPreviousPeriod, bool? isLife, string agentType)
        {
            using var db = _databaseFactory.CreateDatabase();

            var definition = db.SingleOrDefault<TransactionDefinition>(GLDimensionsQueries.SelectTransactionDefinition(), new { transactionTypeId, documentTypeId, sign, isPreviousPeriod, isLife, agentType });
            //_ = definition ?? throw new BusinessException($"Transaction definition was not found! ({transactionTypeId}, {documentTypeId}, {sign}, {isPreviousPeriod}, {isLife}, {agentType})");

            return definition;
        }

        public IList<TransactionDefinitionStep> GetTransactionDefinitionSteps(string transactionDefinitionNo)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                var steps = db.Fetch<TransactionDefinitionStep>(GLDimensionsQueries.SelectTransactionDefinitionStep(), new { transactionDefinitionNo });
                return steps;
            }
        }

        public SapGlAccountDTO GetSapGlAccountById(int sapGlAccountId)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                var sapGlAccount = db.Fetch<SapGlAccountDTO>(GLDimensionsQueries.SelectSapGlAccountById(), new { sapGlAccountId });
                return sapGlAccount.SingleOrDefault();
            }
        }

        public TransactionTypeDTO GetTransactionTypeById(int transactionTypeId)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                var transactionType = db.Fetch<TransactionTypeDTO>(GLDimensionsQueries.SelectTransactionTypeById(), new { transactionTypeId });
                return transactionType.SingleOrDefault();
            }
        }

        public string GetCurrencyIsoCodeByCurrencyCode(string currencyCode)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                string currencyIsoCode = db.ExecuteScalar<string>(GLDimensionsQueries.SelectCurrencyIsoCodeByCurrencyCode(), new { currencyCode });
                return currencyIsoCode;
            }
        }

        public IList<PolicyHolderDimensionsDTO> GetPolicyHolderDimensions(IList<string> contractNumbers)
        {
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PolicyHolderDimensionsDTO>(GLDimensionsQueries.SelectPolicyHolderDimensionsList(), new { contractNumbers });
        }

        public IList<PaymentDimensionsDTO> GetPaymentDimensions(IList<long> bsiIds)
        {
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PaymentDimensionsDTO>(GLDimensionsQueries.SelectPaymentDimensionsList(), new { bsiIds });
        }

        public IList<ServiceProviderDimensions> GetServiceProviderDimensions(IList<string> serviceProviderCodes)
        {
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<ServiceProviderDimensions>(GLDimensionsQueries.SelectServiceProviderDimensions(), new { serviceProviderCodes });
        }

        public IList<AADataDTO> GetAADataByContract(IList<string> contractNumbers)
        {
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<AADataDTO>(GLDimensionsQueries.SelectAADataByContractList(), new { contractNumbers });
        }

        public IList<PartyDimensionsDTO> GetPartyDimensionsList(IList<string> partyCodes)
        {
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PartyDimensionsDTO>(GLDimensionsQueries.SelectPartyDimensionsList(), new { partyCodes });
        }

        public IList<RiskDTO> GetRiskDetailsByRiskCode(IList<string> riskCodes)
        {
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<RiskDTO>(GLDimensionsQueries.SelectBusinessLineByRiskCodeList(), new { riskCodes });
        }

        public ClaimInfoDTO GetClaimInfo(string claimNumber)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                var claim = db.Fetch<ClaimInfoDTO>(GLDimensionsQueries.SelectClaimInfo(), new { claimNumber });
                return claim.Single();
            }
        }

        public EndowmentInfoDTO GetEndowmentInfo(string endowmentNumber)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                var endowment = db.Fetch<EndowmentInfoDTO>(GLDimensionsQueries.SelectEndowmentInfo(), new { endowmentNumber });
                return endowment.Single();
            }
        }

        public string GetMainContractNo(string contractNo)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                string mainContractNo = db.ExecuteScalar<string>(GLDimensionsQueries.SelectMainContractNo(), new { contractNo });
                if (mainContractNo == null) //amendment with this number does not exist, so provided cotnractNo is not amendment. It's main contract.
                {
                    return contractNo;
                }
                else
                {
                    return mainContractNo;
                }
            }
        }
    }
}
