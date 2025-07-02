using System;
using System.Linq;
using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.PAS.API.Contract.Services;
using Adacta.AdInsure.PAS.Domain.Contracts.Models;
using Adacta.AdInsure.PAS.Domain.Contracts.Repositories;
using Adacta.AdInsure.RGSL.PAS.API.Internal.Contracts;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Internal.Contracts
{
    public class ContractTransitionService : IContractTransitionService
    {
        private readonly IContractService _contractService;
        private readonly IContractRepository _contractRepository;

        public ContractTransitionService(IContractService contractService, IContractRepository contractRepository)
        {
            _contractService = contractService;
            _contractRepository = contractRepository;
        }

        public async Task MakeTransition(string contractNo, string transitionName)
        {
            var options = new ImpersonationOptions(SpecialUsersConsts.SystemUserId, RGSL.Common.API.Constants.Actor.System);

            using (var impersonation = new ApplicationContextImpersonation(options))
            {
                var contract = _contractRepository.GetByNumber(contractNo);

                if (ShouldSkipTransition(contract, transitionName))
                {
                    return;
                }

                await _contractService.MakeTransitionAsync(
                    contract.ConfigurationCodeName,
                    contract.ConfigurationVersion,
                    contract.Number,
                    transitionName,
                    true,
                    null
                    );
            }
        }

        private static bool ShouldSkipTransition(Contract contract, string transitionName)
        {
            if (String.IsNullOrEmpty(transitionName))
            {
                return true;
            }
            if (contract.Configuration.DocumentFlowDefinition.Transitions.Single(t => t.Name == transitionName).To.State.Code == contract.State.Code)
            {
                return true;
            }

            return false;
        }

    }
}
