using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Responses;
using Adacta.AdInsure.RGSL.PAS.Domain.AgentAgreement.Interfaces;
using Adacta.AdInsure.RGSL.PAS.Domain.AgentAgreement.Repositories;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.PAS.Domain.AgentAgreement.Services
{
    public class AaCommissionService : IAaCommissionService
    {
        private readonly IAaCommissionRepository _repository;

        public AaCommissionService(
            IAaCommissionRepository repository)
        {
            _repository = repository;
        }

        public GetContractResponse GetContracts(GetContractRequest request)
        {
            return _repository.GetContracts(request);
        }

        public async Task<CalculateCommissionResponse> CalculateCommission(CalculateCommissionRequest request)
        {
            _ = request ?? throw new ArgumentNullException(nameof(request));
            if (request.ContractNumbers == null) throw new ArgumentException("request.ContractNumbers is null");
            if (request.ContractNumbers.Count == 0) return new CalculateCommissionResponse { CommissionRules = new List<AaPolicyCommissionRule>() };

            var resultDatas = await _repository.GetCommissionRules(request);
            _ = resultDatas ?? throw new ArgumentException("resultDatas is null");

            var commissionRules = new List<AaPolicyCommissionRule>(resultDatas.Count);

            foreach (var result in resultDatas)
            {
                var resultData = result["resultData"];
                string contractNumber = GetValue<string>(resultData, "contractNumber");
                DateTime dueDate = GetValue<DateTime>(resultData, "dueDate");
                decimal rate = GetValue<decimal>(resultData, "rate", 0);

                decimal expensesRate = GetValue<decimal>(resultData, "expensesRate");
                decimal naturalPersonRate = GetValue<decimal>(resultData, "naturalPersonRate");
                decimal solePropriatorRate = GetValue<decimal>(resultData, "solePropriatorRate");

                var rule = new AaPolicyCommissionRule()
                {
                    ContractNumber = contractNumber,
                    DueDate = dueDate,
                    CommRate = rate,
                    ExpensesRate = expensesRate,
                    NaturalPersonRate = naturalPersonRate,
                    SolePropriatorRate = solePropriatorRate,
                };
                commissionRules.Add(rule);
            }

            return new CalculateCommissionResponse { CommissionRules = commissionRules.AsReadOnly() }; 
        }

        private static T GetValue<T>(JToken resultData, string parameterName)
        {
            var p = resultData[parameterName];
            _ = p ?? throw new NullReferenceException($"Parameter {parameterName} not found!");

            return p.ToObject<T>();
        }

        private static T GetValue<T>(JToken resultData, string parameterName, T defaultValue)
        {
            var p = resultData[parameterName];
            return p != null ? p.ToObject<T>() : defaultValue;
        }
    }
}
