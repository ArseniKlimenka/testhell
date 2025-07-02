using Adacta.AdInsure.Accounting.Infrastructure.Attributes.Queries;
using Adacta.AdInsure.Accounting.Infrastructure.GeneralLedger.Queries;
using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.CommissionAct;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.PaymentOrder.Incoming;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.PaymentOrder.Outgoing;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Policy;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.Registry;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Periods.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.Attributes;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Repositories.Strategy;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.BankStatement.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.PaymentOrder.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.Commission.Act.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.Commission.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.GeneralLedger.Queries;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.GeneralLedger.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.Periods.Repositories;

namespace Adacta.AdInsure.Accounting.Infrastructure
{
    public class RGSLAccountingInfrastructureComponent : IocComponent
    {
        public override void Configure()
        {
            BindRepositories();
        }

        public override void Initialize()
        {
        }

        private void BindRepositories()
        {
            Bind<IAllocationRepositoryRGSL>().To<AllocationRepositoryRGSL>().InSingletonScope();
            Bind<IMatchingRepositoryRGSL>().To<MatchingRepositoryRGSL>().InSingletonScope();

            Bind<ICommissionActAllocationStrategyRepository>().To<CommissionActAllocationStrategyRepositoryRGSL>().InSingletonScope();
            Bind<IPolicyAllocationStrategyRepository>().To<PolicyAllocationStrategyRepositoryRGSL>().InSingletonScope();
            Bind<IPaymentOrderIncomingAllocationStrategyRepository>().To<PaymentOrderIncomingAllocationStrategyRepositoryRGSL>().InSingletonScope();
            Bind<IPaymentOrderOutgoingAllocationStrategyRepository>().To<PaymentOrderOutgoingAllocationStrategyRepositoryRGSL>().InSingletonScope();
            Bind<IRegistryAllocationStrategyRepository>().To<RegistryAllocationStrategyRepositoryRGSL>().InSingletonScope();

            Bind<IBankStatementRepositoryRGSL>().To<BankStatementRepositoryRGSL>().InSingletonScope();
            Bind<IPendingPaymentRepositoryRGSL>().To<PendingPaymentRepositoryRGSL>().InSingletonScope();
            Bind<IPayableCommissionRepository>().To<PayableCommissionRepository>().InSingletonScope();
            Bind<ICommissionActPopulationRepository>().To<CommissionActPopulationRepository>().InSingletonScope();
            Bind<ICommissionActRepository>().To<CommissionActRepository>().InSingletonScope();
            Bind<IInvoicedCommissionRepository>().To<InvoicedCommissionRepository>().InSingletonScope();
            Bind<IReferenceNumberRepositoryRGSL>().To<ReferenceNumberRepositoryRGSL>().InSingletonScope();

            Bind<IPaymentReferencesRepository>().To<PaymentReferencesRepository>().InSingletonScope();

            Bind<IAccountingPeriodRepositoryRgsl>().To<AccountingPeriodRepositoryRgsl>().InSingletonScope();
            Rebind<AttributeQueries>().To<AttributeQueriesRgsl>().InSingletonScope();
            Rebind<LedgerAdditionalAttrsQueries>().To<GLAdditionalAttrsQueriesRgsl>().InSingletonScope();
            Bind<IDimensionsRepository>().To<GLDimensionsRepository>().InSingletonScope();

            Bind<IPaymentOrderRepositoryRGSL>().To<PaymentOrderRepositoryRGSL>().InSingletonScope();
            Bind<IAccountNumberRepositoryRGSL>().To<AccountNumberRepositoryRGSL>().InSingletonScope();
        }
    }
}