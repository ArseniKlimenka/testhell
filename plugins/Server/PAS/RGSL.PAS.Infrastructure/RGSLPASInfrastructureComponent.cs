using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.PAS.Domain.Contracts.Repositories;
using Adacta.AdInsure.RGSL.PAS.Domain.AgentAgreement.Repositories;
using Adacta.AdInsure.RGSL.PAS.Domain.Commission.Repositories;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.Repositories;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SendEvent.Repositories;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.Repositories;
using Adacta.AdInsure.RGSL.PAS.Infrastructure.AgentAgreement.Repositories;
using Adacta.AdInsure.RGSL.PAS.Infrastructure.Commission.Repositories;
using Adacta.AdInsure.RGSL.PAS.Infrastructure.Contract.Repositories;
using Adacta.AdInsure.RGSL.PAS.Infrastructure.InvestmentProfit.Repositories;
using Adacta.AdInsure.RGSL.PAS.Infrastructure.SendEvent.Repositories;

namespace Adacta.AdInsure.PAS.Infrastructure
{
    public class RGSLPASInfrastructureComponent : IocComponent
    {
        public override void Configure()
        {
            BindRepositories();
        }

        private void BindRepositories()
        {
            Bind<IAaCommissionRepository>().To<AaCommissionRepository>().InSingletonScope();
            Bind<IPolicyCommissionRepository>().To<PolicyCommissionRepository>().InSingletonScope();
            Bind<IContractRepositoryRGSL>().To<ContractRepositoryRGSL>().InSingletonScope();
            Bind<ISendEventRepository>().To<SendEventRepository>().InSingletonScope();
            Bind<ICollectiveContractRepository>().To<CollectiveContractRepository>().InSingletonScope();
            Bind<IInvestmentProfitRepository>().To<InvestmentProfitRepository>().InSingletonScope();
            Rebind<IContractRepository>().To<ContractRepositoryCoreRGSL>().InSingletonScope();
        }
    }
}