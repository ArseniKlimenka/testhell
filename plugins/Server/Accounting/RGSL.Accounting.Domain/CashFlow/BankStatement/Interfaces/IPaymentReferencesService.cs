using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Interfaces
{
    public interface IPaymentReferencesService
    {
        List<PaymentReference> ParseAndInsertPaymentReferences(BankStatementItemRGSL bsi);

        void UpdatePaymentReferenceMessage(PaymentReference paymentReferences);

        List<PaymentReference> GetPaymentReferences(long bankStatementItemId);

        List<PaymentReference> GetPaymentReferences(IList<long> bankStatementItemIds);
    }
}
