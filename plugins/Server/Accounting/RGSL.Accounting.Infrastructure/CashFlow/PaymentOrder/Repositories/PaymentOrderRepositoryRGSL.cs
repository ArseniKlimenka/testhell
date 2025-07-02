using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Requests;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.PaymentOrder.Queries;
using Adacta.AdInsure.RGSL.Common.Domain;
using NPoco;
using System.Collections.Generic;
using DatabaseFactory = Adacta.AdInsure.Framework.Core.Data.Orm.DatabaseFactory;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.PaymentOrder.Repositories
{
    public class PaymentOrderRepositoryRGSL : IPaymentOrderRepositoryRGSL
    {
        private readonly DatabaseFactory _databaseFactory;

        public PaymentOrderRepositoryRGSL(DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public IList<DocumentForNetting> GetDocumentsForNetting(DocumentsForNettingRequest request)
        {
            var query = PaymentOrderQueriesRGSL.GetDocumentsForNetting();

            var builder = new SqlBuilder();
            var template = builder.AddTemplate(query);
            var criteriaDefined = false;

            if (!string.IsNullOrWhiteSpace(request.PaymentOrderNo))
            {
                builder.Where("po.PAYMENT_ORDER_NUMBER = @0", request.PaymentOrderNo);
                criteriaDefined = true;
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);

            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<DocumentForNetting>(template);
        }

        public PaymentOrderDto GetPaymentOrder(string paymentOrderNumber)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                PaymentOrderDto po = db.Single<PaymentOrderDto>(PaymentOrderQueriesRGSL.GetPaymentOrderInfo(), new { paymentOrderNumber });
                return po;
            }
        }

        public IList<PaymentOrderItemDto> GetPaymentOrderItems(string paymentOrderNumber)
        {
            using var db = _databaseFactory.CreateDatabase();

            var items = db.Fetch<PaymentOrderItemDto>(PaymentOrderQueriesRGSL.GetPaymentOrderItemInfo(), new { paymentOrderNumber });
            return items;
        }

        public IList<PaymentOrderRiskDto> GetPaymentOrderAndRisksInfo(long? bankStatementItemId)
        {
            using var db = _databaseFactory.CreateDatabase();

            var items = db.Fetch<PaymentOrderRiskDto>(PaymentOrderQueriesRGSL.GetPaymentOrderAndRisksInfoByBankStatementId(), new { bankStatementItemId });
            return items;
        }
    }
}
