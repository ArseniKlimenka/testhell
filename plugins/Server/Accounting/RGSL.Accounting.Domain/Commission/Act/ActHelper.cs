using System;
using System.Collections.Generic;
using System.Linq;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission;
using Adacta.AdInsure.RGSL.Common.Domain;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act
{
    public static class ActHelper
    {
        public static void CalculateVatAmountsByInstallments(CommissionAct act, IList<CommissionActItem> actItems)
        {
            var itemsByInstallments = actItems.GroupBy(_ => new
            {
                _.ReferenceNo,
                _.DueDate,
                _.CommRateFinal,
            });

            foreach (var itemsByInstallment in itemsByInstallments)
            {
                var installmentActItems = itemsByInstallment.ToArray();
                decimal commLcAmount = installmentActItems.Sum(_ => _.LcCommAmountFinal);
                decimal lcVatAmount = AmountsHelper.RoundCurrency((commLcAmount * act.VatRate) / (1 + act.VatRate));

                var proportions = installmentActItems.Select(_ => Math.Abs(_.PaymentDocAmount == null ? _.LcCommAmountFinal : _.PaymentDocAmount.Value)).ToArray();
                var vatAmounts = AmountsHelper.GetDistribution(proportions, lcVatAmount);

                for (int i = 0; i < installmentActItems.Length; i++)
                {
                    var actItem = installmentActItems[i];
                    var vatAmount = vatAmounts[i];
                    actItem.LcVatAmount = vatAmount;
                }
            }
        }
    }
}
