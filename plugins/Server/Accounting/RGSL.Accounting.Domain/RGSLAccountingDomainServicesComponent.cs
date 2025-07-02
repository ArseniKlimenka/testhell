using Adacta.AdInsure.Accounting.Domain.Attributes.Services;
using Adacta.AdInsure.Accounting.Domain.GeneralLedger;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.Accounting.Domain.AccountingCertificate.Interface;
using Adacta.AdInsure.RGSL.Accounting.Domain.AccountingCertificate.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.Attributes.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces.Posting;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Posting;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.CommissionAct;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.PaymentOrder.Incoming;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.PaymentOrder.Outgoing;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.Policy;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.Registry;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Integration.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.General;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Posting.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.Periods.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.Periods.Services;

namespace Adacta.AdInsure.Accounting.Domain
{
    public class RGSLAccountingDomainServicesComponent : DomainIocComponent
    {
        public RGSLAccountingDomainServicesComponent() : base(AdInsureModule.Accounting)
        {
        }

        public override void Configure()
        {
            Bind<IAllocationServiceRGSL>().To<AllocationServiceRGSL>().InSingletonScope();
            Bind<IAutoAllocationServiceRGSL>().To<AutoAllocationServiceRGSL>().InSingletonScope();

            Bind<IMatchingServiceRGSL>().To<MatchingServiceRGSL>().InSingletonScope();

            Bind<IPolicyMatchingPostingServiceRGSL>().To<PolicyMatchingPostingServiceRGSL>().InSingletonScope();

            Bind<IBankStatementServiceRGSL>().To<BankStatementServiceRGSL>().InSingletonScope();

            Bind<IPaymentReferencesService>().To<PaymentReferencesService>().InSingletonScope();

            Bind<IAllocationStrategyServiceRGSL>().To<PolicyAllocationStrategyService>().InSingletonScope().Named(DocumentTypeRGSL.Policy.ToString());
            Bind<IAllocationStrategyServiceRGSL>().To<PaymentOrderIncomingAllocationStrategyService>().InSingletonScope().Named(DocumentTypeRGSL.PaymentOrderIncoming.ToString());
            Bind<IAllocationStrategyServiceRGSL>().To<PaymentOrderOutgoingAllocationStrategyService>().InSingletonScope().Named(DocumentTypeRGSL.PaymentOrderOutgoing.ToString());
            Bind<IAllocationStrategyServiceRGSL>().To<RegistryAllocationStrategyService>().InSingletonScope().Named(DocumentTypeRGSL.Registry.ToString());
            Bind<IAllocationStrategyServiceRGSL>().To<CommissionActAllocationStrategyService>().InSingletonScope().Named(DocumentTypeRGSL.CommissionAct.ToString());

            Bind<IAllocationToleranceServiceRGSL>().To<AllocationToleranceService>().InSingletonScope();
            Bind<IPendingPaymentService>().To<PendingPaymentService>().InSingletonScope();
            Bind<IPayableCommissionService>().To<PayableCommissionService>().InSingletonScope();
            Bind<ICommissionActService>().To<CommissionActService>().InSingletonScope();
            Bind<ICommissionActPopulationService>().To<CommissionActPopulationService>().InSingletonScope();
            Bind<IInvoicedCommissionService>().To<InvoicedCommissionService>().InSingletonScope();
            Bind<IReferenceNumberServiceRGSL>().To<ReferenceNumberServiceRGSL>().InSingletonScope();

            Bind<IAccountingPeriodServiceRgsl>().To<AccountingPeriodServiceRgsl>().InSingletonScope();
            Bind<ISubledgerAdditionalAttributesServiceRgsl>().To<SubledgerAdditionalAttributesServiceRgsl>().InSingletonScope();
            Bind<IJournalServiceRgsl>().To<JournalServiceRgsl>().InSingletonScope();

            Rebind<AttributeSetFactory>().To<AttributeSetFactoryRgsl>().InSingletonScope();
            Rebind<LedgerAdditionalAttrsFactory>().To<GLAdditionalAttrsFactoryRgsl>().InSingletonScope();
            Bind<IGLDimensionsService>().To<GLDimensionsService>().InSingletonScope();
            Bind<IGeneralJournalServiceRgsl>().To<GeneralJournalServiceRgsl>().InSingletonScope();

            Bind<IPaymentOrderNettingServiceRGSL>().To<PaymentOrderNettingServiceRGSL>().InSingletonScope();

            Bind<IRosfinmonitoringXMLDomainService>().To<RosfinmonitoringXMLDomainService>().InSingletonScope();
            Bind<IRosfinmonitoringXMLOperation>().To<RosfinmonitoringXMLOperationDefault>().InSingletonScope().Named(DocumentTypeRGSL.Default.ToString());
            Bind<IRosfinmonitoringXMLOperation>().To<RosfinmonitoringXMLOperationPolicy>().InSingletonScope().Named(DocumentTypeRGSL.Policy.ToString());
            Bind<IRosfinmonitoringXMLOperation>().To<RosfinmonitoringXMLOperationDefault>().InSingletonScope().Named(DocumentTypeRGSL.PaymentOrderIncoming.ToString());
            Bind<IRosfinmonitoringXMLOperation>().To<RosfinmonitoringXMLOperationPaymentOrderOutgoing>().InSingletonScope().Named(DocumentTypeRGSL.PaymentOrderOutgoing.ToString());
            Bind<IRosfinmonitoringXMLOperation>().To<RosfinmonitoringXMLOperationDefault>().InSingletonScope().Named(DocumentTypeRGSL.Registry.ToString());

            Bind<IFnsXMLDomainService>().To<FnsXMLDomainService>().InSingletonScope();
        }

        public override void Initialize()
        {
        }
    }
}
