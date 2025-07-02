using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.PaymentOrder.Incoming;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.PaymentOrder.Incoming.DTO;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries.Strategy;
using NPoco;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Repositories.Strategy
{
    public class PaymentOrderIncomingAllocationStrategyRepositoryRGSL : IPaymentOrderIncomingAllocationStrategyRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public PaymentOrderIncomingAllocationStrategyRepositoryRGSL(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public IList<PaymentOrderIncomingInstallmentDetailsDto> GetInstallmentsDetails(string documentNo)
        {
            string sql = PaymentOrderIncomingAllocationStrategyQueries.Select_InstallmentDetails();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql, documentNo, DocumentTypeRGSL.PaymentOrderIncoming);

            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PaymentOrderIncomingInstallmentDetailsDto>(template);
        }
    }
}
