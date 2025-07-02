using Adacta.AdInsure.Framework.Core.AutoMapperConfiguration;
using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.PAS.API.Contract.Services;
using Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.Services;
using Adacta.AdInsure.RGSL.PAS.API.Integration.SAP.Services;
using Adacta.AdInsure.RGSL.PAS.API.Integration.SendEvent.Services;
using Adacta.AdInsure.RGSL.PAS.API.Internal.Contracts;
using Adacta.AdInsure.RGSL.PAS.API.Shared.AgentAgreement.Services;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Commission.Services;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Services;
using Adacta.AdInsure.RGSL.PAS.API.Shared.DigitalSignature.Services;
using Adacta.AdInsure.RGSL.PAS.API.Shared.InvestmentProfit.Services;
using Adacta.AdInsure.RGSL.PAS.API.Shared.NumberGenerator.Services;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Integration.Contracts.Services;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Integration.SAP.Services;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Integration.SendEvent.Converters;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Integration.SendEvent.Services;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Internal.Contracts;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.AgentAgreement.Services;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.Commission.Services;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.Contract;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.Contract.Converters;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.DigitalSignature.Services;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.InvestmentProfit.Converters;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.InvestmentProfit.Services;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.NumberGenerator.Services;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices
{
    public class RGSLPasApplicationServiceComponent : IocComponent
    {
        /// <summary>
        /// Configure bindings.
        /// </summary>
        public override void Configure()
        {
            Bind<IAaCommissionAppService>().To<AaCommissionAppService>().InSingletonScope();
            Bind<IContractTransitionService>().To<ContractTransitionService>().InSingletonScope();
            Bind<ISAPPartyService>().To<SAPPartyService>().InSingletonScope();
            Bind<ISAPContractService>().To<SAPContractService>().InSingletonScope();
            Bind<IPolicyCommissionAppService>().To<PolicyCommissionAppService>().InSingletonScope();
            Bind<ISendEventService>().To<SendEventService>().InSingletonScope();
            Bind<IAaCommissionServiceExecutor>().To<AaCommissionServiceExecutor>();
            Bind<IAutoMapperConfiguration>().To<InvestmentProfitMapping>().InSingletonScope();
            Bind<IAutoMapperConfiguration>().To<SendEventMapping>().InSingletonScope();
            Rebind<IContractService>().To<ContractServiceRGSL>().InSingletonScope();
            Bind<IContractServiceRGSL>().To<ContractServiceRGSL>().InSingletonScope();
            Bind<IGetContractDataCustomService>().To<GetContractDataCustomService>().InSingletonScope();
            Bind<DigitalSignatureGateway>().ToSelf().InSingletonScope();
            Bind<IDigitalSignatureService>().To<DigitalSignatureService>().InSingletonScope();
            Bind<INumberGeneratorApplicationService>().To<NumberGeneratorApplicationService>().InSingletonScope();
            Bind<ICollectiveContractService>().To<CollectiveContractService>().InSingletonScope();
            Bind<IAutoMapperConfiguration>().To<CollectiveContractMapping>().InSingletonScope();
            Bind<ICancellationCalcServiceExecutor>().To<CancellationCalcServiceExecutor>().InSingletonScope();
            Bind<IInvestmentProfitApplicationService>().To<InvestmentProfitApplicationService>().InSingletonScope();
        }

        /// <summary>
        /// Initialize dependencies which require a configured object graph.
        /// </summary>
        public override void Initialize()
        {
        }

    }
}
