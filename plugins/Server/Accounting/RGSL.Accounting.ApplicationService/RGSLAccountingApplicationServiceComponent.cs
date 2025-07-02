using Adacta.AdInsure.Accounting.Domain;
using Adacta.AdInsure.Framework.Core.Ioc;
using Adacta.AdInsure.Framework.Messaging.Templates;
using Adacta.AdInsure.RGSL.Accounting.API.Public.CashFlow.BankStatement.Services;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Services;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Services;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement.Services;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.PaymentOrder.Services;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Services;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Periods.Services;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Services;
using Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Public.CashFlow.BankStatement.Services;
using Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.AccountingCertificate.Services;
using Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.CashFlow.Allocation.Services;
using Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.CashFlow.BankStatement.Services;
using Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.Commission.Services;
using Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.PaymentOrder.Services;
using Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.Periods.Services;
using Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.Subledger.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement;

namespace Adacta.AdInsure.RGSL.Accounting.ApplicationServices
{
    public class RGSLAccountingApplicationServiceComponent : IocComponent
    {
        /// <summary>
        /// Configure bindings.
        /// </summary>
        public override void Configure()
        {
            Bind<IAllocationServiceAppRGSL>().To<AllocationServiceAppRGSL>().InSingletonScope();
            Bind<IAutoAllocationServiceAppRGSL>().To<AutoAllocationServiceAppRGSL>().InSingletonScope();
            Bind<IPendingPaymentAppService>().To<PendingPaymentAppService>().InSingletonScope();
            Bind<IBankStatementServiceAppRGSL>().To<BankStatementServiceAppRGSL>().InSingletonScope();
            Bind<ICommissionActServiceApp>().To<CommissionActServiceApp>().InSingletonScope();
            Bind<IPayableCommissionServiceApp>().To<PayableCommissionServiceApp>().InSingletonScope();
            Bind<IPaymentOrderNettingAppServiceRGSL>().To<PaymentOrderNettingAppServiceRGSL>().InSingletonScope();
            Bind<IAccountingPeriodAppServiceRgsl>().To<AccountingPeriodAppServiceRgsl>().InSingletonScope();
            Bind<IPostingServiceRgsl>().To<PostingServiceRgsl>().InSingletonScope();
            Bind<IRosfinmonitoringXMLService>().To<RosfinmonitoringXMLService>().InSingletonScope();
            Bind<IFnsXMLService>().To<FnsXMLService>().InSingletonScope();
            Bind<IAccountingCertificateAttachmentsDownload>().To<AccountingCertificateAttachmentsDownloadService>().InSingletonScope();

            // public services:
            Bind<IBankStatementServicePub>().To<BankStatementServicePub>().InSingletonScope();
        }

        /// <summary>
        /// Initialize dependencies which require a configured object graph.
        /// </summary>
        public override void Initialize()
        {
            EventPipeline
                .ForEvent<IndexPaymentEvent>()
                .ConvertToMessage(e =>
                    new IndexPaymentMessage
                    {
                        BankStatementItemIds = e.BankStatementItemIds,
                    })
                .PublishOnChannel("RGSL.Accounting.CashFlow.BSI.Index");

			EventPipeline
				.ForEvent<AllocationFinishedEvent>()
				.ConvertToMessage(e =>
					new AllocationFinishedMessage
					{
						AllocationIds = e.AllocationIds,
                        DocumentTypeId = e.DocumentTypeId,
                        BankStatementItemId = e.BankStatementItemId,
                        DocumentNo = e.DocumentNo,
                    })
				.PublishOnChannel("RGSL.Accounting.CashFlow.Allocation.AllocationFinished");
		}

        protected override IocComponent[] GetDependentComponents()
        {
            return new IocComponent[] { new RGSLAccountingDomainServicesComponent() };
        }
    }
}
