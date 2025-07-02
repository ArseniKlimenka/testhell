using System;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Interfaces
{
    public interface ICbrCurrencyDynamicDomainService
    {
        DateTime LoadCurrencyDynamic(DateTime fromDate, DateTime toDate, string currencyCode);
    }
}
