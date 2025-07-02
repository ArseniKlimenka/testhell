using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.BankStatement.Queries;
using Adacta.AdInsure.RGSL.Common.Domain;
using NPoco;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.BankStatement.Repositories
{
    public class PaymentReferencesRepository : IPaymentReferencesRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public PaymentReferencesRepository(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public List<PaymentReference> GetPaymentReferences(long bankStatementItemId)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                var refernces = db.Fetch<PaymentReference>(PaymentReferencesQueries.SelectPaymentReferences(), new { bankStatementItemId });
                return refernces;
            }
        }

        public List<PaymentReference> GetPaymentReferences(IList<long> bankStatementItemIds)
        {
            string sql = PaymentReferencesQueries.SelectPaymentReferencesMany();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            if (bankStatementItemIds != null)
            {
                builder.Where("bank_statement_item_id in (@0)", bankStatementItemIds);
                criteriaDefined = true;
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<PaymentReference>(template);
        }

        public void ClearPaymentReferences(long bankStatementItemId)
        {
            using var db = _databaseFactory.CreateDatabase();
            db.Execute("delete from acc_impl.PAYMENT_REFERENCE where BANK_STATEMENT_ITEM_ID = @0", bankStatementItemId);
        }

        public void InsertPaymentReferences(List<PaymentReference> paymentReferences)
        {
            string sql = PaymentReferencesQueries.InsertPaymentReference();

            using var db = _databaseFactory.CreateDatabase();

            long bankStatementItemId = paymentReferences.Select(r => r.BankStatementItemId).Distinct().Single();
            db.Execute(PaymentReferencesQueries.DeletePaymentReferences(), bankStatementItemId);
            RepositoryHelper.BulkInsert(db, sql, paymentReferences);
        }

        public void UpdatePaymentReferenceMessage(PaymentReference paymentReferences)
        {
            using (var db = _databaseFactory.CreateDatabase())
            {
                db.Execute(PaymentReferencesQueries.UpdatePaymentReferenceMessage(), paymentReferences);
            }
        }
    }
}
