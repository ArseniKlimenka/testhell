using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories
{
    public interface IPaymentReferencesRepository
    {
        void ClearPaymentReferences(long bankStatementItemId);
        void InsertPaymentReferences(List<PaymentReference> paymentReferences);

        void UpdatePaymentReferenceMessage(PaymentReference paymentReferences);

        List<PaymentReference> GetPaymentReferences(long bankStatementItemId);

        List<PaymentReference> GetPaymentReferences(IList<long> bankStatementItemIds);
    }
}
