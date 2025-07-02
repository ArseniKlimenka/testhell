using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.PaymentOrder.Outgoing;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories.Strategy.PaymentOrder.Outgoing.DTO;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries.Strategy;
using NPoco;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Repositories.Strategy
{
    public class PaymentOrderOutgoingAllocationStrategyRepositoryRGSL : IPaymentOrderOutgoingAllocationStrategyRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public PaymentOrderOutgoingAllocationStrategyRepositoryRGSL(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public IList<PaymentOrderOutgoingInstallmentDetailsDto> GetInstallmentsDetails(string documentNo)
        {
            string sql = PaymentOrderOutgoingAllocationStrategyQueries.Select_InstallmentDetails();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql, documentNo, DocumentTypeRGSL.PaymentOrderOutgoing);

            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PaymentOrderOutgoingInstallmentDetailsDto>(template);
        }
    }
}
