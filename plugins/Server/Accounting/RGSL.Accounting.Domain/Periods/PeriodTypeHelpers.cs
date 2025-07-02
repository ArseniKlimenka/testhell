using Adacta.AdInsure.RGSL.Accounting.API.Shared.Periods;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Attributes;
using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Periods
{
    static class PeriodTypeHelpers
    {
        public static PeriodTypeIds GetPeriodTypeId(JRAdditionalAttrsRgsl attributes)
        {
            long? bankStatementItemId = attributes.BankStatementItemId;
            long? commissionActId = attributes.CommissionActId;
            string contractNumber = attributes.ContractNumber;
            string paymentOrderNumber = attributes.PaymentOrderNumber;
            if (bankStatementItemId == null &&
                commissionActId == null &&
                contractNumber == null &&
                paymentOrderNumber == null)
            {
                throw new InvalidOperationException("At least one base additional attribute must be specified!");
            }

            if (attributes.IsRevaluation.GetValueOrDefault())
            {
                return PeriodTypeIds.Revaluation;
            }
            if (bankStatementItemId.HasValue)
            {
                return PeriodTypeIds.Payment;
            }
            else if (commissionActId.HasValue)
            {
                return PeriodTypeIds.CommissionAct;
            }
            else if (contractNumber != null)
            {
                return PeriodTypeIds.ContractNumber;
            }
            else if (paymentOrderNumber != null)
            {
                return PeriodTypeIds.PaymentOrderNumber;
            }
            else
            {
                throw new InvalidOperationException();
            }
        }
    }
}
